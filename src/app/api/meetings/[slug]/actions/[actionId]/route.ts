import { NextRequest, NextResponse } from 'next/server';
import { updateAction } from '@/lib/meeting-service';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ actionId: string }> }) {
  try {
    const body = await request.json(); const patch: { text?: string; completed?: boolean } = {};
    if (typeof body.text === 'string') { const text = body.text.trim(); if (!text || text.length > 500) return NextResponse.json({ error: 'Action text must be 1–500 characters.' }, { status: 400 }); patch.text = text; }
    if (typeof body.completed === 'boolean') patch.completed = body.completed;
    if (!Object.keys(patch).length) return NextResponse.json({ error: 'No valid changes supplied.' }, { status: 400 });
    return NextResponse.json(await updateAction((await params).actionId, patch));
  } catch { return NextResponse.json({ error: 'Unable to save action item.' }, { status: 500 }); }
}
