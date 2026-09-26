import { NextRequest, NextResponse } from 'next/server';
import { getMeetingBySlug } from '@/lib/meeting-service';

export const dynamic = 'force-dynamic';
export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try { const meeting = await getMeetingBySlug((await params).slug); return meeting ? NextResponse.json(meeting) : NextResponse.json({ error: 'Meeting not found.' }, { status: 404 }); }
  catch { return NextResponse.json({ error: 'Unable to load meeting.' }, { status: 500 }); }
}
