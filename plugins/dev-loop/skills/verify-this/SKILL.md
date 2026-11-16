---
name: verify-this
description: Verify a code change before calling it done. Finds and runs the project's own typecheck, lint, and relevant tests, starts the dev server for UI changes, and reports what ran, what passed, and what could not be checked. Use after finishing any code change, or when asked to verify, check, or confirm that something works.
---

# verify-this

Check the current change against the project's own tooling, then report honestly. Never say "looks good" for something you did not run.

## 1. Scope the change

Run `git status --short` and `git diff --stat` (include staged changes and the diff against the base branch if the work is already committed). List which areas changed: source, tests, config, UI, docs. Verify only what the change can affect, plus anything that depends on it.

## 2. Find the project's commands

Use the project's own commands, in this order of trust:

1. Instructions in `CLAUDE.md`, `AGENTS.md`, or `README` that name verify commands.
2. Scripts in `package.json`, `Makefile`, `justfile`, `pyproject.toml`, `Cargo.toml`, `go.mod`, or similar.
3. Config files that imply a tool (`tsconfig.json`, `eslint.config.*`, `ruff.toml`, `pytest.ini`).

Match the package manager to the lockfile (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `bun.lock`). In a monorepo, run from the root unless the docs say otherwise, and prefer the workspace-scoped command for the packages that changed.

Do not invent commands. If you cannot find one for a check, record it as "not found" in the report.

## 3. Run the checks

Run in this order, fastest first, and keep going after a failure so the report is complete:

1. **Typecheck** if the project has one.
2. **Lint** if the project has one.
3. **Tests**, only the ones relevant to the change when the runner supports filtering; the full suite when the change touches shared or core logic. If an area has no tests, say so instead of skipping silently.
4. **Build**, only when the change touches build config, dependencies, or entry points.
5. **UI changes**: start the dev server, open the affected page or screen, and check it renders without console or server errors. If you cannot drive a browser or device, say that.

A failure may come from stale generated files (build caches, generated types) rather than your change. Confirm by checking whether the failing file is in your diff or by clearing the cache and re-running once, before treating it as a real failure or dismissing it.

Do not edit code to make a check pass unless the user asked you to fix it. Report failures first; fix on request or when the failure is clearly caused by your own change.

## 4. Report

End with a table or list in this shape:

| Check | Command | Result |
|---|---|---|
| Typecheck | `...` | passed / failed (n errors) / not found / not run (reason) |

Then add:

- **Failures**: the first relevant error for each, with file and line.
- **Could not verify**: every check that was not found, not run, or not possible, and why (no tests for this area, no browser available, needs credentials, needs a device).
- **Verdict**: one line. Use "verified" only if every relevant check ran and passed. Otherwise say "partially verified" or "not verified" and name the gap.

Write "couldn't verify" plainly when it is true. A short honest report is better than a confident one.
