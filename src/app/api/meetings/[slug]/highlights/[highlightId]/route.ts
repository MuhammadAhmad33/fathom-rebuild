import { NextResponse } from 'next/server';
import { deleteHighlight } from '@/lib/meeting-service';

export async function DELETE(_: Request, { params }: { params: Promise<{ highlightId: string }> }) {
  try { await deleteHighlight((await params).highlightId); return new NextResponse(null, { status: 204 }); }
  catch { return NextResponse.json({ error: 'Unable to delete highlight.' }, { status: 500 }); }
}
