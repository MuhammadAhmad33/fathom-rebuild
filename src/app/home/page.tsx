import { AppShell } from '@/components/app-shell';
import { SearchLibrary } from '@/components/search-library';
import { Suspense } from 'react';
export default function Home() { return <AppShell><main className="page"><div className="eyebrow">Your meetings</div><h1 className="page-title">My Calls</h1><p className="intro">Search, review, and share the conversations that move work forward.</p><Suspense fallback={<div className="search-empty">Loading meetings…</div>}><SearchLibrary/></Suspense></main></AppShell>; }
