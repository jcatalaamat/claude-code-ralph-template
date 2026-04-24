# {{PROJECT}} — architecture

**immutable.** the autonomous loop does not modify this file. if it needs to, it stops and asks.

> **TEMPLATE NOTE:** delete this quote block and replace every `{{PLACEHOLDER}}` with your real content. this file is the single most important input to the ralph loop. sloppy spec = sloppy output.

## product

{{ONE SENTENCE: what is this thing?}}

## users

{{WHO IS THIS FOR? one real person ideally — not demographics}}

## what it does

{{3-7 bullet points of the core capabilities}}

1.
2.
3.

## what it does NOT do

{{explicit out-of-scope list. helps the loop avoid drift into unrelated features.}}

-
-
-

## tech stack

{{list every dep category. the loop respects this — won't add deps not listed here or in TASKS.md}}

- language:
- framework:
- database:
- auth:
- payments:
- external services:
- host:
- test framework:
- lint/format:

## data model

{{high-level schema. tables, key relationships. the loop references this when writing migrations or queries.}}

## interfaces

{{what's the user-facing surface? web pages? mobile app? telegram bot? cli?}}

## external dependencies

{{apis, services, systems this depends on. include auth/credentials expected}}

## runtime

{{how does it run in prod? dyno? systemd? serverless? cron?}}

## secrets

{{list env vars the app needs. never paste values — just names.}}

- `{{SECRET_NAME_1}}`
- `{{SECRET_NAME_2}}`

## hard rules for the autonomous loop

- never modify this file
- never commit secrets
- never add a dep not listed in TASKS.md (loop must add a dep-audit task first)
- {{ADD ANY OTHER PROJECT-SPECIFIC HARD RULES}}

## success criteria (mvp)

{{what must be true for v1 to be "done"?}}

1.
2.
3.
