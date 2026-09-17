#!/usr/bin/env python3
"""Automatically export only user prompts and final answers from Codex rollouts."""
import argparse
import datetime as dt
import fcntl
import json
import os
from pathlib import Path
import time

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path.home() / '.codex/sessions'
OUT = ROOT / '.agent-logs'
AUTHOR = 'MuhammadAhmad33'


def export(path):
    rows = []
    for line in path.read_text().splitlines():
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            break  # Writer may still be appending this record.
    if not rows or rows[0].get('type') != 'session_meta':
        return
    meta = rows[0]['payload']
    if Path(meta.get('cwd', '')).resolve() != ROOT:
        return
    sid = meta['id']
    model = None
    entries = []
    number = 0
    prompt_events = iter(r for r in rows if r['type'] == 'event_msg' and r.get('payload', {}).get('type') == 'user_message')
    for row in rows:
        p = row.get('payload', {})
        if row['type'] == 'turn_context':
            model = p.get('model', model)
        elif row['type'] == 'response_item' and p.get('type') == 'message' and p.get('role') == 'user' and model:
            number += 1
            body = ''.join(c['text'] for c in p['content'] if c.get('type') == 'input_text')
            event = next(prompt_events, None)
            if event is not None:
                assert event['payload']['message'] == body, 'Prompt sources disagree'
            entries.append(('PROMPT', number, event['timestamp'] if event else row['timestamp'], model, body))
        elif row['type'] == 'response_item' and p.get('type') == 'message' and p.get('role') == 'assistant' and p.get('phase') in ('final', 'final_answer'):
            if number:
                body = ''.join(c['text'] for c in p['content'] if c.get('type') == 'output_text')
                entries.append(('RESPONSE', number, row['timestamp'], model, body))
    if not entries:
        return
    first = entries[0][2]
    stamp = dt.datetime.fromisoformat(first.replace('Z', '+00:00')).astimezone(dt.timezone.utc)
    dest = OUT / (stamp.strftime('%Y-%m-%d_%H-%M-%S_') + sid + '.md')
    body = ''.join(f'[LOG_ENTRY type={kind} num={n} session={sid[:8]}]\ntimestamp: {ts}\nmodel: {m}\n\n{text}\n\n\n' for kind, n, ts, m, text in entries)
    header = (f'---\nsession_id: {sid}\ndate: {stamp:%Y-%m-%d}\nauthor: {AUTHOR}\n'
              f'model: {entries[0][3]}\ntool: codex-{meta.get("source", "unknown")}\nproject: {ROOT.name}\n'
              f'total_exchanges: {number}\nfirst_prompt_time: {first}\n'
              f'last_prompt_time: {next(e[2] for e in reversed(entries) if e[0] == "PROMPT")}\n---\n\n'
              f'# Session Log - {stamp:%Y-%m-%d}\n\nSession: `{sid[:8]}` | Project: `{ROOT.name}` | Author: `{AUTHOR}`\n\n---\n\n')
    if dest.exists():
        previous = dest.read_text()
        old_body = previous.split('\n\n---\n\n', 1)[1]
        if not body.startswith(old_body):
            raise ValueError(f'Refusing to change existing entries: {dest}')
        if previous == header + body:
            return
    # Only metadata changes; existing entry bytes must remain an exact prefix.
    temp = dest.with_suffix('.tmp')
    temp.write_text(header + body)
    os.replace(temp, dest)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--watch', action='store_true')
    args = parser.parse_args()
    OUT.mkdir(exist_ok=True)
    lock = open('/tmp/fathom-rebuild-capture.lock', 'w')
    fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    seen = {}
    while True:
        for path in SOURCE.rglob('*.jsonl'):
            stat = path.stat()
            signature = (stat.st_mtime_ns, stat.st_size)
            if seen.get(path) != signature:
                export(path)
                seen[path] = signature
        if not args.watch:
            break
        time.sleep(2)


if __name__ == '__main__':
    main()
