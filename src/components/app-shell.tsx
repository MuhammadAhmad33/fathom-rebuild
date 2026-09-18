import Link from 'next/link';
import { Gift, HelpCircle, Search, Settings } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="shell"><header className="topbar"><Link className="logo" href="/home">FATHOM<b>▰</b></Link><div className="searchbox"><Search size={18}/><input aria-label="Search call recordings" placeholder="Search Call Recordings" /></div><nav className="toplinks"><a href="#"><Gift size={20}/>Refer</a><Link href="/settings"><Settings size={20}/>Settings</Link><a href="#"><HelpCircle size={20}/>Help & Feedback</a><span className="avatar" style={{ background:'#5f6988' }}>MA</span></nav></header><nav className="subnav"><Link className="active" href="/home">My Calls</Link><a href="#">Team Calls</a><a href="#">Playlists</a><a href="#">Alerts</a></nav>{children}</div>;
}
