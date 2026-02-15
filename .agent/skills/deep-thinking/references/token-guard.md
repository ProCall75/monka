# Token Guard — Ceiling Management Reference

> **Purpose:** Prevent quality degradation when approaching output token limits.
> The goal is NEVER to compress output quality — always prefer checkpointing.

---

## Decision Tree

```
START → Estimate task weight
  │
  ├─ Weight = S (1-2 steps, < 30% budget) → Execute all at once
  │
  ├─ Weight = M (3-5 steps, 30-60% budget) → Execute in chunks of 2-3 steps
  │     └─ After each chunk: "Am I past 60%?" 
  │         ├─ No → Continue
  │         └─ Yes → Checkpoint + notify
  │
  ├─ Weight = L (6-10 steps, 60-80% budget) → One step per turn
  │     └─ After each step: "Am I past 70%?"
  │         ├─ No → Continue to next step
  │         └─ Yes → Checkpoint + notify
  │
  └─ Weight = XL (10+ steps, > 80% budget) → Mandatory phased execution
        └─ Plan first (separate turn) → Execute phase by phase
```

---

## Task Weight Estimation Guide

Estimate based on what you're about to DO (not input length):

| Weight | Criteria | Example |
|--------|----------|---------|
| **S** | 1-2 file edits, < 50 lines changed | Fix a typo, add a prop |
| **M** | 3-5 file edits, or 1 file rewrite (< 200 lines) | Add a component, wire up handlers |
| **L** | 6-10 file edits, or 1-2 file rewrites (200-500 lines) | Refactor a feature, add a screen |
| **XL** | 10+ file edits, or full-system changes | New feature across many files, V2 rewrite |

### Weight Inflation Signals
Add +1 weight level if:
- Files are long (> 300 lines each)
- Changes require reading + understanding existing code first
- Multiple interdependent types/interfaces need updating
- Mock data generation needed (large inline content)
- Web research needed before implementation

---

## Checkpoint Protocol

> **⚠️ REAL STOP — NOT A MENTAL CHECK.**
> Checkpointing means calling `notify_user` which STOPS execution and returns control to the user.
> This is the intended behavior. The user says "continue" to resume.

When you detect you're approaching the ceiling, do this **immediately**:

### 1. Stop the current sub-task at a clean boundary
Don't finish mid-file-edit. Complete the current atomic operation.

### 2. Update task.md
Mark completed items as `[x]`, current item as `[/]`, remaining as `[ ]`.

### 3. **Call `notify_user`** with this format:

```
⚡ **Token ceiling approché** — Je m'arrête proprement pour ne pas perdre en qualité.

**Fait :**
- [x] Item 1
- [x] Item 2

**En cours :**
- [/] Item 3 (état: [description précise de où j'en suis])

**Reste :**
- [ ] Item 4
- [ ] Item 5

→ Dis "continue" pour reprendre exactement là où je me suis arrêté.
```

> This message is sent via `notify_user` → execution STOPS here.
> The user must reply "continue" to resume. This is NOT optional.

### 4. Include resumption context
In the checkpoint message, describe:
- What file was being edited
- What line/section was being worked on
- Any decisions already made that the next turn needs to know

---

## Anti-Patterns (Things to NEVER Do)

| ❌ Anti-Pattern | ✅ Correct Behavior |
|----------------|---------------------|
| Silently compressing the last items | Checkpoint + notify + resume next turn |
| Skipping details to fit in budget | Stop at a clean boundary instead |
| Generating shorter code comments | Same quality, just fewer items per turn |
| Rushing the validation/verification step | Verification gets full attention or deferred |
| Writing "// TODO" to save tokens | Either implement fully or defer explicitly |
| Summarizing where you'd normally explain | Maintain the same level of detail or stop |

---

## Quality Invariant Rule

> **The last item in a turn MUST have the same quality as the first item.**
>
> If it doesn't, you went too far. You should have checkpointed one item earlier.

This is the fundamental principle. Every other rule in this document serves this invariant.

---

## Integration with Deep-Thinking Pipeline

Token Guard runs as **Step 0.5** — after bypass check, before classify:

```
Message → BYPASS? → TOKEN GUARD → CLASSIFY → DECOMPOSE → STRUCTURE → REWRITE → VALIDATE → Execute
```

Token Guard adds to the rewritten prompt:
- Task weight (S/M/L/XL)
- Budget allocation per phase
- Priority tags (P0 = must, P1 = nice to have)
- Explicit checkpoint plan if weight ≥ L
