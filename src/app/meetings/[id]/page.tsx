import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { getMeeting } from '@/lib/meetings';
import { MeetingWorkspace } from '@/components/meeting-workspace';
export default async function MeetingPage({ params }: { params: Promise<{id:string}> }) { const meeting = getMeeting((await params).id); if (!meeting) notFound(); return <AppShell><main className="detail"><div className="meeting-heading"><h1>{meeting.title}</h1><p>{new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(new Date(meeting.date))} · {Math.floor(meeting.duration/60)} min · {meeting.people.length} participants</p></div><MeetingWorkspace meeting={meeting}/></main></AppShell>; }
