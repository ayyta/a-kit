---
name: astack-mode
description: Match a task to a playbook and follow it step by step. Use when starting any task that needs rigor, or when asked to write or change a skill.
---

# astack-mode

Pick the playbook that fits the task, then follow its steps in order. Do not skip steps, and do not invent steps the playbook does not have.

## 1. Match the task

Read the task, then pick one playbook from the table. If two fit, pick the one for the main goal and mention the other.

| Task | Playbook |
|---|---|
| Write or change a skill | `playbooks/authoring-a-skill.md` |
| Read-only question: how does X work, why was Y built this way, should we do X or Y | `playbooks/investigation.md` |
| A reported defect to reproduce, root-cause and fix | `playbooks/bug-fix.md` |
| A symptom in a live process (leak, idle-CPU spin, glitch) to diagnose, not fix | `playbooks/runtime-forensics.md` |
| A saved profile, trace, spindump or heap snapshot to diagnose, not fix | `playbooks/trace-forensics.md` |

If nothing fits, say so in one line and work normally. Do not force a playbook onto a task it was not written for.

## 2. Follow it

1. Read the whole playbook file before acting.
2. Turn its steps into a todo list.
3. Work through the list. Mark a step done only when it is done.
4. End with the reply format the playbook names.

## Adding a playbook

Add one file under `playbooks/` and one row to the table above. Write it with `playbooks/authoring-a-skill.md`.
