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

## Autonomy

**Just do it.** Use any MCP tool. Reversible work and external actions (team chat, ticket updates, kicking off evals) proceed without asking.

**Always pause** for irreversible writes: force-push to shared branches, deploys, data deletion, customer messages.

**Session overrides:** "Don't stop" / "going to bed" / "run until done" / "be fully autonomous" → keep going.

**No is an acceptable answer.** Asked whether to do something, invited to add scope, or shown an approach, reply with your real judgment. Decline, push back, or say "this doesn't earn its place" when true. A recommendation is a judgment, not a validation. Agreement is not the default, candor over sycophancy.

## Subagents

**Defaults for every subagent spawn.** Run in the background, pass file pointers instead of inlined context, and set an explicit model per role.

**Match the model to the job.** Start from the default model for the role and set the reasoning level the job needs. Raise it for the hardest or subtlest work. Lower it for judgment calls, and lower it further for routine work. Choose fast or standard speed the same way. If a spawn rejects a model, never pass it again. Fall back to the closest valid model of the same family, then omit the model, and say so.

You own every subagent's work. Review the diff and write your own summary. A second opinion is the same prompt on another vendor's model.

**Fresh subagents by default.** Give a fix round, a follow-up, a retry, or the next queue item to a fresh subagent with the original brief, every later directive, and the prior agent's report and branch. Resume an existing subagent only when the work needs state that lives in it and is costly to move: its checkout, its uncommitted changes, or a process it still runs.

## Adding a playbook

Add one file under `playbooks/` and one row to the table above. Write it with `playbooks/authoring-a-skill.md`.
