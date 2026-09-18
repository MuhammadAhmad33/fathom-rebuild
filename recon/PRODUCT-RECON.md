# Fathom product reconnaissance

Research date: **2026-09-18 Asia/Karachi / 2026-09-17 UTC**. Phase: reconnaissance only. No application code or architecture decision has been made.

**Updated 2026-09-18 UTC:** The user supplied three full screenshots and an 80-minute recording's linked summary. The shared page was also inspected while logged out. See [the evidence update](USER-EVIDENCE-2026-09-18.md) and [preserved summary](USER-STANDUP-SUMMARY.md). U1–U4 and D2 below refer to that update. This resolves the top navigation, two-column meeting layout, summary structure and action-item appearance; section 12 now contains the reduced evidence request.

## Evidence standard and scope

- **D — Directly observed:** live public surface accessed during this session, including the sign-in screenshot.
- **U — User-supplied visual/text evidence:** directly visible in supplied screenshots/export; not an interaction exercised by the agent.
- **O — Officially documented:** current accessible Fathom help/product material. This verifies what Fathom documents, not that the behavior was exercised in an authenticated account.
- **O-image — Official reference image:** visually inspected image embedded in an official article. Its capture date and product build are unknown unless stated. These are not fresh authenticated screenshots.
- **I — Inferred/proposed:** a working interpretation or assignment recommendation, not a Fathom fact.
- **X — Inaccessible/unverified:** needs live account, recording, or user evidence.

The browser automation runtime failed twice before opening a browser, reporting a sandbox initialization error (`unbound variable: TIOCSTI`). With permission, an isolated headless Chrome profile successfully captured the live sign-in page. It has no authenticated Fathom session. `/home` and `/customize` redirected to sign-in through web access; the Team Calls fetch failed. No account was created, calendar connected, call recorded, invitation sent, or existing recording changed.

Native capture is running and the complete inline assignment prompt is in `.agent-logs/`. The earlier attachment is preserved in [ASSIGNMENT-BRIEF.txt](ASSIGNMENT-BRIEF.txt) so its contents remain available alongside the captured attachment reference. Capture infrastructure was not modified.

### Important version differences

**O:** Fathom documents both a previous meeting-bot experience and a redesigned 3.0+ desktop experience. The upgrade guide describes transcript-only, audio-only, and bot audio/video capture, live summaries, a scratchpad, and a live-to-final summary transition. [S4]

**O:** More recent Zoom-specific instructions support bot-free video through the Zoom desktop app; browser-based Zoom can lose video and speaker attribution. Therefore, the upgrade guide's simpler capture-mode list is not exhaustive across platforms. [S5]

**O:** May 2026 release notes retire Chronological summaries in favor of General/Enhanced. June notes add short summaries to desktop My Meetings; August notes allow organizations to disable botless capture. These changes must be considered when reading older screenshots. [S6]

**X:** The user's account version, subscription, enabled features, and exact web/desktop differences remain unknown. The in-call highlight requirement particularly needs version confirmation: official articles describe old in-call highlighting, present post-call highlighting, and a forthcoming replacement clip workflow. Do not combine these into an invented universal UI. [S12–S14]

## 1. Product information architecture

| Surface | Evidence | What is established |
|---|---|---|
| Public marketing | D | `fathom.video/` redirects to `www.fathom.ai/`; separate marketing and application surfaces. [S1] |
| Authentication | D | Google, Microsoft, and SSO options; separate sign-up link. [R1] |
| Personal library | O | My Calls is the web entry point at `/home`. [S12] |
| Shared library | O | Team Calls; filters for teams and call type; recording search. [S7] |
| Desktop library | O | My Meetings terminology, with short meeting summaries. [S6] |
| Meeting recording | O | Recording, transcript, notes/summary, highlights, action items, sharing, and Ask Fathom. [S7–S11, S15] |
| Folders / Playlists | O | Folders organize full calls; playlists collect selected clips. [S16] |
| Deals / team intelligence | O | Deal context, account-wide questions, AI Search and Trackers; plan-dependent. [S8–S9] |
| Settings | O | Capture/share defaults, conferencing connections, integrations, installed apps, highlight types. [S3] |

**U1:** The supplied web shell has a top bar with logo, recording search, Refer, Settings, Help & Feedback, points and avatar. A second horizontal row contains My Calls, Team Calls, Playlists, Alerts and Deals. There is no left sidebar in this view. Sticky behavior and responsive navigation remain X. [Evidence update](USER-EVIDENCE-2026-09-18.md)

## 2. Screen inventory and dashboard

| Screen/state | Verified content | Missing evidence |
|---|---|---|
| Sign-in | Public screenshot at 1440 × 1000 [R1] | Mobile sign-in behavior |
| My Calls / Team Calls | My Calls empty shell/onboarding now visible [U1]; shared-call access documented [S7] | Populated card versus row density, grouping, hover actions |
| Search results | Transcript match grouped under a meeting; speaker excerpt and Play control [R2] | Current result ranking, result limits, loading and empty state |
| Meeting shared view | Two-column player/content + title/date/actions [U2–U3/D2] | Owner-only controls and first-open defaults without query |
| Transcript hover / highlight | Highlight range and annotation menu [R3–R4] | Current speaker block appearance, hover trigger area |
| Template customization | Selector, modal, generated-state banner [R5–R7] | Full template menu, generation progress, error states |
| Share dialog | Audience selector, people, role dropdown, Copy Link [R8–R9] | Current external clip recipient view |
| Calendar / upcoming | Next external meeting and recording/sharing preferences displayed [U1] | Connection interaction and calendar settings screens |
| Recording / processing | Mode selection and live-to-final transition [S4] | Actual joining, recording, failed and processing visuals |

**O-image:** The library search screenshot contains a TODAY group, a rounded charcoal meeting row, meeting title, calendar date, a transcript-match count, an icon and a circular person avatar. A speaker-attributed excerpt follows with the search term in cyan and an outlined Play button. It contains **March 5, 2025** in the image, so it is explicitly historical reference evidence. [R2]

**X:** Duration badges, participant overflow, thumbnails, exact dashboard grouping, selected/hover states, pagination and responsive rearrangement are not established by that crop. Do not use the search row as proof of the current ordinary dashboard card design.

## 3. Core user journeys

| Journey | Verified steps | Boundary |
|---|---|---|
| Connect calendar | Sign up → authorize Google/Microsoft calendar → upcoming meetings become available → configure capture and conferencing. [S2–S3] | OAuth screens not traversed |
| Get capture into a meeting | Configure automatic capture or initiate capture; choose mode in 3.0+; bot admission can matter for bot meetings. [S3–S5] | No live call run |
| Review completed meeting | Open My Calls → select recording → review content and supporting transcript. [S7, S12] | Current complete layout unknown |
| Find a spoken moment | Search keyword/phrase/name/email → transcript result → Play seeks to the matching moment. [S7] | Interaction documented, not exercised |
| Change summary | Choose type; gear opens custom instructions; regenerate; optionally apply to future summaries. [S10] | Template selection's loading/persistence behavior unknown |
| Turn discussion into follow-up | AI action items have assignees; items can be edited/completed and linked to source context. [S11, S21] | Exact controls not observed |
| Create/share a moment | Transcript hover → plus → type → adjust range → annotation share icon → copied clip link. [S12] | Public recipient and clip boundary behavior untested |

**O:** New consumer-email sign-ups require a calendar meeting in the next seven days containing a supported conferencing link. The guide warns that failing this eligibility check can block that email from another free sign-up. If the user needs a new account, arrange that test event before starting sign-up. [S2]

**O:** Settings distinguish capture scope (all, internal, external, none) from post-meeting sharing (summary plus recording, summary only, nothing). Connecting a calendar, recording a meeting, and granting recording access are separate product decisions. [S3]

## 4. Detailed meeting-detail anatomy

This is an evidence map, **not an invented wireframe**.

| Region | Established anatomy | Status / uncertainty |
|---|---|---|
| Header | Title/date at top of right column; Share below [U2–U3] | U; owner, breadcrumb and overflow variants X |
| Attendees | Right-side Attendees list in documented CRM-enabled call view [S22] | O; eight-person overflow and avatar treatment X |
| Player | Above left-column content; roughly 16:9 [U2–U3]; volume/time/timeline/1×/display control visible [D2] | U/D; actual playback, speed and display changes untested |
| Content tabs | Summary, Transcript and Ask Fathom directly under player [U2–U3] | U; cyan active text/underline |
| Ask Fathom | Tab under player in this shared call [U2–U3]; other placements documented [S9] | U/O; tab contents not yet inspected |
| Summary tools | Enhanced and Auto selectors + Copy Summary [U3]; EN language selector in logged-out view [D2] | U/D; Auto meaning and full menu unverified |
| Transcript | Speaker-labelled gray chat bubbles, left/right groups, search field [U2]; hover/range documented [S12] | U/O; active-playback styling and click behavior X |
| Copy | Copy Transcript is above transcript [S18] | O; toast/clipboard payload format X |
| Action items | Right column: checkboxes, bold task text, source time, yellow assignee; copy/export buttons [U2–U3] | U; edit/assignment/persistence behavior X |
| Annotations | Right-side clip card with type, duration, summary, play triangle, link and ellipsis [R4] | O-image |
| Clip overflow | Delete annotation, download MP4 clip, add to playlist [R4] | O-image; permission/version dependent |
| Sharing | People/access list plus separate audience and copy-link controls [R8] | O-image |

**U2–U3/D2:** The shared meeting layout is now established: centered two-column workspace, player then content tabs on the left, title/date/Share/action items/screen-sharing events/questions on the right. Approximate column ratio is 60:40. This is not proof of an identical owner/editor view. [Evidence update](USER-EVIDENCE-2026-09-18.md)

## 5. Visual design system observations

### Current public sign-in — directly observed

[R1](references/live-sign-in.png) is a live 1440 × 1000 capture. Black page, centered top wordmark, dark bordered sign-in panel on the left, testimonial on the right, and muted customer logos across the bottom. The panel is approximately 463 × 474 screenshot pixels at x=180/y=242. Provider buttons are approximately 288 × 56 pixels, vertically stacked. The panel has roughly 24-pixel rounded corners; provider controls have smaller rounded corners. These measurements apply **only to this public screen**, not authenticated design tokens.

### Authenticated references — official images, not live measurements

| Property | Evidence-backed observation | What remains unknown |
|---|---|---|
| Typography | Sans serif; white primary text, gray secondary text; bold modal titles and compact uppercase section headings [R2–R9] | Font family, actual CSS sizes/weights and line heights |
| Hierarchy | Modal title → helper text/field label → input → primary action; annotation title → duration → summary [R4, R6] | Full meeting-title hierarchy |
| Color | Black/near-black canvas, charcoal panels, cyan/sky-blue interactive accents; green selected check, yellow restriction text [R3–R9] | Authoritative hex values/design tokens |
| Borders/shadows | Fine gray input/menu outlines; panel contrast does much of the separation [R5–R9] | Actual shadow values |
| Radii | Fully rounded selector pills; smaller rounded buttons/cards; rounded dropdown menus [R2, R4–R8] | Exact CSS radii |
| Spacing | Generous modal padding; compact transcript bubbles and annotation cards [R3–R9] | Spacing scale, page gutters, column gaps |
| Buttons | Cyan outline for copy/apply actions; filled sky-blue regeneration action; compact icon buttons [R6–R8] | Hover, disabled and keyboard focus states |
| Dropdowns | Chevron triggers; selected audience has check mark and icon [R5, R8] | Keyboard navigation and dismissal behavior |
| Tabs | Active cyan text and underline; inactive gray text [R5] | Tab overflow and narrow-width layout |
| Icons/avatars | Thin line action icons; circular photo avatar in search; colored highlight range handles [R2–R4] | Icon library; participant grouping |
| Selected range | Cyan-tinted transcript bubbles and a vertical cyan extent with diamond handles [R3] | Whether active playback uses the same treatment — not established |
| Responsive | No authenticated narrow-width reference | Sidebar collapse, stacking, player behavior, minimum widths |

The dark/light FAQ says switching was unavailable, but its edit date is August 2025. Treat it as historical guidance, not a verified statement about every 3.0+ surface. [S20]

**U1–U3:** User screenshots now corroborate the dark/cyan treatment and establish top navigation rather than a left sidebar. **I:** Use their centered workspace and column proportions for fidelity discussion; exact font, CSS tokens and responsive behavior remain unmeasured. No implementation layout has been selected.

## 6. Interaction behavior: transcript and playback

| Interaction | Finding |
|---|---|
| Search-result Play | O: seeks to the matching spoken moment. [S7] |
| Transcript sentence click | X: not directly tested; do not assume every text click seeks |
| Transcript timestamp click | I: likely a navigation affordance, but exact behavior and play/pause preservation unverified |
| Active segment | X: current highlight style, word versus block tracking, and timing precision unknown |
| Auto-scroll | D2: rendered DOM contains Resume Auto-Scroll; X: when it appears and how following resumes remain untested |
| Speaker identity | O: product material promises speaker attribution; Zoom capture mode can affect it. [S5, S23] |
| Hover actions | O: plus for highlight; transcript ellipsis for trimming. [S12, S17] |
| Highlight range | O: resize by dragging through transcript; O-image: vertical handles and colored bubbles. [S12, R3] |
| Clip play | O-image: triangle and displayed duration; X: whether it loops/stops/continues at range end. [R4] |
| Transcript trim | O: remove selected/before/after sections; corresponding video is trimmed; audio-only unsupported. [S17] |

The documented trimming operation is destructive, so it is not needed for the user's manual verification. Opening the menu is sufficient. No trimming was performed.

## 7. Search behavior

**O:** Standard library search accepts keywords, phrases, names and email addresses; results can navigate directly into matching speech. [S7] **O-image:** Results show a meeting grouping, speaker-attributed excerpt and colored matched term. [R2]

**O:** AI Search is a separate Team-plan workflow surfaced below normal results. Its filters include date window, team access, internal/external meeting type and who spoke. Search scope respects shared-call access. Search results can become shareable clips/playlists or subscriptions. [S8]

**O:** Ask Fathom is another distinct experience: conversational questions across a call or accessible collections. The help article names titles, summaries, transcripts and attendees as inputs, and says call-view chat history is not retained after leaving. Product marketing advertises citations linking to exact transcript moments. [S9, S23]

**X:** Standard search's exact coverage of summary-only text, fuzzy matching, debounce, highlighted excerpt count, pagination and keyboard shortcuts are not established. AI Search, Ask Fathom and plain text search should not be conflated. The current Ask Fathom plan availability is inconsistent between the release log and feature article; verify what this account exposes rather than implementing paywall assumptions. [S6, S9]

## 8. Summary and action-item behavior

**O:** General/Enhanced is the current baseline. Official material lists sales frameworks, Q&A, customer-success, one-on-one, project, interview and retrospective alternatives. The article claims 17 templates, but that number is not a verified live menu inventory. [S6, S11]

**O:** Customization augments the chosen template with instructions. The gear opens an input dialog; regeneration produces a revised result and an option to reuse the instructions on future summaries. Pencil and reset controls appear afterward. This customization is documented for the web app rather than the new desktop app. [S10, R5–R7]

**O:** Action items include assignment; documented task integrations support changing text, completion state, creating/deleting items and source-moment links. The transcript plus can create an Action Item. [S11, S21–S22]

**U3/U4:** Enhanced summary structure is now verified: Meeting Purpose, Key Takeaways, Topics with nested sections, and Next Steps. Pasted summary bullets link to recording URLs with `tab=summary` and numeric `timestamp` seconds. Structured action items visibly have checkboxes, timestamps and assignees; summary Next Steps are a separate list. **X:** Source-link playback behavior, summary editing, assignee picker, deadlines, template regeneration/caching/edit preservation and persistence still need interaction evidence. [Evidence update](USER-EVIDENCE-2026-09-18.md)

## 9. Highlights, clips and sharing

**O:** In the previous experience, an in-call highlight starts retroactively at the attendee's speaking turn and ends when the recorder's user resumes substantive speech; it can also be ended manually. That model differs from simply recording the next fixed number of seconds. [S13]

**O-image:** Post-call annotations display a short derived description and duration. A highlighted transcript range and the annotation card are two representations of the same moment. The screenshot also contains an internal-only marker; its full permission implications were not exercised. [R3–R4]

**O:** Highlight types can be named, colored and reordered in settings. Clip collections and complete-call folders are different objects. [S14, S16]

**O:** Full recordings have link audiences (public-link, same-domain, explicitly added) separate from role levels. Limited viewers see reduced sharing information; standard/admin roles grant different capabilities. The Share dialog reflects that distinction. [S15, R8–R9]

**D2:** The supplied full-recording link now loads without authentication, displaying summary/action items and exposing transcript content in the rendered page. Its header has signup and Sign In instead of authenticated navigation. Actual media playback was not verified because the player was loading. **X:** A highlight clip URL is still needed for clip boundaries, recipient controls, access inheritance and full-call exposure. A full-recording link is not a clip-security test. [Evidence update](USER-EVIDENCE-2026-09-18.md)

## 10. Large-meeting considerations

**U4/D2:** An 80-minute recording is now available, including hour-plus action-item timestamps and a long summary/transcript. At least three speaker names occur in the rendered transcript. **X:** Eight participants, transcript virtualization, performance, participant overflow and long-call usability are not established simply by loading this recording.

**O:** Zoom Live Stream documentation says gallery recording can mirror gallery view, but screen sharing records the shared screen and speaker. The resulting video layout is capture-dependent; eight attendees do not prove an eight-tile player UI. [S24]

**I — later evaluation scenarios, not implementation commitments:**

- Use one coherent 55–65 minute meeting with eight recurring speakers, natural pauses, short interjections and unequal participation.
- Seek near the beginning, middle and end; verify that transcript and playback remain aligned and time formatting is consistent.
- Manually scroll far from the current segment while playing; verify that reading remains controllable.
- Inspect long names and eight-person presentation at laptop and narrow widths.
- Search for a phrase repeated by different people and in different meetings; preserve enough context to choose the right occurrence.
- Test a multi-speaker highlight with boundaries near a speaker transition; share and open as an unauthenticated recipient.
- Include several decisions and owner-specific action items distributed across the whole meeting; switching templates should retain meaningful source coverage.

An existing long recording is sufficient research evidence. The user need not stage a new one-hour/eight-person meeting solely for reconnaissance.

## 11. What is observed, documented, inferred and inaccessible

| Confidence | Findings |
|---|---|
| D / U | Live sign-in; marketing/auth redirects; user-supplied top navigation, empty library, two-column shared meeting, summary export, task appearance; live logged-out full-recording content |
| O / O-image | Main named surfaces; calendar/capture choices; documented search seeking; summary customization; highlight creation/range; share controls; action-item capabilities; official local component appearance |
| I | Meeting detail is the best centerpiece; coherent long seeded meeting is valuable; typography/layout direction remains provisional |
| X | Populated library, precise visual tokens, playback/scrolling behavior, source-link seeking, template/task editing, clip recipient interaction, eight-person responsiveness |

Reference images are stored locally with source URLs in [references/assets.json](references/assets.json) and provenance in [references/README.md](references/README.md). No third-party screenshot has been treated as current evidence. An official Loom embed was located through AI Search documentation, but the video could not be retrieved through web access; it was not treated as watched evidence. A marketing AVIF was downloaded to `/tmp` but could not be decoded by available image tools; it is not used as visual evidence.

## 12. Minimum missing evidence from the user

Updated after U1–U4/D2. The full shell, meeting layout, summary structure, action-item appearance and basic logged-out recording access are covered. Do not repeat those screenshots. Detailed steps are in [the reduced checklist](USER-EVIDENCE-2026-09-18.md#reduced-manual-checklist).

1. **Playback:** A short recording showing transcript click-to-seek, the active segment, scrolling away/resuming auto-scroll, and clicking one summary source link.
2. **Templates/tasks:** Open Enhanced and Auto menus, change template, and show what regenerates. On an owned test recording, show task checkbox/edit/assignee behavior; report read-only restrictions on this shared call.
3. **Highlight/clip:** Create and resize one highlight on an owned test recording. Show its annotation and open the clip link in incognito, or provide a non-sensitive test clip link. The supplied recording explicitly has no highlights.
4. **Capture/library/search:** A short test call can supply joining/in-call evidence and a populated My Calls screenshot. Also show connected calendar/conferencing/capture settings, then search for a spoken word absent from the test call's title. Use existing connection state; no calendar disconnect is needed.

Optional: an existing eight-person attendee view and one narrow-window screenshot. No new hour-long meeting is required solely for research. The current 80-minute recording is sufficient long-content reference, while eight-person and performance behavior remain unverified.

## Initial product opinion — for discussion, not approved scope

**I:** Prioritize a connected journey: populated meeting library → detailed meeting review → find the relevant moment → turn it into an action or shareable clip. A convincing meeting-detail experience exercises most assignment requirements and gives the walkthrough a coherent story.

The strongest candidates are synchronized playback/transcript, useful source-linked summaries with meaningful template differences, editable action items, cross-meeting transcript search, and a working unauthenticated clip recipient view. A compact calendar/capture simulation can make the beginning of that journey understandable while honoring the explicit permission to stub the recording bot.

Defer enterprise administration, deep CRM synchronization, deal coaching, tracker subscriptions, playlists and broad account-wide AI until the central journey is strong. These are initial tradeoffs only. The current shared-view layout is now evidenced; choose scope together before architecture or implementation.

## Source register

All sources accessed during this research session. Dates below are the page's displayed edit dates, not image-capture dates.

| ID | Official source | Edited |
|---|---|---|
| S1 | [Fathom home](https://www.fathom.ai/) | Not displayed |
| S2 | [Quick Start](https://help.fathom.video/en/articles/276608) | 2026-06-03 |
| S3 | [Settings](https://help.fathom.video/en/articles/3239617) | 2026-06-04 |
| S4 | [New experience / 3.0+](https://help.fathom.video/en/articles/11577345) | 2026-08-20 |
| S5 | [Recommended Zoom configuration](https://help.fathom.video/en/articles/448704) | 2026-08-28 |
| S6 | [Release notes](https://help.fathom.video/en/articles/6220097) | 2026-08-20 |
| S7 | [Team call library](https://help.fathom.video/en/articles/449856) | 2025-09-08 |
| S8 | [AI Search](https://help.fathom.video/en/articles/7374465) | 2026-08-17 |
| S9 | [Ask Fathom](https://help.fathom.video/en/articles/3239425) | 2026-06-04 |
| S10 | [Customizing summaries](https://help.fathom.video/en/articles/3239809) | 2026-06-04 |
| S11 | [Advanced AI features](https://help.fathom.video/en/articles/640768) | 2026-05-16 |
| S12 | [Post-call highlights](https://help.fathom.video/en/articles/295680) | 2026-06-04 |
| S13 | [In-call highlights](https://help.fathom.video/en/articles/295424) | 2026-06-04 |
| S14 | [Managing highlights](https://help.fathom.video/en/articles/278720) | 2026-06-04 |
| S15 | [Sharing recordings](https://help.fathom.video/en/articles/295616) | 2026-06-04 |
| S16 | [Playlists and folders](https://help.fathom.video/en/articles/449792) | 2026-03-30 |
| S17 | [Trimming calls](https://help.fathom.video/en/articles/295744) | 2026-06-04 |
| S18 | [Copy transcript](https://help.fathom.video/en/articles/296000) | 2026-02-05 |
| S19 | [Recipient account requirements](https://help.fathom.video/en/articles/296128) | 2026-06-04 |
| S20 | [Dark/light mode FAQ](https://help.fathom.video/en/articles/7574145) | 2025-08-22 |
| S21 | [Asana action-item behavior](https://help.fathom.video/en/articles/7639617) | 2025-11-03 |
| S22 | [HubSpot call view/actions](https://help.fathom.video/en/articles/448832) | 2026-08-20 |
| S23 | [Current product overview](https://www.fathom.ai/overview) | Not displayed |
| S24 | [Zoom gallery capture](https://help.fathom.video/en/articles/295552) | 2026-03-18 |
