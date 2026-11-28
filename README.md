# a-kit

A personal Claude Code plugin marketplace of general-purpose coding skills. Nothing here is tied to one project.

## Plugins

| Plugin | Skills | Purpose |
|---|---|---|
| `dev-loop` | `verify-this` | Run the project's own checks on a change and report what ran and what could not be checked |
| `astack` | `ayyta-mode`, `blast-radius`, `principle-*` | Match a task to a playbook and follow it. Playbooks: `authoring-a-skill`, `bug-fix`. Bug-fix principles: `fix-root-causes`, `laziness-protocol`, `subtract-before-you-add`, `prove-it-works`, `explain-the-number` |

## Install

```
/plugin marketplace add ayyta/a-kit
/plugin install dev-loop@a-kit
/plugin install astack@a-kit
```

## Update

```
/plugin marketplace update a-kit
/plugin update astack@a-kit
```

Then restart Claude Code or run `/reload-plugins`. You can also turn on auto-update for `a-kit` under `/plugin` → Marketplaces so new versions are pulled at startup.

Claude Code only updates a plugin whose `version` went up. If a release reports "already at the latest version" while skills are missing, run `/plugin uninstall astack@a-kit` and install it again.

## Develop locally

```
claude plugin validate .
claude --plugin-dir ./plugins/dev-loop
```

Inside a session, `/reload-plugins` picks up edits. Skills run as `/dev-loop:verify-this`.

## Rules for this repo

- Bump `version` in a plugin's `.claude-plugin/plugin.json` in every PR that changes that plugin: patch for fixes and wording, minor for new skills or agents, major for removals or renames. Without a bump, people who already installed the plugin never get the change. CI enforces this; run `node scripts/check-plugin-versions.mjs` to check locally.
- Plugin names are kebab-case and must not start with `claude-` or `anthropic-`.
- Keep every plugin general. Project-specific plugins belong in that project's own repo or in a separate private marketplace.
- Add a layer only after the previous one has caught a real mistake.
- Review any third-party plugin before installing it: hooks, MCP servers, and `bin/` run with your user privileges.
