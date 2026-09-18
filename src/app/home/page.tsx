import { AppShell } from '@/components/app-shell';
import { MeetingList } from '@/components/meeting-list';
import { meetings } from '@/lib/meetings';
export default function Home() { return <AppShell><main className="page"><div className="eyebrow">Your meetings</div><h1 className="page-title">My Calls</h1><p className="intro">Search, review, and share the conversations that move work forward.</p><MeetingList meetings={meetings}/></main></AppShell>; }
