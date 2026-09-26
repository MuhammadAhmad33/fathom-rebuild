import { AppShell } from '@/components/app-shell';
import { MeetingList } from '@/components/meeting-list';
import { listMeetings } from '@/lib/meeting-service';
export const dynamic = 'force-dynamic';
export default async function TeamCalls() { const meetings=await listMeetings(); return <AppShell><main className="page"><div className="eyebrow">Shared workspace</div><h1 className="page-title">Team Calls</h1><p className="intro">Recent conversations from the Acme Studio team.</p><div className="filter-row"><button className="active-filter">Everyone</button><button disabled title="Personal ownership is not configured">Mine</button></div><MeetingList meetings={meetings.filter(meeting => meeting.kind === 'internal')}/></main></AppShell>; }
