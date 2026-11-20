# a-kit

A personal Claude Code plugin marketplace of general-purpose coding skills. Nothing here is tied to one project.

## Plugins

| Plugin | Skills | Purpose |
|---|---|---|
| `dev-loop` | `verify-this` | Run the project's own checks on a change and report what ran and what could not be checked |
| `astack` | `astack-mode`, `blast-radius`, `principle-*` | Match a task to a playbook and follow it. Playbooks: `authoring-a-skill`, `bug-fix`. Bug-fix principles: `fix-root-causes`, `laziness-protocol`, `subtract-before-you-add`, `prove-it-works`, `explain-the-number` |

## Install

```
/plugin marketplace add ayyta/a-kit
/plugin install dev-loop@a-kit
/plugin install astack@a-kit
```

## Develop locally

```
claude plugin validate .
claude --plugin-dir ./plugins/dev-loop
```

Inside a session, `/reload-plugins` picks up edits. Skills run as `/dev-loop:verify-this`.

## Rules for this repo

- Plugin names are kebab-case and must not start with `claude-` or `anthropic-`.
- Keep every plugin general. Project-specific plugins belong in that project's own repo or in a separate private marketplace.
- Add a layer only after the previous one has caught a real mistake.
- Review any third-party plugin before installing it: hooks, MCP servers, and `bin/` run with your user privileges.
