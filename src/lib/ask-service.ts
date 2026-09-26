import 'server-only';

import OpenAI from 'openai';
import { transcriptForMeeting } from './meeting-service';

type TranscriptRow = { id: string; content: string; starts_at: number; ends_at: number; participants: { name: string }[] | null };

export async function askMeeting(slug: string, question: string) {
  const transcript = await transcriptForMeeting(slug) as unknown as TranscriptRow[];
  if (!transcript.length) throw new Error('This meeting has no transcript yet.');
  if (!process.env.OPENAI_API_KEY) throw new Error('Ask this meeting is not configured. Add OPENAI_API_KEY on the server.');

  const evidence = transcript.map(segment => ({
    id: segment.id,
    speaker: segment.participants?.[0]?.name ?? 'Unknown speaker',
    startsAt: Number(segment.starts_at),
    endsAt: Number(segment.ends_at),
    text: segment.content,
  }));
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
    store: false,
    input: [
      { role: 'system', content: 'Answer only from the supplied meeting transcript. Return concise prose and cite only source_segment_ids that directly support the answer. Never invent facts, people, or timestamps.' },
      { role: 'user', content: `Question: ${question}\n\nTranscript evidence:\n${JSON.stringify(evidence)}` },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'meeting_answer',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['answer', 'source_segment_ids'],
          properties: {
            answer: { type: 'string' },
            source_segment_ids: { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 5 },
          },
        },
      },
    },
  });
  const parsed = JSON.parse(response.output_text) as { answer: string; source_segment_ids: string[] };
  const sources = parsed.source_segment_ids
    .map(id => evidence.find(segment => segment.id === id))
    .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment));
  if (!sources.length) throw new Error('The answer did not include verifiable meeting sources. Please try again.');
  return { answer: parsed.answer, sources };
}
