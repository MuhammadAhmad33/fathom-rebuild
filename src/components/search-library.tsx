'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MeetingList } from '@/components/meeting-list';
import type { Meeting } from '@/lib/types';
import { Search } from 'lucide-react';

export function SearchLibrary({ meetings }: { meetings: Meeting[] }) {
  const query = useSearchParams().get('q')?.trim() ?? '';
  const results = useMemo(() => !query ? meetings : meetings.filter(meeting => `${meeting.title} ${meeting.description} ${meeting.people.map(person => person.name).join(' ')} ${meeting.transcript.map(segment => segment.text).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const transcriptHits = useMemo(() => query ? meetings.flatMap(meeting => meeting.transcript.filter(segment => segment.text.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(segment => ({ meeting, segment }))).slice(0, 6) : [], [query]);
  const decisionHits = useMemo(() => query ? meetings.flatMap(meeting => meeting.summary.takeaways.filter(item => item.text.toLowerCase().includes(query.toLowerCase())).map(item => ({ meeting, item }))).slice(0, 6) : [], [query]);
  const actionHits = useMemo(() => query ? meetings.flatMap(meeting => meeting.actions.filter(item => item.text.toLowerCase().includes(query.toLowerCase()) || meeting.people.find(person=>person.id===item.owner)?.name.toLowerCase().includes(query.toLowerCase())).map(item => ({ meeting, item }))).slice(0, 6) : [], [query]);
  if (!query) return <MeetingList meetings={meetings}/>;
  return <div><div className="search-results-heading"><Search size={18}/><span>{results.length} meetings matching “{query}”</span></div><MeetingList meetings={results}/>{decisionHits.length > 0 && <section className="spoken-results"><h2>Decisions</h2>{decisionHits.map(({ meeting, item }) => <a href={`/meetings/${meeting.id}?t=${item.time}&tab=transcript`} key={`${meeting.id}-${item.text}`}><span>{meeting.title} · decision</span><b>{item.text}</b></a>)}</section>}{actionHits.length > 0 && <section className="spoken-results"><h2>Action items</h2>{actionHits.map(({ meeting, item }) => <a href={`/meetings/${meeting.id}?t=${item.time}&tab=transcript`} key={`${meeting.id}-${item.id}`}><span>{meeting.title} · action</span><b>{item.text}</b></a>)}</section>}{transcriptHits.length > 0 && <section className="spoken-results"><h2>Conversation</h2>{transcriptHits.map(({ meeting, segment }) => <a href={`/meetings/${meeting.id}?t=${segment.start}&tab=transcript`} key={`${meeting.id}-${segment.id}`}><span>{meeting.title} · {Math.floor(segment.start/60)}:{String(Math.floor(segment.start%60)).padStart(2,'0')}</span><b>{segment.text}</b></a>)}</section>}{results.length === 0 && !decisionHits.length && !actionHits.length && !transcriptHits.length && <div className="search-empty">No matching meetings, decisions, actions, or spoken moments. Try a participant, project, or phrase from a conversation.</div>}</div>;
}
