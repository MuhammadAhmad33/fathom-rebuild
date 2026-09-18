import { AppShell } from '@/components/app-shell';
import { MeetingList } from '@/components/meeting-list';
import { meetings } from '@/lib/meetings';
export default function TeamCalls() { return <AppShell><main className="page"><div className="eyebrow">Shared workspace</div><h1 className="page-title">Team Calls</h1><p className="intro">Recent conversations from the Acme Studio team.</p><div className="filter-row"><button className="active-filter">Everyone</button><button disabled title="Personal ownership is not configured in this demo">Mine</button></div><MeetingList meetings={meetings.filter(meeting => meeting.kind === 'internal')}/></main></AppShell>; }
