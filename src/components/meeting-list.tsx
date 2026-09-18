import Link from 'next/link';
import { ChevronRight, Video } from 'lucide-react';
import type { Meeting } from '@/lib/types';

const stamp = (value: string) => new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' }).format(new Date(value));
const runtime = (seconds: number) => `${Math.floor(seconds / 60)}m`;
export function MeetingList({ meetings }: { meetings: Meeting[] }) { return <div className="meeting-list">{meetings.map(meeting => <Link className="meeting-row" href={`/meetings/${meeting.id}`} key={meeting.id}><div className="meeting-swatch"><Video size={18} color={meeting.color}/></div><div><div className="meeting-name">{meeting.title}</div><div className="meeting-description">{meeting.description}</div></div><div><div className="avatars">{meeting.people.slice(0,5).map(p => <span key={p.id} className="avatar" title={p.name} style={{ background:p.color }}>{p.initials}</span>)}</div><div className="meeting-description" style={{marginTop:6}}>{meeting.people.length} participants</div></div><div><div className="meeting-date">{stamp(meeting.date)}</div><div className="meeting-description" style={{marginTop:5}}>{runtime(meeting.duration)}</div></div><span className="tag">{meeting.kind === 'external' ? 'External' : 'Internal'}</span><ChevronRight size={19} color="#7d7d87" /></Link>)}</div>; }
