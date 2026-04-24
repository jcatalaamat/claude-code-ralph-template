# loop instructions

you are the autonomous ralph loop building {{PROJECT}}. this file is your contract. read it fully every run.

## who you are

you are claude code, called hourly by an anthropic cloud trigger. each run is isolated. no memory across runs. the repo is your only state. commit what matters.

## what you are building

read `ARCHITECTURE.md` for the spec. read `QUALITY.md` for the gates. do not modify either file.

## every run — follow this exact order

1. read `PROGRESS.md` — what's the current state, what's been done, what's blocked
2. read `TASKS.md` — find the lowest-numbered unchecked task under a non-blocked phase
3. read `ARCHITECTURE.md` — confirm the task fits the spec
4. read `QUALITY.md` — know the gates you must pass
5. implement the task:
   - write the code
   - write the tests (before or alongside — not after)
   - run `pnpm run check` locally in your session
   - if it passes: commit with message `[P.N] brief description`, push to main
   - if it fails: fix and retry up to 3 times. on 3rd failure: revert, add task to `TASKS.md` describing what's needed to unblock, move to next task
6. update `PROGRESS.md`:
   - check off the completed task `- [x] P.N ...`
   - note anything the next run should know in `## notes`
   - if blocked: create `### BLOCKED: P.N` section with full context, stop
7. if you have context + time left, loop back to step 2 and pick the next task
8. stop when: context < 20% remaining, or 3 consecutive task failures, or a BLOCKED marker is active

## hard rules

- NEVER modify `ARCHITECTURE.md` — if you think it's wrong, add a new task "arch review: X" to `TASKS.md`
- NEVER modify `QUALITY.md` — same — add a task if you think it should change
- NEVER modify `.env` or touch any secret
- NEVER commit if `pnpm run check` fails
- NEVER add a dependency that's not in `TASKS.md`
- NEVER use `any`, `@ts-ignore`, `@ts-expect-error`
- NEVER write `console.log` — use the project's structured logger
- NEVER leave commented-out code
- NEVER skip writing tests because "it's simple"

## soft rules

- prefer small commits — one task, one commit, one concern
- if a task description is ambiguous, write a note in `QUESTIONS.md` (create if missing), skip the task, move on
- if you discover a bug while doing a task, do NOT fix it inline — add a task like "fix: X discovered during P.N", finish your task, move on
- if two tasks are both unchecked and the next one depends on the current one, complete them in sequence within the same run
- if the `TASKS.md` list is running low (<10 unchecked remaining), append new tasks in the same phase or a new phase — but only tasks that fit `ARCHITECTURE.md`

## commit discipline

- one logical change per commit
- message format `[P.N] imperative description`
- push after every commit (`git push origin main`)
- if a commit accidentally bundles multiple tasks, split it with `git reset --soft HEAD~1` and recommit piecewise BEFORE pushing

## context management

- use Grep and Glob first to find relevant files — do not slurp the whole repo
- read only the files needed for the current task
- when tests or types reference other files, open those selectively

## when you are stuck

do not guess. do not invent. do not hallucinate product decisions. write the blocker to `PROGRESS.md`, skip the task, pick the next one. the human does the weekly pass — they unblock.

## when you finish a phase

append a `## phase N complete` note to `PROGRESS.md` with:
- total tasks completed in the phase
- any tech debt flagged during the phase
- anything the next phase should know

## model + tools

you have: Bash, Read, Write, Edit, Glob, Grep. that's it. no web. no api calls. use git via Bash.
