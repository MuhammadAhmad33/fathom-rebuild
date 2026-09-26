import { NextRequest, NextResponse } from 'next/server';
import { createHighlight } from '@/lib/meeting-service';

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const body = await request.json();
    if (typeof body.title !== 'string' || !body.title.trim() || body.title.trim().length > 160 || !Number.isFinite(body.startsAt) || !Number.isFinite(body.endsAt) || typeof body.note !== 'string') return NextResponse.json({ error: 'Invalid highlight.' }, { status: 400 });
    const highlight = await createHighlight((await params).slug, body);
    return NextResponse.json(highlight, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save highlight.' }, { status: 400 }); }
}
