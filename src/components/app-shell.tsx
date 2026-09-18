 'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Gift, HelpCircle, Search, Settings } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter(); const [query, setQuery] = useState('');
  return <div className="shell"><header className="topbar"><Link className="logo" href="/home">FATHOM<b>▰</b></Link><form className="searchbox" onSubmit={event => { event.preventDefault(); router.push(`/home?q=${encodeURIComponent(query)}`); }}><Search size={18}/><input value={query} onChange={event => setQuery(event.target.value)} aria-label="Search call recordings" placeholder="Search Call Recordings" /></form><nav className="toplinks"><a href="#"><Gift size={20}/>Refer</a><Link href="/settings"><Settings size={20}/>Settings</Link><a href="#"><HelpCircle size={20}/>Help & Feedback</a><span className="avatar" style={{ background:'#5f6988' }}>MA</span></nav></header><nav className="subnav"><Link className="active" href="/home">My Calls</Link><a href="#">Team Calls</a><a href="#">Playlists</a><a href="#">Alerts</a></nav>{children}</div>;
}
