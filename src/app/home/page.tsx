import { AppShell } from '@/components/app-shell';
import { SearchLibrary } from '@/components/search-library';
import { Suspense } from 'react';
export default function Home() { return <AppShell><main className="meetings-page"><div className="page-lead"><div><span className="eyebrow">Your workspace</span><h1>Meetings</h1><p>A record of what happened, what changed, and where it was said.</p></div><span className="meeting-total">10 recorded conversations</span></div><Suspense fallback={<div className="search-empty">Loading meetings…</div>}><SearchLibrary/></Suspense></main></AppShell>; }
