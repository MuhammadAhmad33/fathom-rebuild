import 'server-only';

import { transcriptForMeeting } from './meeting-service';

type TranscriptRow = { id: string; content: string; starts_at: number; ends_at: number; participants: { name: string }[] | null };

const terms = (value: string) => value.toLowerCase().match(/[a-z0-9]{2,}/g) ?? [];

export async function searchMeetingEvidence(slug: string, query: string) {
  const transcript = await transcriptForMeeting(slug) as unknown as TranscriptRow[];
  if (!transcript.length) throw new Error('This meeting has no transcript yet.');
  const queryTerms = terms(query);
  const evidence = transcript.map(segment => ({
    id: segment.id,
    speaker: segment.participants?.[0]?.name ?? 'Unknown speaker',
    startsAt: Number(segment.starts_at),
    endsAt: Number(segment.ends_at),
    text: segment.content,
  })).map(segment => ({ ...segment, score: queryTerms.reduce((score, term) => score + (segment.text.toLowerCase().includes(term) ? 1 : 0) + (segment.speaker.toLowerCase().includes(term) ? 2 : 0), 0) }));
  const matches = evidence.filter(segment => segment.score > 0).sort((a,b) => b.score - a.score || a.startsAt - b.startsAt).slice(0, 6);
  return { query, matches: matches.map(({ score: _, ...segment }) => segment) };
}
