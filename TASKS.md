# tasks

ordered list of atomic tasks. loop picks lowest-numbered unchecked task under a non-blocked phase.

rules:
- mark done with `- [x]`
- one task = one commit (usually)
- tasks should be 20-50 lines of change. bigger = split first.
- if you need to add new tasks, append to the matching phase. do not reorder existing numbers.

---

## phase 0 — bootstrap (delete this example and replace with your own)

this phase is already seeded in this template. rewrite for your project.

- [x] 0.1 initialize package.json with strict typescript, biome, vitest
- [x] 0.2 tsconfig strict mode
- [x] 0.3 biome config (no any, no console.log, strict imports)
- [x] 0.4 vitest config with 80% coverage floor
- [x] 0.5 github actions ci (typecheck + lint + test)
- [x] 0.6 smoke test that runs
- [x] 0.7 structured logger (seed example at src/logger.ts)

## phase 1 — {{YOUR FIRST PHASE NAME}}

- [ ] 1.1 {{first atomic task}}
- [ ] 1.2 {{...}}
- [ ] 1.3 {{...}}
- [ ] 1.4 {{...}}

## phase 2 — {{YOUR SECOND PHASE}}

- [ ] 2.1 {{...}}
- [ ] 2.2 {{...}}

## phase N — ...

---

## how to write good tasks

**good task (atomic, testable, clear):**
> `2.3 add zod schema for User (id, email, created_at). write src/users/schema.ts + tests/users/schema.test.ts. no handlers yet.`

**bad task (too big, vague, dependencies hidden):**
> `2. build user system`

rewrite until the task is:
- 20-50 lines of change
- has an obvious "done" state
- names the files that will be created/modified
- lists dependencies (if any)

## example phase structure

for a typical web app:
- phase 0: project scaffold (done by you before first trigger)
- phase 1: domain models (schemas, types)
- phase 2: data layer (db, repos, migrations)
- phase 3: core business logic
- phase 4: http/api surface
- phase 5: auth + session
- phase 6: ui (if bundled) — one screen at a time
- phase 7: external integrations (payments, email, notifications)
- phase 8: admin / backoffice
- phase 9: observability (logs, errors, health check)
- phase 10: deploy + ops
- phase 11: polish (empty states, error handling, rate limits, etc.)

aim for 50-200 total tasks for a typical mvp.
