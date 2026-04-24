# quality gates

**every commit must pass all of these.** if any gate fails, revert and re-plan. do not commit broken code to main.

## automated gates (blocking)

run `pnpm run check` — it chains these three in order:

1. **typecheck** — `tsc --noEmit` with strict mode, no errors, no warnings
2. **lint** — `biome check .` — zero errors
3. **tests** — `vitest run --coverage` — all pass, coverage thresholds met

any non-zero exit = no commit. fix it in the same session or revert.

## hard rules

- **no `any`.** use `unknown` and narrow with zod or type guards. biome will fail on `any`.
- **no `@ts-ignore` or `@ts-expect-error`.** if you need to bypass, the problem is upstream. fix it properly.
- **no hardcoded secrets.** all env vars go through a zod-validated boot loader. never paste values in code.
- **file length ≤ 200 lines.** exceptions must start with a comment explaining why.
- **function length ≤ 30 lines.** refactor before adding to it.
- **no `console.log`.** use a structured logger.
- **no commented-out code.** git history is the archive.
- **no fallback paths for impossible cases.** trust the type system. validate only at boundaries.

## test requirements

- every new module under `src/` needs a matching `tests/*.test.ts`
- every branch covered (if/else, switch cases, try/catch)
- mock external calls — tests must run offline and deterministic
- one integration test per phase milestone
- coverage floor: 80% lines, 80% branches per file (configured in `vitest.config.ts`)

## dependency rules

- new dependency = new task "audit dep: X" in `TASKS.md` BEFORE install
- the task must justify: why needed, alternatives considered, maintainer health (last release, weekly downloads, open issues)
- refuse: deprecated packages, packages with recent security advisories, single-contributor packages unless widely used

## commit message format

```
[P.N] short imperative description

optional body explaining why, not what.
```

where `P.N` is phase.task from `TASKS.md` (e.g., `[2.3] handle text capture`). commits that don't reference a task number are rejected at review.

## when a gate fails

1. read the error. understand it.
2. fix at the root. do not add `any` or `@ts-ignore` to silence it.
3. if the fix reveals a deeper problem, add a new task to `TASKS.md` describing it, revert the current task, move on.
4. if blocked 3x in a row, write the blocker into `PROGRESS.md` under `### BLOCKED: task N.M` with full context. stop. wait for human pass.

## customize this file

this is a sensible default. adjust:
- lower coverage floor if your project is in very early discovery
- add project-specific rules (accessibility, i18n, specific security rules)
- add custom lint rules via `biome.json`

**but:** looser gates = more drift. think twice before loosening.
