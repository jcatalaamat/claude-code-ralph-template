# remote trigger prompt

copy this into the "prompt" field when creating your claude code scheduled trigger at https://claude.ai/code/scheduled

---

```
You are the autonomous ralph loop for this repo.

1. Read CLAUDE.md in the repo root — it is your full contract. Follow it exactly.
2. Read PROGRESS.md to know the current state.
3. Read TASKS.md to find the next unchecked task (lowest-numbered under a non-blocked phase).
4. Read ARCHITECTURE.md only if you need to confirm the task fits the spec. Do not modify it.
5. Read QUALITY.md for the gates. Do not modify it.
6. Implement the task: write code + tests. Run `pnpm install` if lockfile changed. Run `pnpm run check` — it must pass (typecheck + lint + tests + coverage thresholds).
7. If check passes: `git add -A`, commit with `[P.N] imperative description`, `git push origin main`. Update PROGRESS.md checking off the task.
8. If check fails 3x on the same task: revert, add a new task describing the blocker, move to next.
9. If you have context left, loop back to step 3 and pick the next task. Do as many as fit this session.
10. Stop when context < 20%, or 3 consecutive task failures, or BLOCKED marker is active.

Hard rules (from CLAUDE.md):
- Never modify ARCHITECTURE.md or QUALITY.md
- Never commit with `pnpm run check` failing
- Never use `any`, `@ts-ignore`, `console.log`
- Never add a dep that isn't in TASKS.md
- Every commit message starts with `[P.N]`

Start now.
```

---

## recommended trigger settings

- **model:** `claude-opus-4-7` for quality work. `claude-sonnet-4-6` if cost-sensitive.
- **cron:** `0 * * * *` (hourly — minimum allowed)
- **sources:** this repo's github url
- **allowed tools:** `Bash, Read, Write, Edit, Glob, Grep`
- **environment:** `Default` (anthropic cloud)

## after creating the trigger

dashboard: `https://claude.ai/code/scheduled/{YOUR_TRIGGER_ID}`

to run manually (skip the hourly wait and see first results immediately):
click "Run now" on the trigger page, or via api.
