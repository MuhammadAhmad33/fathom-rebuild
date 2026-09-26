import { NextRequest, NextResponse } from 'next/server';
import { askMeeting } from '@/lib/ask-service';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try { const body = await request.json(); if (typeof body.question !== 'string' || !body.question.trim() || body.question.length > 1200) return NextResponse.json({ error: 'Ask a question of up to 1,200 characters.' }, { status: 400 }); return NextResponse.json(await askMeeting((await params).slug, body.question.trim())); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to answer this question.' }, { status: 500 }); }
}
