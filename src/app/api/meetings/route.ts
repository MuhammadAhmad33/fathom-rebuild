import { NextResponse } from 'next/server';
import { listMeetings } from '@/lib/meeting-service';

export const dynamic = 'force-dynamic';
export async function GET() {
  try { return NextResponse.json(await listMeetings()); }
  catch { return NextResponse.json({ error: 'Unable to load meetings.' }, { status: 500 }); }
}
