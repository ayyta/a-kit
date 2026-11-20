### Bug fix

**You own this task. Plan, review, verify.** Delegate investigation and the fix to `ayyta-agent` subagents, stay in the lead. Pick each subagent's reasoning level for the job, per the Subagents section of the **ayyta-mode** skill.

Be scientific. Every shipped line traces to runtime evidence. Belt-and-suspenders that "might help" is a hypothesis, not a fix. It does not ship. When evidence refutes a hypothesis, revert what it motivated. The smallest change the evidence justifies ships, nothing more. See **principle-laziness-protocol**.

1. Reproduce it yourself, on the surface where the bug was reported: run the app, the command, or the test. Ask the user to reproduce only with a stated, specific reason you cannot reach the target, and only after driving it as far as it goes. If it won't reproduce directly, synthesize the trigger, tighten conditions, or instrument until it fires.
2. Binary-search the cause. Form the candidate hypotheses, then rule them out until one survives. Seed them with a trace of the affected subsystem and the **why** skill for regression history. Each pass, take the split that cuts the most remaining problem space, get runtime evidence, eliminate. When program state is unclear, add instrumentation or logging and read it as the code runs. Don't guess. Drive a long or stubborn hunt with `/loop`. Confirm the surviving *mechanism* with runtime evidence before you plan the fix. Follow **principle-fix-root-causes**: stop at the first place the system went wrong, not where it surfaced. If the bug is a bad number (a slowdown, a wrong metric, a flaky eval), follow **principle-explain-the-number** before you trust it.
3. Plan the fix. Apply **principle-subtract-before-you-add**: delete the dead code, redundant guard, or wrong assumption that caused the bug before you write anything new. If the fix crosses a function boundary, sketch the shape first and check it against the evidence from step 2. Delegate implementation to an `ayyta-agent` with a specific scope.
4. Run **blast-radius** on the fix. Find what it could break somewhere else, and prove the one fact it is safe because of by running real code. Skip it only for a one-line change whose callers you have already read.
5. Verify on the same surface, per **principle-prove-it-works**. The original repro now passes. "Inconclusive" or wrong-surface is not a pass. Flag it. Unit tests show branch behavior, not bug absence. Suspect your observation method before you suspect the system.
6. Stage the commits so the failing repro lands before the fix in git history. Write the failing test first when the bug has a cheap local test path. Skip it when the test would be expensive, integration-heavy, or unclear.
7. Run **Opening a PR**.

**Reply:** what was broken, root cause, fix, blast radius, how you verified. Paste failing-then-passing repro output verbatim.
