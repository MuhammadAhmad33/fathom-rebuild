'use client';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MeetingList } from '@/components/meeting-list';
import { meetings } from '@/lib/meetings';
import { Search } from 'lucide-react';

export function SearchLibrary() {
  const query = useSearchParams().get('q')?.trim() ?? '';
  const results = useMemo(() => !query ? meetings : meetings.filter(meeting => `${meeting.title} ${meeting.description} ${meeting.people.map(person => person.name).join(' ')} ${meeting.transcript.map(segment => segment.text).join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const transcriptHits = useMemo(() => query ? meetings.flatMap(meeting => meeting.transcript.filter(segment => segment.text.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(segment => ({ meeting, segment }))).slice(0, 6) : [], [query]);
  if (!query) return <MeetingList meetings={meetings}/>;
  return <div><div className="search-results-heading"><Search size={18}/><span>{results.length} meetings matching “{query}”</span></div><MeetingList meetings={results}/>{transcriptHits.length > 0 && <section className="spoken-results"><h2>Spoken moments</h2>{transcriptHits.map(({ meeting, segment }) => <a href={`/meetings/${meeting.id}?t=${segment.start}&tab=transcript`} key={`${meeting.id}-${segment.id}`}><span>{meeting.title} · {Math.floor(segment.start/60)}:{String(Math.floor(segment.start%60)).padStart(2,'0')}</span><b>{segment.text}</b></a>)}</section>}{results.length === 0 && <div className="search-empty">No meetings or spoken moments match “{query}”. Try a participant, project, or phrase from a conversation.</div>}</div>;
}
