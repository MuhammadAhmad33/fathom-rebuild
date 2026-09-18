# Fathom rebuild

A focused rebuild of Fathom’s post-meeting experience for the 8x Software Engineer assignment.

**Live demo:** [fathom-rebuild-kappa.vercel.app](https://fathom-rebuild-kappa.vercel.app/)

## What is built

- Populated meeting library with 10 completed meetings
- Meeting workspace with a custom HTML5 media player and timestamped transcript
- Two-way review flow: transcript text/timestamps seek the player; playback marks the active segment
- Enhanced and Project Update summaries with linked source timestamps
- Editable, locally persisted action items
- Search across meeting titles, participants, and transcript content
- Deterministic, transcript-grounded Ask Fathom answers with seekable citations
- Highlights, short clip creation, and public read-only sharing
- Lightweight Team Calls, Playlists, Alerts, Settings, Refer, Help, and profile states

The main showcase is **Atlas Launch · Product & Engineering**: a seeded 58-minute meeting with eight participants, a dense multi-speaker transcript, decisions, action items, highlights, and a public share route.

## Key routes

- `/` → redirects straight to the populated My Calls product
- `/meetings/atlas-launch` — showcase workspace
- `/share/atlas-launch` — anonymous public meeting view
- `/share/atlas-launch?clip=launch-decision` — anonymous public clip view

Public share views do not require authentication or creator browser state.

## Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide icons
- Native HTML5 audio with custom player controls
- Typed seeded application data
- `localStorage` for lightweight edits, settings, and created highlights
- Vercel deployment

There is intentionally no separate backend, database, authentication layer, queue, or third-party API dependency in the product path.

## Product decisions

The 24-hour window was spent on the post-meeting experience: playback/transcript synchronization, summaries, action items, search, Ask Fathom, highlights/clips, and public sharing.

Recording/capture is intentionally stubbed, as permitted by the assignment brief. Meeting and transcript content is seeded. Ask Fathom is deterministic and grounded in that seeded transcript; it does not call an LLM. Calendar connections, Zoom/Meet/Teams bots, real recording, and transcription infrastructure are deliberately out of scope.

## Local setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run build
```

## Agent capture

Required prompt/final-response capture logs are committed in [`.agent-logs/`](.agent-logs/). Capture setup verification is documented in [`CAPTURE-TEST.md`](CAPTURE-TEST.md). The committed capture and reconnaissance material is excluded from the Vercel upload only; it remains part of the public repository submission.
