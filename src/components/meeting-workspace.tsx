'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronDown, Clipboard, Copy, Edit3, ListChecks, Pause, Play, Search, Sparkles, Volume2, Highlighter } from 'lucide-react';
import type { ActionItem, Meeting } from '@/lib/types';

const time = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const ownerName = (meeting: Meeting, id: string) => meeting.people.find(person => person.id === id)?.name ?? 'Unassigned';

export function MeetingWorkspace({ meeting }: { meeting: Meeting }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState<'summary' | 'transcript'>('summary');
  const [template, setTemplate] = useState<'Enhanced' | 'Project Update'>('Enhanced');
  const [query, setQuery] = useState('');
  const [actions, setActions] = useState<ActionItem[]>(meeting.actions);
  const [highlights, setHighlights] = useState(meeting.highlights);
  const [shareState, setShareState] = useState(false);
  const params = useSearchParams();
  const active = [...meeting.transcript].reverse().find(segment => segment.start <= current) ?? meeting.transcript[0];

  useEffect(() => {
    const saved = localStorage.getItem(`fathom-actions-${meeting.id}`);
    if (saved) setActions(JSON.parse(saved));
  }, [meeting.id]);
  useEffect(() => { const saved = localStorage.getItem(`fathom-highlights-${meeting.id}`); if (saved) setHighlights(JSON.parse(saved)); }, [meeting.id]);
  useEffect(() => { const timestamp = params.get('t'); if (timestamp) { setTab('transcript'); seek(Number(timestamp)); } }, [params]);
  const persist = (next: ActionItem[]) => { setActions(next); localStorage.setItem(`fathom-actions-${meeting.id}`, JSON.stringify(next)); };
  const seek = (seconds: number) => { if (audio.current) audio.current.currentTime = seconds; setCurrent(seconds); };
  const toggle = () => { if (!meeting.media || !audio.current) return; if (audio.current.paused) audio.current.play(); else audio.current.pause(); };
  const matches = useMemo(() => meeting.transcript.filter(s => !query || `${s.text} ${ownerName(meeting, s.speaker)}`.toLowerCase().includes(query.toLowerCase())), [meeting, query]);
  const copy = async (value: string) => navigator.clipboard?.writeText(value);
  const addHighlight = () => { const next = [{ id: `local-${Date.now()}`, title: active.text.slice(0, 56) + (active.text.length > 56 ? '…' : ''), type: 'Highlight', start: active.start, end: active.end, note: `Saved from ${ownerName(meeting, active.speaker)}’s transcript moment.` }, ...highlights]; setHighlights(next); localStorage.setItem(`fathom-highlights-${meeting.id}`, JSON.stringify(next)); };

  return <div className="workspace">
    <section className="workspace-main">
      <div className="recording-stage">
        {meeting.media && <audio ref={audio} src={meeting.media} onTimeUpdate={event => setCurrent(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} />}
        <div className="recording-top"><span className="live-dot"/>Meeting recording</div>
        <div className="speaker-grid">{meeting.people.map((person, index) => <div key={person.id} className={`speaker-tile ${active.speaker === person.id ? 'speaking' : ''}`} style={{ '--tile': person.color } as React.CSSProperties}><span className="avatar big" style={{ background: person.color }}>{person.initials}</span><span>{person.name}</span>{index === 0 && <i>Host</i>}</div>)}</div>
        <div className="recording-caption"><b>{ownerName(meeting, active.speaker)}</b><span>{active.text}</span></div>
        <div className="custom-controls"><button disabled={!meeting.media} aria-label={playing ? 'Pause recording' : 'Play recording'} className="play-control" onClick={toggle}>{playing ? <Pause fill="currentColor" size={19}/> : <Play fill="currentColor" size={19}/>}</button><span>{time(current)}</span><input aria-label="Recording position" type="range" min="0" max={meeting.duration} value={current} onChange={event => seek(Number(event.target.value))}/><span>{time(meeting.duration)}</span><Volume2 size={18}/></div>
      </div>
      <div className="content-tabs"><button className={tab === 'summary' ? 'selected' : ''} onClick={() => setTab('summary')}>Summary</button><button className={tab === 'transcript' ? 'selected' : ''} onClick={() => setTab('transcript')}>Transcript</button><button disabled>Ask Fathom</button><button className="copy-transcript" onClick={() => copy(meeting.transcript.map(s => `${ownerName(meeting, s.speaker)} (${time(s.start)}): ${s.text}`).join('\n'))}><Clipboard size={17}/>Copy Transcript</button></div>
      {tab === 'summary' ? <Summary meeting={meeting} template={template} setTemplate={setTemplate} seek={seek} copy={copy}/> : <Transcript meeting={meeting} activeId={active.id} query={query} setQuery={setQuery} matches={matches} seek={seek}/>}
    </section>
    <aside className="workspace-side"><button className="share-button" onClick={async () => { await copy(`${window.location.origin}/share/${meeting.id}`); setShareState(true); setTimeout(() => setShareState(false), 2200); }}>Share <Copy size={19}/></button>{shareState && <div className="share-toast">Public link copied — anyone with it can view this meeting.</div>}<div className="side-heading"><h2>ACTION ITEMS</h2><span>{actions.filter(action => !action.done).length} open</span></div><div className="action-tools"><button><Copy size={16}/>Copy for…</button><button><Sparkles size={16}/>Follow-up email</button></div>{actions.map(action => <div className={`action-card ${action.done ? 'done' : ''}`} key={action.id}><button className="checkbox" aria-label={`Mark ${action.text} ${action.done ? 'open' : 'complete'}`} onClick={() => persist(actions.map(item => item.id === action.id ? { ...item, done: !item.done } : item))}>{action.done && <Check size={14}/>}</button><div><input value={action.text} aria-label="Action item text" onChange={event => persist(actions.map(item => item.id === action.id ? { ...item, text: event.target.value } : item))}/><button className="source-time" onClick={() => seek(action.time)}>✦ {time(action.time)} · {ownerName(meeting, action.owner)}</button></div></div>)}<div className="side-divider"/><div className="side-heading"><h2>HIGHLIGHTS</h2><button className="add-highlight" onClick={addHighlight}><Highlighter size={15}/>Highlight moment</button></div>{highlights.map(highlight => <button className="highlight-side" key={highlight.id} onClick={() => seek(highlight.start)}><span className="highlight-color"/><span><b>{highlight.title}</b><small>{highlight.type} · {time(highlight.start)}</small></span><Play size={15}/></button>)}</aside>
  </div>;
}

function Summary({ meeting, template, setTemplate, seek, copy }: { meeting: Meeting; template: 'Enhanced' | 'Project Update'; setTemplate: (value: 'Enhanced' | 'Project Update') => void; seek: (seconds: number) => void; copy: (value: string) => void }) {
  const allText = `${meeting.summary.purpose}\n${meeting.summary.takeaways.map(point => point.text).join('\n')}`;
  return <section className="summary"><div className="summary-toolbar"><div className="template-picker"><button className="template-trigger"><ListChecks size={17}/>{template}<ChevronDown size={17}/></button><div className="template-menu"><button onClick={() => setTemplate('Enhanced')} className={template === 'Enhanced' ? 'checked' : ''}><b>Enhanced</b><small>Capture key insights and takeaways.</small></button><button onClick={() => setTemplate('Project Update')} className={template === 'Project Update' ? 'checked' : ''}><b>Project Update</b><small>Break down status, decisions, and next steps.</small></button></div></div><button className="language-picker"><Sparkles size={16}/>Auto<ChevronDown size={16}/></button><button className="copy-summary" onClick={() => copy(allText)}>Copy Summary <Clipboard size={18}/></button></div>{template === 'Enhanced' ? <Enhanced meeting={meeting} seek={seek}/> : <ProjectUpdate meeting={meeting} seek={seek}/>}</section>;
}
function Timestamp({ seconds, seek }: { seconds: number; seek: (seconds:number) => void }) { return <button className="timestamp" onClick={() => seek(seconds)}>↗ {time(seconds)}</button>; }
function Enhanced({ meeting, seek }: { meeting: Meeting; seek: (seconds:number) => void }) { return <div className="summary-content"><h2>Meeting Purpose</h2><p>{meeting.summary.purpose}</p><h2>Key Takeaways</h2><ul>{meeting.summary.takeaways.map(point => <li key={point.text}><button onClick={() => seek(point.time)}>{point.text}</button><Timestamp seconds={point.time} seek={seek}/></li>)}</ul><h2>Topics</h2>{meeting.summary.topics.map(topic => <div className="topic" key={topic.title}><h3>{topic.title}</h3><ul>{topic.points.map(point => <li key={point.text}><button onClick={() => seek(point.time)}>{point.text}</button><Timestamp seconds={point.time} seek={seek}/></li>)}</ul></div>)}<h2>Next Steps</h2><ul>{meeting.summary.nextSteps.map(point => <li key={point.text}><button onClick={() => seek(point.time)}>{point.text}</button><Timestamp seconds={point.time} seek={seek}/></li>)}</ul></div>; }
function ProjectUpdate({ meeting, seek }: { meeting: Meeting; seek: (seconds:number) => void }) { return <div className="summary-content project-update"><div className="status-callout"><span>Project status</span><b>On track for private beta</b><p>Launch is planned for September 24, pending the final permission and accessibility acceptance checks.</p></div><h2>Progress since last review</h2><ul>{meeting.summary.takeaways.slice(0, 3).map(point => <li key={point.text}><button onClick={() => seek(point.time)}>{point.text}</button><Timestamp seconds={point.time} seek={seek}/></li>)}</ul><h2>Risks & decisions</h2>{meeting.summary.topics.map(topic => <div className="topic" key={topic.title}><h3>{topic.title}</h3><p>{topic.points[0].text} <Timestamp seconds={topic.points[0].time} seek={seek}/></p></div>)}<h2>Owners & next steps</h2><ul>{meeting.summary.nextSteps.map(point => <li key={point.text}><button onClick={() => seek(point.time)}>{point.text}</button><Timestamp seconds={point.time} seek={seek}/></li>)}</ul></div>; }
function Transcript({ meeting, activeId, query, setQuery, matches, seek }: { meeting: Meeting; activeId: string; query: string; setQuery: (value:string)=>void; matches: typeof meeting.transcript; seek: (seconds:number)=>void }) { return <section className="transcript"><div className="transcript-search"><Search size={18}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search Transcript" aria-label="Search Transcript"/><span>{query ? `${matches.length} results` : `${meeting.transcript.length} segments`}</span></div><div className="transcript-list">{matches.map(segment => { const person = meeting.people.find(item => item.id === segment.speaker) ?? { name: 'Meeting participant', initials: 'MP', color: '#686a78' }; return <article key={segment.id} className={`segment ${segment.id === activeId ? 'active' : ''}`}><div className="segment-meta"><span className="avatar" style={{ background:person.color }}>{person.initials}</span><b>{person.name}</b><button onClick={() => seek(segment.start)}>{time(segment.start)}</button></div><button className="segment-text" onClick={() => seek(segment.start)}>{segment.text}</button></article> })}{matches.length === 0 && <div className="no-results">No spoken moments match “{query}”.</div>}</div></section>; }
