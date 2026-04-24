# claude-code-ralph-template

a template for running an autonomous claude code agent that builds your project, hour by hour, commit by commit, while you sleep.

fork this. fill in the 5 markdown files. point an hourly claude code trigger at the repo. walk away.

## what is this

this is a "ralph wiggum" loop (named after [geoffrey huntley's pattern](https://ghuntley.com/ralph)) wired to [claude code's managed remote triggers](https://claude.ai/code/scheduled).

every hour:
1. a fresh claude session is spawned in anthropic's cloud
2. it clones this repo
3. reads `CLAUDE.md` (its contract)
4. reads `PROGRESS.md` (state)
5. picks the next unchecked task from `TASKS.md`
6. implements it — writes code AND tests
7. runs the quality gates (`pnpm run check`)
8. commits + pushes
9. updates `PROGRESS.md`
10. loops to the next task until context runs out

you wake up to 5-20 new commits. each one passing tests, types, and lint. quality holds because the gates block anything that doesn't pass.

## what it is NOT

this is not "AI writes your code while you sleep and it's garbage." the output quality depends entirely on:

1. how sharp your `ARCHITECTURE.md` is
2. how atomic your `TASKS.md` tasks are (20-50 lines each, not "build auth")
3. how strict your `QUALITY.md` gates are (tests, types, lint, coverage — all blocking)
4. whether you seeded the first 5-10 commits at your real quality bar (claude mimics what it sees)
5. whether you do the weekly 30-60min human pass (product judgment is yours)

garbage in, garbage out. structured input, structured output.

## the 5 files that matter

- `ARCHITECTURE.md` — immutable spec. what you're building. claude cannot modify this.
- `QUALITY.md` — the gates. lint, types, tests, coverage thresholds. claude cannot modify this.
- `CLAUDE.md` — the loop's contract. how to work. when to commit. when to stop.
- `TASKS.md` — ordered atomic checklist. claude picks the next unchecked task.
- `PROGRESS.md` — state. claude updates this after each task.

read each one. fill it in. the rest of this repo is just a working node+typescript scaffold to get you started.

## stack in the starter scaffold

you can swap any of this out. it's just a working starting point.

- node 24 · typescript strict · pnpm
- vitest (tests + coverage)
- biome (lint + format)
- github actions ci (typecheck + lint + test on every push)

## step-by-step setup

### 1. fork this repo

click the fork button. or:
```bash
gh repo create MY-PROJECT --template jcatalaamat/claude-code-ralph-template --private
```

### 2. fill in the spec

open these in order:
- `ARCHITECTURE.md` — write your product spec. delete the placeholder, write yours.
- `QUALITY.md` — sensible defaults included. adjust coverage thresholds or add rules.
- `CLAUDE.md` — rename project name. usually no other edits needed.
- `TASKS.md` — delete the example phases. write yours. 50-200+ atomic tasks.
- `PROGRESS.md` — reset the state to match your seed.

### 3. seed quality

write the first 5-10 commits BY HAND at your quality bar. claude mimics what it sees. garbage seed = garbage output.

```bash
pnpm install
pnpm run dev     # or whatever your first running thing is
pnpm run check   # typecheck + lint + test
```

### 4. push

```bash
git push origin main
```

### 5. create the remote trigger

go to https://claude.ai/code/scheduled → create trigger:
- model: `claude-opus-4-7` (recommended for quality work)
- cron: `0 * * * *` (hourly — minimum supported)
- sources: this repo
- allowed tools: Bash, Read, Write, Edit, Glob, Grep
- prompt: (copy from `TRIGGER-PROMPT.md` in this repo)

### 6. watch it run

- check commits on github
- look at the diff. the first run tells you if your spec is sharp enough.
- if the loop drifts, tighten `CLAUDE.md` or add gates to `QUALITY.md`

### 7. weekly human pass (non-negotiable)

30-60 min every week, per repo:
- read the week's diff
- audit taste (does it look like your code?)
- adjust `TASKS.md` if the spec is off
- kill drift before it compounds

## faq

**q: what's the minimum task size?**
a: 20-50 lines of code per task. "add email column + migration + test" not "build auth system". small gates compound.

**q: does it work without the weekly human pass?**
a: no. claude audits code. you audit product. skip the human pass and quality decays in 2-3 weeks.

**q: why hourly and not continuous?**
a: claude code's managed triggers have a 1-hour minimum. for faster loops, run on your own server with a while-loop (you pay api costs directly).

**q: how many projects in parallel?**
a: each one needs 30-60min of your time per week. 15 repos = 8-15 hours/week of your time, minimum. plan accordingly.

**q: what about pull requests instead of direct commits?**
a: change the `CLAUDE.md` to `git checkout -b task-P.N && git push origin task-P.N && gh pr create`. but you'll need to merge PRs yourself or set up auto-merge.

**q: my loop is producing nonsense. what's wrong?**
a: probably one of: (1) `TASKS.md` tasks are too big, (2) seed commits are low quality, (3) `QUALITY.md` gates aren't blocking (no test coverage threshold), (4) `ARCHITECTURE.md` is vague.

## credit

pattern: [geoffrey huntley — ralph wiggum as a software engineer](https://ghuntley.com/ralph)

wrapper + template: [jordi amat / astral studio](https://astralintegration.studio)

## license

mit.
