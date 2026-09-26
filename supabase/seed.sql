-- Demo-only relational seed. Apply after migrations in the Supabase SQL editor.
-- It provides the populated evaluator experience without any runtime fixture reads.
insert into participants (id,name,role,initials,color) values
 ('00000000-0000-0000-0000-000000000001','Maya Chen','Product Lead','MC','#8b7ee8'),
 ('00000000-0000-0000-0000-000000000002','Alex Rivera','Engineering','AR','#38a9b8'),
 ('00000000-0000-0000-0000-000000000003','Priya Shah','Design','PS','#e48c6d'),
 ('00000000-0000-0000-0000-000000000004','James Wilson','Customer Success','JW','#5ebf91'),
 ('00000000-0000-0000-0000-000000000005','Sophie Martin','Marketing','SM','#d778ac'),
 ('00000000-0000-0000-0000-000000000006','Daniel Kim','Platform','DK','#cfad64'),
 ('00000000-0000-0000-0000-000000000007','Emma Brooks','Data','EB','#6f9be8'),
 ('00000000-0000-0000-0000-000000000008','Noah Williams','Quality','NW','#a5947e'),
 ('00000000-0000-0000-0000-000000000009','Lea Morgan','Crescent Labs','LM','#d77764')
on conflict (id) do update set name=excluded.name;

insert into meetings (id,slug,title,company,occurred_at,duration_seconds,meeting_kind,description,media_url,brief) values
 ('10000000-0000-0000-0000-000000000001','atlas-launch','Atlas Launch · Product & Engineering','Acme Studio','2026-09-18T09:00:00Z',3504,'internal','Private beta readiness, onboarding improvements, and the September launch plan.','/media/atlas-launch.m4a','Align the Atlas team on private beta readiness, resolve remaining product risks, and confirm owners for the September 24 launch.'),
 ('10000000-0000-0000-0000-000000000002','northstar-review','Northstar · Weekly product review','Acme Studio','2026-09-17T15:30:00Z',2842,'external','Pilot feedback, onboarding friction, and decision sharing.',null,'Review pilot feedback and agree follow-ups.'),
 ('10000000-0000-0000-0000-000000000003','design-crit','Atlas onboarding critique','Acme Studio','2026-09-16T11:00:00Z',3378,'internal','Walkthrough of the invitation and onboarding experience.',null,'Review the onboarding experience.'),
 ('10000000-0000-0000-0000-000000000004','launch-comms','Beta launch communications','Acme Studio','2026-09-15T13:00:00Z',1924,'internal','Invitation language, pilot cohort, and launch schedule.',null,'Align launch communications.'),
 ('10000000-0000-0000-0000-000000000005','platform-sync','Platform reliability sync','Acme Studio','2026-09-12T10:00:00Z',2166,'internal','Save states, recovery behavior, and release monitoring.',null,'Review release reliability.'),
 ('10000000-0000-0000-0000-000000000006','customer-call','Crescent Labs · Discovery call','Acme Studio','2026-09-11T16:00:00Z',3186,'external','How Crescent Labs captures and shares weekly decisions.',null,'Understand the customer workflow.'),
 ('10000000-0000-0000-0000-000000000007','accessibility','Accessibility acceptance review','Acme Studio','2026-09-10T14:30:00Z',2730,'internal','Keyboard paths, focus states, and small-screen checks.',null,'Review accessibility acceptance.'),
 ('10000000-0000-0000-0000-000000000008','metrics','Atlas activation metrics','Acme Studio','2026-09-09T09:30:00Z',1468,'internal','Event definitions and the first shared-decision dashboard.',null,'Review activation metrics.'),
 ('10000000-0000-0000-0000-000000000009','roadmap','Q4 product roadmap','Acme Studio','2026-09-08T15:00:00Z',4056,'internal','Priorities, dependencies, and scope decisions.',null,'Set Q4 priorities.'),
 ('10000000-0000-0000-0000-000000000010','support','Support readiness office hours','Acme Studio','2026-09-05T12:00:00Z',2280,'internal','Troubleshooting content and pilot support coverage.',null,'Prepare pilot support.')
on conflict (slug) do update set title=excluded.title;

insert into meeting_participants (meeting_id,participant_id,position)
select m.id, p.id, p.position from meetings m cross join lateral (values
 ('00000000-0000-0000-0000-000000000001'::uuid,0),('00000000-0000-0000-0000-000000000002'::uuid,1),('00000000-0000-0000-0000-000000000003'::uuid,2),('00000000-0000-0000-0000-000000000004'::uuid,3),('00000000-0000-0000-0000-000000000005'::uuid,4),('00000000-0000-0000-0000-000000000006'::uuid,5),('00000000-0000-0000-0000-000000000007'::uuid,6),('00000000-0000-0000-0000-000000000008'::uuid,7)) p(id,position)
on conflict do nothing;
insert into meeting_participants (meeting_id,participant_id,position)
select m.id, '00000000-0000-0000-0000-000000000001'::uuid, 0 from meetings m where m.slug <> 'atlas-launch'
on conflict do nothing;

with lines(position,participant_id,content) as (values
 (1,'00000000-0000-0000-0000-000000000001'::uuid,'Welcome everyone. Today is about making a final call on the Atlas private beta, then leaving with named owners for the work before launch.'),
 (2,'00000000-0000-0000-0000-000000000002'::uuid,'Engineering has the release candidate in a stable state. The remaining risk is permissions and proving public links cannot expose private workspaces.'),
 (3,'00000000-0000-0000-0000-000000000003'::uuid,'The onboarding prototype is now three steps instead of five. People understood invitations faster when we explained viewer access first.'),
 (4,'00000000-0000-0000-0000-000000000004'::uuid,'Customers need to reach the original context in one click when a decision is forwarded to someone absent from the meeting.'),
 (5,'00000000-0000-0000-0000-000000000007'::uuid,'We can track a successful shared-decision review rather than treating every invitation as activation.'),
 (6,'00000000-0000-0000-0000-000000000001'::uuid,'Decision recorded: beta opens to twenty customer teams on September twenty-fourth, provided permissions and accessibility pass acceptance review.'),
 (7,'00000000-0000-0000-0000-000000000002'::uuid,'I own the permission checks. I will attach results to the release checklist by Monday morning.'),
 (8,'00000000-0000-0000-0000-000000000008'::uuid,'I own the long-meeting and keyboard pass. I will test a narrow screen and a fresh browser session.'),
 (9,'00000000-0000-0000-0000-000000000005'::uuid,'I will prepare invitations for the twenty approved teams and hold the send until the acceptance pass is green.'),
 (10,'00000000-0000-0000-0000-000000000007'::uuid,'I will publish a small activation readout after forty-eight hours instead of a vanity metric.')
), expanded as (select (round * 10 + position) as pos, participant_id, content || case when round=0 then '' else ' In this review pass, we are keeping the decision and its evidence connected for the team.' end as content from lines cross join generate_series(0,5) round)
insert into transcript_segments (id,meeting_id,participant_id,starts_at,ends_at,chapter,content,position)
select ('20000000-0000-0000-0000-' || lpad(pos::text,12,'0'))::uuid,'10000000-0000-0000-0000-000000000001'::uuid,participant_id,(pos-1)*54,(pos-1)*54+42,case when pos < 21 then 'Beta readiness' when pos < 41 then 'Launch plan' else 'Decisions' end,content,pos from expanded
on conflict (id) do nothing;

insert into decisions (meeting_id,text,source_segment_id,position) values
 ('10000000-0000-0000-0000-000000000001','Private beta opens September 24 to 20 customer teams, subject to permission and accessibility checks.','20000000-0000-0000-0000-000000000006',1),
 ('10000000-0000-0000-0000-000000000001','Simplify onboarding from five screens to three and default new invitees to viewer access.','20000000-0000-0000-0000-000000000003',2),
 ('10000000-0000-0000-0000-000000000001','Ship title and transcript search with direct links to the exact spoken moment.','20000000-0000-0000-0000-000000000004',3)
on conflict do nothing;
insert into action_items (meeting_id,text,owner_participant_id,source_segment_id,completed,position) values
 ('10000000-0000-0000-0000-000000000001','Finish permission checks and attach results to the release checklist.','00000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000007',false,1),
 ('10000000-0000-0000-0000-000000000001','Run the long-meeting, keyboard, and public-link acceptance pass.','00000000-0000-0000-0000-000000000008','20000000-0000-0000-0000-000000000008',false,2),
 ('10000000-0000-0000-0000-000000000001','Prepare personal invitations for the 20 approved beta teams.','00000000-0000-0000-0000-000000000005','20000000-0000-0000-0000-000000000009',false,3),
 ('10000000-0000-0000-0000-000000000001','Publish the activation readout after 48 hours.','00000000-0000-0000-0000-000000000007','20000000-0000-0000-0000-000000000010',true,4)
on conflict do nothing;
insert into highlights (id,meeting_id,title,kind,starts_at,ends_at,note,source_segment_id) values
 ('30000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Beta scope and launch decision','key_moment',270,366,'Twenty customer teams, with clear acceptance conditions.','20000000-0000-0000-0000-000000000006'),
 ('30000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000001','Make search results actionable','key_moment',162,216,'A result should take viewers straight to the source.','20000000-0000-0000-0000-000000000004')
on conflict (id) do nothing;
insert into shares (meeting_id,token) values ('10000000-0000-0000-0000-000000000001','atlas-launch') on conflict (token) do nothing;
insert into shares (meeting_id,highlight_id,token) values ('10000000-0000-0000-0000-000000000001','30000000-0000-0000-0000-000000000001','launch-decision') on conflict (token) do nothing;
