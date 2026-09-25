'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Settings, UserRound } from 'lucide-react';
import { useState } from 'react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname(); const router = useRouter(); const [query, setQuery] = useState(''); const [profile, setProfile] = useState(false);
  const meetingsActive = path === '/home' || path.startsWith('/meetings');
  return <div className="app-shell"><header className="app-header"><Link className="wordmark" href="/home"><span className="wordmark-mark"/>minutes</Link><nav className="primary-nav"><Link className={meetingsActive ? 'active' : ''} href="/home">Meetings</Link><Link className={path.startsWith('/share') ? 'active' : ''} href="/share/atlas-launch">Shared</Link></nav><form className="global-search" onSubmit={event => { event.preventDefault(); router.push(`/home?q=${encodeURIComponent(query)}`); }}><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search meetings and conversation" aria-label="Search meetings"/><kbd>⌘ K</kbd></form><div className="header-actions"><Link aria-label="Settings" href="/settings"><Settings size={18}/></Link><button className="profile-dot" aria-label="Open profile menu" onClick={()=>setProfile(!profile)}>MA</button>{profile&&<div className="profile-menu"><UserRound size={17}/><div><b>Muhammad Ahmad</b><span>Personal workspace</span></div><Link href="/settings" onClick={()=>setProfile(false)}>Preferences</Link></div>}</div></header>{children}</div>;
}
