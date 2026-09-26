import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { getMeetingBySlug } from '@/lib/meeting-service';
import { MeetingWorkspace } from '@/components/meeting-workspace';
export const dynamic = 'force-dynamic';
export default async function MeetingPage({ params }: { params: Promise<{id:string}> }) { const meeting = await getMeetingBySlug((await params).id); if (!meeting) notFound(); return <AppShell><main className="detail"><div className="meeting-heading"><h1>{meeting.title}</h1><p>{new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(new Date(meeting.date))} · {Math.floor(meeting.duration/60)} min · {meeting.people.length} participants</p></div><MeetingWorkspace meeting={meeting}/></main></AppShell>; }
