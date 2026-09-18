import type { Meeting, Person, Segment } from './types';

const team: Person[] = [
  { id: 'maya', name: 'Maya Chen', role: 'Product Lead', initials: 'MC', color: '#8b7ee8' },
  { id: 'alex', name: 'Alex Rivera', role: 'Engineering', initials: 'AR', color: '#38a9b8' },
  { id: 'priya', name: 'Priya Shah', role: 'Design', initials: 'PS', color: '#e48c6d' },
  { id: 'james', name: 'James Wilson', role: 'Customer Success', initials: 'JW', color: '#5ebf91' },
  { id: 'sophie', name: 'Sophie Martin', role: 'Marketing', initials: 'SM', color: '#d778ac' },
  { id: 'daniel', name: 'Daniel Kim', role: 'Platform', initials: 'DK', color: '#cfad64' },
  { id: 'emma', name: 'Emma Brooks', role: 'Data', initials: 'EB', color: '#6f9be8' },
  { id: 'noah', name: 'Noah Williams', role: 'Quality', initials: 'NW', color: '#a5947e' },
];

const showcaseLines = [
  ['maya', 'Welcome everyone. Today is about making a final call on the Atlas private beta, then leaving with named owners for the work that still has to happen before launch.'],
  ['alex', 'Engineering has the release candidate in a stable state. The remaining risk is permissions: we need to make the default role understandable and prove public links cannot expose private workspaces.'],
  ['priya', 'The onboarding prototype is now three steps instead of five. In testing, people understood the invitation much faster when we explained what a viewer can do before asking them to choose a role.'],
  ['james', 'Northstar asked for one thing repeatedly: when a decision is forwarded to someone absent from the meeting, that person needs to reach the original context in one click.'],
  ['emma', 'That is measurable. We can track a successful shared-decision review rather than treating every invitation as activation. I will add the event names to the release dashboard.'],
  ['maya', 'Let us make that a product decision: transcript and title search ship in beta, and every transcript result opens the recording at the exact spoken moment.'],
  ['sophie', 'That gives us a clear story for the invitation. We are not promising magic; we are promising that teams can return to a decision without replaying an entire call.'],
  ['noah', 'I will cover the new visitor, returning user, and public shared-link paths in acceptance. I also want the final twenty minutes of this meeting tested because long transcripts are where small flaws show up.'],
  ['daniel', 'From the platform side, the core flow works through a refresh. I am adding an explicit error state for a delayed save so people do not see a success message before their change is actually stored.'],
  ['priya', 'For mobile, I will stack the recording above the summary and keep the primary controls reachable. The shared recipient experience should feel designed, not like a compressed desktop screen.'],
  ['james', 'Support can publish a short guide with the same language as the product. I will collect three pilot examples so the guide answers what customers actually ask.'],
  ['maya', 'Decision recorded: beta opens to twenty customer teams on September twenty-fourth, provided that permissions and accessibility pass the acceptance review.'],
  ['alex', 'I own the permission checks. I will attach the results to the release checklist by Monday morning and call out anything that requires a scope change.'],
  ['noah', 'I own the long-meeting and keyboard pass. I will test a narrow screen and a fresh browser session, then link every finding to its recording timestamp.'],
  ['sophie', 'I will prepare the personal invitations for the twenty approved teams, but I will hold the send until Maya confirms the acceptance pass is green.'],
  ['emma', 'I will monitor the first shared-decision reviews after launch and bring the team a small readout after forty-eight hours instead of a vanity metric.'],
];

const transcript: Segment[] = Array.from({ length: 64 }, (_, index) => {
  const [speaker, base] = showcaseLines[index % showcaseLines.length];
  const cycle = Math.floor(index / showcaseLines.length);
  const start = index * 54 + cycle * 2;
  return { id: `atlas-${index + 1}`, speaker, start, end: start + 42, chapter: cycle < 2 ? 'Beta readiness' : cycle < 3 ? 'Launch plan' : 'Decisions', text: cycle ? `${base} This is part of the ${cycle + 1}th review pass, and we are keeping the decision and its evidence connected for the team.` : base };
});

const atlas: Meeting = {
  id: 'atlas-launch', title: 'Atlas Launch · Product & Engineering', company: 'Acme Studio', date: '2026-09-18T09:00:00.000Z', duration: 3504, kind: 'internal', color: '#8679be', people: team, transcript,
  description: 'Private beta readiness, onboarding improvements, and the September launch plan.', media: '',
  summary: { purpose: 'Align the Atlas team on private beta readiness, resolve remaining product risks, and confirm owners for the September 24 launch.', takeaways: [
    { text: 'Private beta opens September 24 to 20 customer teams, subject to permission and accessibility checks.', time: 594 }, { text: 'Simplify onboarding from five screens to three and default new invitees to viewer access.', time: 108 }, { text: 'Ship title and transcript search with direct links to the exact spoken moment.', time: 270 }, { text: 'Defer advanced analytics and administration until the next milestone.', time: 756 },
  ], topics: [{ title: 'Private beta readiness', points: [{ text: 'The release candidate is stable; permissions are the remaining product risk.', time: 54 }, { text: 'Public links must remain read-only and isolated from private workspaces.', time: 432 }] }, { title: 'Review experience', points: [{ text: 'Search results should open the supporting moment in the recording.', time: 270 }, { text: 'The mobile shared link will prioritize clear reading and reachable controls.', time: 486 }] }], nextSteps: [{ text: 'Alex: finish permission checks and attach results to the release checklist.', time: 648 }, { text: 'Noah: run long-meeting, keyboard, and public-link acceptance testing.', time: 702 }, { text: 'Sophie: prepare invitations for the 20 approved beta teams.', time: 756 }, { text: 'Emma: publish the first shared-decision readout after 48 hours.', time: 810 }] },
  actions: [{ id: 'a1', text: 'Finish permission checks and attach results to the release checklist.', owner: 'alex', time: 648, done: false }, { id: 'a2', text: 'Run the long-meeting, keyboard, and public-link acceptance pass.', owner: 'noah', time: 702, done: false }, { id: 'a3', text: 'Prepare personal invitations for the 20 approved beta teams.', owner: 'sophie', time: 756, done: false }, { id: 'a4', text: 'Publish the activation readout after 48 hours.', owner: 'emma', time: 810, done: true }],
  highlights: [{ id: 'h1', title: 'Beta scope and launch decision', type: 'Highlight', start: 594, end: 690, note: 'Twenty customer teams, with clear acceptance conditions.' }, { id: 'h2', title: 'Make search results actionable', type: 'Positive reaction', start: 270, end: 324, note: 'A result should take viewers straight to the source.' }],
};

const compact = (id: string, title: string, date: string, duration: number, people: Person[], description: string, kind: Meeting['kind'] = 'internal'): Meeting => ({ ...atlas, id, title, date, duration, people, description, kind, color: people[0].color, transcript: atlas.transcript.slice(0, 8).map((s, i) => ({ ...s, id: `${id}-${i}`, start: i * 48, end: i * 48 + 36 })), highlights: [], actions: atlas.actions.slice(0, 2), media: '' });

export const meetings: Meeting[] = [atlas,
  compact('northstar-review', 'Northstar · Weekly product review', '2026-09-17T15:30:00.000Z', 2842, [team[0], team[3], team[6], team[7]], 'Pilot feedback, onboarding friction, and decision sharing.', 'external'),
  compact('design-crit', 'Atlas onboarding critique', '2026-09-16T11:00:00.000Z', 3378, [team[0], team[2], team[4], team[7]], 'Walkthrough of the invitation and onboarding experience.'),
  compact('launch-comms', 'Beta launch communications', '2026-09-15T13:00:00.000Z', 1924, [team[0], team[4], team[3]], 'Invitation language, pilot cohort, and launch schedule.'),
  compact('platform-sync', 'Platform reliability sync', '2026-09-12T10:00:00.000Z', 2166, [team[1], team[5], team[6], team[7]], 'Save states, recovery behavior, and release monitoring.'),
  compact('customer-call', 'Crescent Labs · Discovery call', '2026-09-11T16:00:00.000Z', 3186, [team[3], team[0], { id: 'lea', name: 'Lea Morgan', role: 'Crescent Labs', initials: 'LM', color: '#d77764' }], 'How Crescent Labs captures and shares weekly decisions.', 'external'),
  compact('accessibility', 'Accessibility acceptance review', '2026-09-10T14:30:00.000Z', 2730, [team[2], team[7], team[0], team[1]], 'Keyboard paths, focus states, and small-screen checks.'),
  compact('metrics', 'Atlas activation metrics', '2026-09-09T09:30:00.000Z', 1468, [team[6], team[0], team[3]], 'Event definitions and the first shared-decision dashboard.'),
  compact('roadmap', 'Q4 product roadmap', '2026-09-08T15:00:00.000Z', 4056, [team[0], team[1], team[2], team[4], team[5]], 'Priorities, dependencies, and scope decisions.'),
  compact('support', 'Support readiness office hours', '2026-09-05T12:00:00.000Z', 2280, [team[3], team[7], team[4]], 'Troubleshooting content and pilot support coverage.'),
];

export const getMeeting = (id: string) => meetings.find((meeting) => meeting.id === id);
