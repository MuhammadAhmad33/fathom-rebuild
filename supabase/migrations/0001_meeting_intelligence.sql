create extension if not exists pgcrypto;

create table meetings (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  title text not null, company text not null, occurred_at timestamptz not null,
  duration_seconds integer not null check (duration_seconds > 0),
  meeting_kind text not null check (meeting_kind in ('internal','external')),
  description text not null, media_url text, brief text not null,
  created_at timestamptz not null default now()
);
create table participants (
  id uuid primary key default gen_random_uuid(), name text not null, role text not null,
  initials text not null, color text not null
);
create table meeting_participants (
  meeting_id uuid references meetings(id) on delete cascade,
  participant_id uuid references participants(id) on delete cascade,
  position integer not null default 0, primary key (meeting_id, participant_id)
);
create table transcript_segments (
  id uuid primary key default gen_random_uuid(), meeting_id uuid not null references meetings(id) on delete cascade,
  participant_id uuid references participants(id) on delete set null,
  starts_at numeric(10,2) not null check (starts_at >= 0), ends_at numeric(10,2) not null check (ends_at > starts_at),
  chapter text not null, content text not null, position integer not null
);
create index transcript_meeting_position_idx on transcript_segments(meeting_id, position);
create table decisions (
  id uuid primary key default gen_random_uuid(), meeting_id uuid not null references meetings(id) on delete cascade,
  text text not null, source_segment_id uuid references transcript_segments(id) on delete set null, position integer not null
);
create table action_items (
  id uuid primary key default gen_random_uuid(), meeting_id uuid not null references meetings(id) on delete cascade,
  text text not null, owner_participant_id uuid references participants(id) on delete set null,
  source_segment_id uuid references transcript_segments(id) on delete set null,
  completed boolean not null default false, position integer not null, updated_at timestamptz not null default now()
);
create table highlights (
  id uuid primary key default gen_random_uuid(), meeting_id uuid not null references meetings(id) on delete cascade,
  title text not null, kind text not null default 'key_moment', starts_at numeric(10,2) not null, ends_at numeric(10,2) not null,
  note text not null default '', source_segment_id uuid references transcript_segments(id) on delete set null, created_at timestamptz not null default now()
);
create table shares (
  id uuid primary key default gen_random_uuid(), meeting_id uuid not null references meetings(id) on delete cascade,
  token text unique not null default encode(gen_random_bytes(18), 'hex'), highlight_id uuid references highlights(id) on delete cascade,
  created_at timestamptz not null default now(), revoked_at timestamptz
);
alter table meetings enable row level security; alter table participants enable row level security; alter table meeting_participants enable row level security; alter table transcript_segments enable row level security; alter table decisions enable row level security; alter table action_items enable row level security; alter table highlights enable row level security; alter table shares enable row level security;
