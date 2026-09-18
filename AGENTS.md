# Assignment capture

Capture is automatic through the macOS LaunchAgent documented in CAPTURE-TEST.md.
Before assignment work, confirm that service is running and the current prompt
has appeared in .agent-logs/. Do not fabricate or manually tidy log entries.
Keep .agent-logs/ tracked and include accumulated logs in each implementation
commit. The final answer to a turn lands after the turn ends and is included in
the next commit. Do not start implementation if capture stops working.

The installed LaunchAgent is specific to this machine and repository path.
On another machine, update the committed plist paths for that installation,
install it in the user's LaunchAgents directory, and repeat the two-session
canary verification before building. Native ephemeral sessions have no
transcript and must not be used for assignment work.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
