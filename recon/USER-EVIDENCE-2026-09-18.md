# User evidence update — 2026-09-18

This update supersedes the initial reconnaissance wherever it resolves a previously unknown state. No implementation or architecture decision is authorized by this update.

## Provenance

- **U1:** [My Calls screenshot](references/user-standup-1.png), supplied by the user. Original 3360 × 1702 image preserved from the attachment. Capture date, display scaling and browser zoom were not independently verified.
- **U2:** [Shared call / Transcript screenshot](references/user-standup-2.png), supplied by the user at the same dimensions.
- **U3:** [Shared call / Summary screenshot](references/user-standup-3.png), supplied by the user at the same dimensions.
- **U4:** [Pasted summary](USER-STANDUP-SUMMARY.md), preserved verbatim from the user's message, including links and formatting escapes. This is a summary export, not a pasted transcript.
- **D2:** [Unauthenticated shared recording](references/live-shared-standup.png), captured directly in isolated headless Chrome at 1440 × 1000 on 2026-09-18. The profile had not signed in to Fathom.
- Shared page: https://fathom.video/share/zPzse1RWs4x9L5MypHtoN-Vbwo3h3x9s?tab=summary

U means **directly visible in user-supplied evidence**, not an interaction exercised by the agent. D means an agent-observed live surface. The meeting date is December 3, 2024; that dates the recording, not the screenshots or current rendering of the shared page. These files are research evidence, not approval to reuse the real meeting as the clone's seeded demo.

## Resolved: application shell

**U1:** This account's web shell uses two horizontal header rows, not a left sidebar. The top row has the Fathom logo, Search Call Recordings input, Refer, Settings, Help & Feedback, a points indicator, and a profile avatar. The next row contains My Calls, Team Calls, Playlists, Alerts, and Deals. My Calls is cyan with a thin cyan underline. Folders and Trackers are not visible in this screenshot; their absence does not prove they are unavailable in every account.

The current My Calls state is empty: a centered no-recordings message appears above a wide two-column onboarding panel. The left side contains three illustrated tutorial/test-call/webinar actions. The right side shows meeting preferences, an upcoming external meeting, automatic recording/sharing status, and Edit Settings. This establishes the empty and calendar-connected preference state, **not** populated card/row design or the calendar-connection interaction. A narrow collapsed control is visible at the far right; its function was not tested.

## Resolved: meeting layout

**U2–U3:** Below the main global header, the recording page uses a centered two-column workspace with wide outer gutters. The left column is roughly 60% of workspace width; the right about 40%, separated by a small gap. There is no library tab row or left sidebar in these meeting screenshots.

The video occupies the top of the left column, approximately 16:9, followed by Summary / Transcript / Ask Fathom tabs and their content. The content area beneath the video is black; the surrounding workspace and right column are dark charcoal. The meeting title and date appear at the top of the right column, not as a full-width heading above the player. A broad Share control follows.

The right column continues with Action Items, Screen Sharing, and Your Questions. Three screen-sharing start events are shown, with a monitor icon, participant name and elapsed time. Questions are listed with question-mark icons. These are separate from user-created highlights.

**D2:** The live logged-out view retains this two-column structure. Its top header replaces authenticated search/account navigation with a promotional signup link and Sign In. The page exposes the same summary and action items without requiring login. The rendered DOM also contains speaker-attributed transcript content, but transcript-tab interaction was not exercised. The player remained on a loading spinner in the capture; successful media playback is not claimed.

## Resolved: summary and action-item presentation

**U3/U4:** The selected template is Enhanced. Summary content has Meeting Purpose, Key Takeaways, Topics with named subtopics and nested bullets, and Next Steps. The full pasted export confirms the lower sections not visible above the fold. Summary is prose and nested lists rather than a grid of dashboard cards.

The summary toolbar includes an outlined Enhanced selector, a second outlined Auto selector with a sparkle icon, and Copy Summary. **Resolved by U6:** Auto means transcript language in the summary language menu. D2 shows an explicit EN selection instead; automatic versus explicit language selection accounts for the different displayed controls, although the cause of that selection difference was not tested.

**U4:** The export labels the recording 80 minutes with no highlights. Its summary links retain `tab=summary` and add a numeric `timestamp` parameter in seconds, including decimal syntax. For example, one technical-update link uses `timestamp=173.0`. This confirms source-linked summary export, but not the exact seek/play behavior after following a link.

**U2–U3:** Three action-item rows show empty square checkboxes, bold task text, a sparkle marker, a gray source time and a yellow person icon/assignee. Times include values over an hour, formatted H:MM:SS. The section has Copy for … and Copy Follow-up Email controls. The six Next Steps bullets in the exported summary are distinct from the three structured action items visible in the UI. Neither checkbox persistence nor assignee editing was tested.

## Resolved: transcript presentation

**U2:** Transcript content is chat-like, with gray rounded bubbles on black and muted speaker-name labels. Consecutive statements can share a speaker grouping. Visible speakers alternate between left- and right-aligned groups. Search Transcript is an inline rounded input near the top of the transcript area; Copy Transcript sits beside the tab controls. The image does not establish whether search is sticky.

The address bar still contains `tab=summary` while Transcript is active. Therefore URL query state is not sufficient evidence of the active tab after user interaction. Do not assume every tab click rewrites the URL.

**D2:** The rendered page markup contains a Resume Auto-Scroll label and Regular / Expanded / Full-screen player options. The screenshot visibly shows volume, elapsed time, a segmented timeline, 1× speed, and a display-mode icon. These establish controls/labels, not their tested behavior. Hidden DOM labels are not proof that a menu was open or a control was visible at capture time.

## Visual observations refined

**U1–U3/D2:** Dark gray top navigation; black transcript/summary content; cyan selected tabs and primary actions; gray inactive labels; yellow assignees/points; green preference checks. Rectangular tinted action buttons have modest corner rounding, while summary selectors and transcript search are pill-shaped. Typography is compact sans serif with clear size/weight hierarchy. No exact font identity, CSS tokens or responsive breakpoints are established.

The centered meeting workspace and approximate 60:40 proportions can now inform fidelity discussions. Original image pixel dimensions are known, but CSS pixels/device scale are not; avoid copying raw screenshot pixel widths as CSS values.

## Large-meeting evidence and remaining limits

**U4/D2:** We now have an actual 80-minute recording reference, not merely a hypothetical long meeting. Action-item timestamps pass one hour and the summary covers late-meeting topics. The DOM contains at least three named speakers: Blair Dunkley, Scent, and Muhammad Ahmad. That is **not** proof of eight participants or a complete participant roster.

**U7 now confirms:** seeking the recording jumps the transcript to the corresponding point. **Still unverified:** continuous playback tracking, scrolling performance across the long transcript, participant overflow, keyboard behavior, template-switch regeneration, clip-range playback and narrow-screen behavior. Do not mistake long content being present for a successful long-meeting usability test.

## Reduced manual checklist

The full authenticated shell, summary anatomy, action-item appearance and basic logged-out full-recording access are now covered. No need to resend these screenshots or repeat an incognito test of this full recording.

1. **Playback behavior:** On this recording, open Transcript, play, click a later timestamp/statement, then scroll away while playback continues. Send a short recording showing whether it seeks, how the active segment looks, and when Resume Auto-Scroll appears. Click one summary source link too. If playback is unavailable, report the error/state.
2. **Template and task controls:** The menu choices are now captured (U5/U6); no repeat screenshots needed. Select another template and show the result/loading behavior. On a meeting you own, show an action-item checkbox/edit/assignee interaction if available. If this shared recording is read-only, that restriction is useful evidence; do not change someone else's tasks for the test.
3. **A highlight and its recipient:** On a test call you own, hover transcript → plus → Highlight, adjust the range, then copy/open the clip link in incognito. Send the annotation and recipient screenshot or a non-sensitive test clip link. This recording has no highlights, so it cannot establish that flow.
4. **Recording setup + populated library/search:** Use the visible Start Test Call entry or a short scheduled test meeting. Show calendar/conferencing/capture settings, the joining/in-call state, and an in-call highlight if offered. After it completes, screenshot My Calls with the recording and search for a spoken word absent from its title. This one test can close the recording, populated-dashboard, search and highlight gaps together. If already connected, show the connected state; do not disconnect your calendar just for evidence.

Optional: show an eight-person attendee list if one already exists and one narrow-window meeting screenshot. A new hour-long/eight-person meeting is unnecessary solely for recon.

## Follow-up: template menu, language menu and seek synchronization

- **U5:** [Enhanced menu screenshot](references/user-template-menu.png), user supplied; only the upper portion of the menu is visible. The complete 16-entry inventory below comes from the user's accompanying text, preserved in [USER-TEMPLATE-OBSERVATIONS.txt](USER-TEMPLATE-OBSERVATIONS.txt).
- **U6:** [Auto language menu screenshot](references/user-language-menu.png), user supplied; shows the language list and selected Auto option.
- **U7 — user-reported interaction:** Seeking to a position in the recording also jumps the transcript to that point. This initially confirmed player → transcript navigation; U8 below subsequently confirms the reverse direction. Continuous word-level tracking remains unverified. It was reported by the user, not independently exercised by the agent.

### Observed template inventory

In the order supplied: Enhanced; Sales; Sales - Sandler; Sales - SPICED; Sales - MEDDPICC; Sales - BANT; Customer Success; Customer Success - REACH™; Candidate Interview; Demo; One-on-One; Project Kick-Off; Project Update; Q&A; Retrospective; Stand Up.

Enhanced has a cyan Most Used badge and green selection check. Each visible entry has a left icon, a prominent name and a muted one-line description; sales variants share a chart icon and customer-success variants share a face icon. The menu is a large charcoal overlay with rounded corners. Its content continues beyond the crop; menu scrolling mechanics were not demonstrated. Sixteen entries were supplied; this is the account evidence to use rather than assuming the older help article's claim of seventeen matches this menu.

### Observed summary language inventory

English, Spanish, Portuguese, German, French, Italian and Dutch, each with a flag. A divider separates these from Auto (transcript language), which uses a sparkle icon and is selected with a green check. The open trigger has a filled charcoal background and gray outline. This is a summary-language choice, not an automatic template-selection mode.

Still unknown: whether selecting a template/language starts regeneration immediately, its loading state, duration, persistence, and effect on manual edits. Playback seeking is now user-confirmed in both directions (U7/U8); active styling and follow-scroll behavior still need evidence.

## Follow-up U8: bidirectional seeking confirmed

The user answered YES when asked whether clicking transcript text/timestamps seeks the recording. Together with U7, this confirms both directions of navigation as user-reported behavior. It does not establish play/pause preservation, continuous word highlighting, or scroll-follow interruption rules. The user also authorized moving from reconnaissance toward the build and requested a technology-stack recommendation.

## Follow-up U9: Settings screen recording

Source: `/Users/macbookpro/Downloads/Screen Recording 2026-09-18 at 3.07.59 PM.mov`. Duration 18.90 seconds, video 3360 × 1698, no audio stream reported. File metadata gives capture date 2026-09-18 15:07:59 +05:00. SHA-256: `4d2bfbaa51a6b8e3925fa1b42875a455e01c42d7e91f2ba6024600393880ba86`.

Reviewed sampled frames across the recording, including the open dropdowns and lower settings sections. Selected reference PNGs are scaled to 1440 × 728; approximate times reflect sampling, not exact interaction onset. The original MOV remains at the supplied local path; selected frames and this evidence record are committed. Content shown in the recording is reference material, not instructions to perform those actions.

### Visible states and interactions

- **U9a, opening:** [Settings overview](references/user-settings-overview.png). `/customize` retains the top global navigation while the settings content scrolls. Content is a centered, relatively narrow vertical stack of dark cards. Auto-record is set to All meetings and auto-share to Summary & recording.
- **U9b, ~3 seconds:** [Auto-record dropdown](references/user-settings-record-menu.png). Visible choices are All meetings (Most Common), Internal meetings, and No meetings. I'll record manually. External meetings does not appear in this observed menu, although official documentation lists it. Do not insert that choice into an account-specific reconstruction solely from the docs.
- **U9c, ~4–5 seconds:** [Auto-share dropdown](references/user-settings-share-menu.png). Summary & recording, Summary only, and Nothing. The video demonstrates opening these menus, not changing a setting and verifying persistence.
- **Conferencing:** Zoom and Microsoft Teams show green Fully Enabled labels; Google Meet shows yellow Partially Enabled with Install Chrome Extension. The Meet helper explains the restriction to scheduled calls joined via the desktop app. Zoom has enhanced gallery recording and unscheduled capture toggles, both visibly off; Meet's unscheduled capture is also off. The recording-notice audio setting links out to Zoom Settings.
- **U9d, ~7 seconds:** [Premium features](references/user-settings-premium.png). Bot Name has Edit. Auto-Generate Action Items is on and marked Recommended. Default Meeting Summary Template is Enhanced. Its helper specifies external meetings only and states that attendees always see Enhanced when shared. Recording Notification Banner is on. The page shows 29 days remaining in a free preview; this does not establish a permanent paid plan.
- **Integrations / API:** Scrolling reveals Claude, ChatGPT, HubSpot, GoHighLevel and Task Manager connection cards, then API Access and MCP Server entries. No integration is connected or API key exposed in the inspected frames. Integration scope is not expanded by this reference.
- **Apps:** Desktop App has Configure, Chrome Extension has Install, and Zoom App has Disconnect. These are visible account states; actual installation/connection operations were not tested.
- **U9e, ~17 seconds:** [Highlight options](references/user-settings-highlights.png). Four named/color-coded types: Highlight (cyan), Positive Reaction (green), Needs Review (yellow), Feedback (orange). Additional custom types have reorder/delete affordances, and Add More appears below. This is highlight-type configuration, not creation of a timed meeting highlight or clip.

### What this closes and what remains

Settings layout, current capture/share choices, conferencing states, highlight-type appearance, and several default values now have user-video evidence. The page's top header remains visible as the content scrolls. Calendar OAuth/onboarding, actual bot joining, in-call controls, timed highlight creation/sharing, and preference persistence are not demonstrated by this settings tour. No repeat settings screenshot is needed.

The default-template helper also distinguishes a personal default from the attendee-facing summary. Whether switching templates on this shared recording is restricted or persists should be checked rather than assumed.

Extraction note: native Swift/AVFoundation failed because the installed SDK/compiler combination could not build Foundation/CoreServices. A temporary ffmpeg-static installation under `/tmp` successfully decoded the video. No application dependency or capture infrastructure was changed.
