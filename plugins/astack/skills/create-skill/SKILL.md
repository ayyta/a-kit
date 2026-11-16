---
name: create-skill
description: Write a new SKILL.md or rewrite an existing one. Use when asked to create or add a skill, or to turn a workflow you keep repeating into a skill.
---

# create-skill

Write one skill that does one job. The skill's voice is yours, so every sentence in it should be one you can defend.

## 1. Check for overlap

Search the installed skills and this repo's `plugins/*/skills/` for one that already does the job. If one does, extend it instead of adding a sibling, and tell the user which one.

## 2. Pin down the job

Ask only what you cannot work out yourself, at most three questions:

- What job does it do, and what does it produce?
- What would the user say that should trigger it?
- Which plugin does it belong to? A skill for one project goes in that project's `.claude/skills/`, not in a general plugin.

## 3. Write it

Create `skills/<name>/SKILL.md`. The folder name and the `name` field are the same kebab-case word or phrase.

1. Frontmatter with `name` and `description`. The description says what the skill does and when to use it, in one or two sentences, and includes the words the user would actually say.
2. `# name` and one sentence of purpose.
3. Numbered steps. Each step says what to do.
4. The output format, if the skill produces a report.

Move long reference material into a separate file next to `SKILL.md` and link it by path.

## 4. Follow these writing rules

- When in doubt, delete. Keep only prose that changes a decision.
- Tell the agent what to do. Explain why only when the rule would be confusing without it.
- Match the tone to the skill's scope. A small skill is short and plain.
- Point to types, READMEs, and config instead of restating them.
- Link to other skills by path. Do not copy their content.

## 5. Validate

- Frontmatter has `name` and `description`.
- Every file the skill refers to exists.
- Links to other skills resolve.
- If the skill is in a plugin, `claude plugin validate .` passes from the marketplace root.

## 6. Test

If the skill produces a fixed shape (a report, a file, a command sequence), run it once on a real task and compare the output to what the skill says it should produce. If it is subjective (tone, style), skip this step and say so.

## 7. Report

Do not commit unless asked. End with:

- What the skill does, in one sentence.
- Key design decisions.
- Validation notes: what you checked, and what you could not check.
