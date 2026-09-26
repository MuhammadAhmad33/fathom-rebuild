import { NextRequest, NextResponse } from 'next/server';
import { createShare } from '@/lib/meeting-service';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try { const body = await request.json().catch(() => ({})); const token = await createShare((await params).slug, typeof body.highlightId === 'string' ? body.highlightId : undefined); return NextResponse.json({ token, url: `/share/${token}` }, { status: 201 }); }
  catch { return NextResponse.json({ error: 'Unable to create share link.' }, { status: 500 }); }
}
