---
name: deep-thinking
version: 3.2.0
description: "HARD AUTO-APPLY on EVERY user message — NO EXCEPTIONS. Structured thinking layer with Token Guard. Decomposes, structures, and rewrites raw user messages into optimized prompts. Includes ceiling-aware execution that prevents quality degradation on long tasks. V3.1: UNCONDITIONAL enforcement + cost-optimized bypass for trivials. V3.2: TOOLING SCOUT — mandatory web research for best-in-class packages/tools on technical tasks."
---

# Deep-Thinking — Structured Reasoning Pipeline v3.2

> ## 🔴 ABSOLUTE ENFORCEMENT RULE
>
> **Before writing ANY text, calling ANY tool, or generating ANY output for the user:**
> 1. Run the bypass check (Step 0)
> 2. If not bypassed → produce the `🧠` DISPLAY block FIRST
> 3. If bypassed → produce `🧠 Bypass: [reason]` (one line, inline)
>
> **If you have already started writing output and realize you forgot the 🧠 block → STOP.**
> **Prepend the block before continuing. No exceptions.**
>
> **COMPLIANCE TEST:** Can the user see a 🧠 emoji at the start of your response? If no → FAIL.

> **AUTO-APPLY:** This skill runs on EVERY user message before execution.
> No raw message is sent directly to Antigravity — it passes through this pipeline first.

> **VISIBLE OUTPUT REQUIRED:** The pipeline MUST produce VISIBLE output in the chat.
> The user MUST see proof that the pipeline ran. No more silent execution.

---

## Pipeline Overview

```
Message brut → BYPASS? → TOKEN GUARD → CLASSIFY → DECOMPOSE → STRUCTURE → REWRITE → VALIDATE → TOOLING SCOUT → DISPLAY → Exécution
                                ↑                                                        ↑               ↑
                          Visible output                                           Visible output   Web research
```

---

## Step 0: BYPASS Check

**Skip the FULL pipeline ONLY if the message is ONE of these:**
- A single-word confirmation: "oui", "ok", "non", "yes", "no", "go", "parfait", "continue"
- An emoji-only message
- A direct selection: "option 2", "le premier", "celui-là"
- Literal "fais-le" / "lance" / "execute" after a plan was already shown

**Even when bypassed, you MUST output:**
```
🧠 Bypass: [reason — e.g. "confirmation simple"]
```

**NEVER bypass if:**
- The message contains a question (even short)
- The message asks for a change or modification (even small)
- The message is more than ~10 words
- The message references a file, technology, or concept
- You are unsure whether to bypass → **DON'T bypass**

**If bypassed → execute the message directly after the bypass line. No further pipeline steps.**

---

## Step 0.5: TOKEN GUARD — Ceiling-Aware Budget Estimation

> **See:** [references/token-guard.md](references/token-guard.md) for full decision tree and examples.

### Purpose
Prevent the silent quality degradation that happens when approaching output token limits during long executions. The AI starts compressing, skipping details, and rushing — the last phases of a plan ALWAYS suffer without this guard.

### How It Works

**1. Estimate task weight:**

| Weight | Steps | Budget Usage | Example |
|--------|-------|-------------|---------|
| **S** | 1-2 | < 30% | Fix a typo, answer a question |
| **M** | 3-5 | 30-60% | Add a feature, wire up handlers |
| **L** | 6-10 | 60-80% | Multi-file refactor, new screen |
| **XL** | 10+ | > 80% | System-wide changes, V2 rewrite |

**Weight inflation:** Add +1 level if files are long (300+ lines), require reading first, need mock data generation, or require web research.

**2. Apply budget strategy:**

| Weight | Strategy |
|--------|----------|
| S | Execute all at once — no guard needed |
| M | Execute in chunks of 2-3 steps. After each chunk, self-check budget. |
| L | One step per chunk. Checkpoint plan to task.md. After each step, self-check. |
| XL | **Mandatory phased execution.** Plan first (separate turn). Execute phase by phase. NEVER attempt XL in a single turn. |

**3. Self-check rule (REAL, NOT MENTAL):**
After executing each chunk, ask yourself:
> "If I continue, will the NEXT item get the same quality as the FIRST item?"
> - **Yes** → Continue
> - **No / Unsure** → **STOP IMMEDIATELY.** Use `notify_user` with the checkpoint format. Do NOT silently continue.

### The Quality Invariant (ABSOLUTE RULE)

> **The last item in a turn MUST have the same quality as the first item.**
>
> If you feel yourself starting to rush, compress, skip details, or write shorter comments — STOP.
> You MUST use `notify_user` to checkpoint and ask the user to continue. Never sacrifice quality to fit in budget.

### Checkpoint Protocol (When Ceiling Is Near)

1. **Stop at a clean boundary** — Complete the current atomic operation
2. **Update task.md** — Mark `[x]` completed, `[/]` current, `[ ]` remaining
3. **USE `notify_user`** with this exact format:

```
⚡ **Token ceiling approché** — Je m'arrête proprement pour ne pas perdre en qualité.

**Fait :** [completed items]
**En cours :** [current item + exact state]  
**Reste :** [remaining items]

→ Dis "continue" pour reprendre exactement là où je me suis arrêté.
```

4. **Include resumption context** — What file, what line, what decisions were made

> **⚠️ THIS IS NOT OPTIONAL.** If weight ≥ L, you MUST be ready to checkpoint.
> The checkpoint uses `notify_user` which STOPS execution. This is the intended behavior.

### Anti-Patterns (NEVER DO)

- ❌ Silently compressing the last items
- ❌ Writing `// TODO` to save tokens
- ❌ Shorter code comments at end vs beginning
- ❌ Skipping verification because "budget is tight"
- ❌ Summarizing where you'd normally explain
- ❌ **Claiming to run Token Guard without producing visible output**

---

## Step 1: CLASSIFY — Identify Type & Complexity

Analyze the raw message and classify it:

### Message Types

| Type | Signal Keywords | Complexity |
|------|----------------|------------|
| **QUESTION** | "?", "comment", "pourquoi", "c'est quoi" | Low-Medium |
| **TASK_SIMPLE** | Single clear action, < 3 steps | Low |
| **TASK_TECHNICAL** | Code, debug, build, deploy, refactor | Medium-High |
| **TASK_CREATIVE** | Design, content, write, create (non-code) | Medium |
| **TASK_STRATEGIC** | Decision, pricing, plan, architecture | High |
| **TASK_MULTI** | Multiple distinct requests in one message | High |
| **DEBUG** | "ça marche pas", error, bug, fix, broken | Medium-High |
| **RESEARCH** | "cherche", "trouve", "compare", analyze | Medium |

### Complexity Score (1-5)

```
1 = Trivial (almost bypass)
2 = Simple (1-2 steps, clear intent)
3 = Moderate (3-5 steps, some ambiguity)
4 = Complex (multi-step, requires decomposition)
5 = Very complex (multi-domain, requires tree-of-thought)
```

**Output of this step:** `Type: TASK_TECHNICAL | Complexity: 4 | Token Weight: L`

---

## Step 2: DECOMPOSE — Break Into Atomic Sub-Problems

Use **Prompt Decomposition (DecomP)** to split the message into atomic, independent sub-tasks.

### Decomposition Rules

1. **One concern per sub-task** — Each sub-task addresses exactly one thing
2. **Identify dependencies** — Which sub-tasks must happen before others?
3. **Identify unknowns** — What information is missing? What assumptions are being made?
4. **Extract implicit requirements** — What did the user NOT say but clearly expects?
5. **Ceiling-aware chunking** — Each sub-task MUST be independently executable in one turn. If a sub-task looks like it would consume > 70% of available budget → split it further.

### Decomposition Template

```markdown
## Decomposition

**Raw message:** [original user message]

**Intent:** [What the user actually wants to achieve]

**Token weight:** [S/M/L/XL]

**Sub-tasks:**
1. [Sub-task 1] — [dependency: none] — [budget: ~20%]
2. [Sub-task 2] — [dependency: sub-task 1] — [budget: ~30%]
3. [Sub-task 3] — [dependency: none] — [budget: ~15%]

**Unknowns:**
- [What's ambiguous or missing?]

**Implicit requirements:**
- [What user expects but didn't say]

**Checkpoint plan:** (if weight ≥ L)
- After sub-task 2: self-check budget
- After sub-task 3: checkpoint if needed
```

---

## Step 3: STRUCTURE — Apply the Right Thinking Framework

Based on the classification, select the appropriate framework.
**See:** [references/thinking-frameworks.md](references/thinking-frameworks.md) for full documentation.

### Framework Selection Matrix

| Complexity | Type | Framework |
|-----------|------|-----------|
| 1-2 | Any | **Direct** — No framework needed, just clarify intent |
| 3 | QUESTION | **Chain-of-Thought (CoT)** — Sequential logical steps |
| 3 | TASK_TECHNICAL | **Plan-and-Solve (PS)** — Plan first, then execute |
| 3 | TASK_CREATIVE | **CoT** — Step-by-step creative process |
| 4 | TASK_TECHNICAL | **CoT + DecomP** — Decompose then chain |
| 4 | TASK_STRATEGIC | **MECE + First Principles** — Exhaustive analysis |
| 4 | DEBUG | **Chain-of-Logic (CoL)** — Backward reasoning from error |
| 5 | Any | **Tree-of-Thought (ToT)** — Multi-branch exploration |
| 3+ | TASK_MULTI | **DecomP → Individual frameworks per sub-task** |

---

## Step 4: REWRITE — Transform Into Optimized Prompt

Take the decomposed, structured analysis and produce a clear, actionable prompt.
**See:** [references/prompt-templates.md](references/prompt-templates.md) for templates by type.

### Universal Rewrite Structure

```markdown
## Contexte
[Enriched context: project, files, tech stack, business needs]

## Objectif
[Crystal-clear goal statement — what success looks like]

## Étapes
1. [Step 1 — specific, actionable] — P0 — [~budget%]
2. [Step 2 — specific, actionable] — P0 — [~budget%]
3. [Step 3 — nice to have] — P1 — [~budget%]

## Contraintes
- [Constraint 1]
- [Constraint 2]
- Token weight: [S/M/L/XL] — checkpoint after step [N] if needed

## Format de sortie attendu
[What the output should look like]

## Critères de succès
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] Quality invariant: last item = same quality as first item
```

### Enrichment Rules

1. **Context injection** — Pull relevant info from `INDEX.md`, client folders, tech stack
2. **Disambiguation** — Replace vague terms with specific ones
3. **Explicit format** — Always specify expected output format
4. **Success criteria** — Always define what "done" looks like
5. **Constraint surfacing** — Make implicit constraints explicit (time, tech, scope)
6. **Budget annotation** — Tag steps with priority (P0/P1) and estimated budget %

---

## Step 5: VALIDATE — Quality Check

Before executing, validate the rewritten prompt against the quality checklist.
**See:** [references/quality-checklist.md](references/quality-checklist.md)

### Quick Validation (Mental — Don't Output)

- ✅ Is the intent preserved from the original message?
- ✅ Is the prompt unambiguous?
- ✅ Is necessary context included?
- ✅ Are constraints explicit?
- ✅ Is the output format specified?
- ✅ Are success criteria defined?
- ✅ No implicit assumptions?
- ✅ Is the token weight realistic?
- ✅ Is there a checkpoint plan for weight ≥ L?

**If any check fails → go back to REWRITE and fix.**

---

## Step 5.5: 🔍 TOOLING SCOUT — Best-in-Class Tool Discovery (NEW in v3.2)

> **MANDATORY for:** Any task classified as `TASK_TECHNICAL`, `DEBUG`, or `TASK_MULTI` with technical sub-tasks.
> **SKIP for:** `QUESTION`, `TASK_CREATIVE`, `TASK_STRATEGIC`, `RESEARCH` (unless explicitly about tooling).

### Purpose

Before executing any technical task, proactively search the web for **specialist-vetted** tools that could dramatically improve execution quality. The goal is NOT to find the most popular tool — it's to find the one that **actual experts use and recommend**.

### How It Works

**1. Identify what kind of tooling could help:**

For the current task, ask:
- Is there a **package/library** that solves this better than hand-coding?
- Is there an **MCP server** that gives me capabilities I don't have?
- Is there a **CLI tool** that automates part of this?
- Is there a **framework feature** I'm not using?

**2. Search with `search_web` — Target specialist sources:**

| Source Priority | Where | Why |
|----------------|-------|-----|
| 🥇 Top priority | Reddit (`r/webdev`, `r/reactjs`, `r/nextjs`, `r/node`, `r/typescript`, `r/programming`) | Real devs, unfiltered opinions, "what do you actually use?" |
| 🥇 Top priority | Twitter/X (dev community, framework authors) | Cutting-edge tools, pre-mainstream discoveries |
| 🥈 High priority | GitHub trending, Awesome lists | Curated quality, stars ≠ quality but README quality matters |
| 🥈 High priority | Dev.to, Hacker News | Technical depth, real use cases |
| 🥉 Medium priority | Stack Overflow answers (high-vote) | Battle-tested solutions |
| ❌ AVOID | Medium articles, SEO-optimized blogs, "Top 10 tools" listicles | Sponsored garbage, outdated, surface-level |

**3. Search query templates:**

```
"best [technology] package for [specific task] reddit 2025"
"[framework] [task] library recommendation site:reddit.com"
"what do you use for [task] in [stack]" site:reddit.com OR site:twitter.com
"[task] tool cli npm" site:github.com
```

**4. Evaluation criteria — A tool MUST meet ALL of these:**

| Criterion | Minimum |
|-----------|---------|
| **Actively maintained** | Last commit < 6 months ago |
| **Real adoption** | Used in production by real teams (not just stars) |
| **Specialist approval** | Recommended by devs who clearly know what they're talking about |
| **Quick integration** | Can be added to the codebase in < 30 min |
| **Not bloatware** | Does one thing well, doesn't pull 200 dependencies |

**5. Anti-patterns (NEVER DO):**

- ❌ Recommend the first Google result
- ❌ Suggest tools you "heard about" without verifying they're still maintained
- ❌ Pick the tool with the most npm downloads (popularity ≠ quality)
- ❌ Suggest a heavy framework when a lightweight utility exists
- ❌ Skip this step because "I already know a tool" — still search, you might find something better
- ❌ Spend more than 2-3 `search_web` calls — this is research, not a rabbit hole

### Output in DISPLAY Block

When Tooling Scout finds something, add a `**Tooling:**` line to the DISPLAY block:

```
---
🧠 **Deep-Think** | `TASK_TECHNICAL` | Complexité: 3/5 | ⚡ M

**Intent:** [reformulation]
**Décomposition:**
1. [Sous-tâche 1] — ~X% budget
2. [Sous-tâche 2] — ~X% budget

**Framework:** Plan-and-Solve
**Tooling:** 🔍 Found `package-name` (recommended on r/reactjs) — [what it does, why it's better than hand-coding]
**Checkpoint:** Aucun — tâche légère
---
```

If no relevant tooling found:
```
**Tooling:** 🔍 Aucun outil spécifique identifié — exécution manuelle
```

### When to Search vs. When to Skip

| Situation | Action |
|-----------|--------|
| Building a new component/feature | **SEARCH** — there might be a library |
| Debugging an error | **SKIP** — debug first, search only if stuck |
| Refactoring existing code | **SEARCH** — there might be a codemod or linter |
| Adding animations/interactions | **SEARCH** — Framer Motion? GSAP? Something newer? |
| Data processing/transformation | **SEARCH** — lodash alternative? Zod? Valibot? |
| API integration | **SEARCH** — SDK? MCP server? |
| Simple CSS change | **SKIP** — no tool needed |
| File I/O, system tasks | **SEARCH** — CLI tool? Node util? |

---

## ⭐ Step 6: DISPLAY — Mandatory Visible Output

> **THIS STEP IS NOT OPTIONAL. EVERY non-bypassed message MUST produce this visible output.**

After the pipeline completes, BEFORE executing, display the following block in the chat:

### Format for Complexity 1-2 (compact):

```
🧠 **Compris:** [One-sentence restatement of intent] | ⚡ S
```

### Format for Complexity 3+ (detailed):

```
---
🧠 **Deep-Think** | `TYPE` | Complexité: X/5 | ⚡ WEIGHT

**Intent:** [One-sentence reformulation of what the user actually wants]

**Décomposition:**
1. [Sub-task 1] — ~X% budget
2. [Sub-task 2] — ~X% budget
3. [Sub-task 3] — ~X% budget

**Framework:** [Selected framework name]
**Checkpoint:** [Plan if Weight ≥ L, or "Aucun — tâche légère" if S/M]
---
```

### Rules for DISPLAY

1. **ALWAYS show the block** — No exceptions for non-bypassed messages
2. **Keep it compact** — The block should be 6-10 lines max, not a wall of text
3. **Use the exact format above** — Consistency lets the user recognize it instantly
4. **Show it BEFORE execution** — The block appears, then the actual work follows
5. **Include Token Weight** — The ⚡ emoji + weight letter (S/M/L/XL) must always be visible
6. **For weight L/XL** — Add a visible checkpoint plan line

---

## Execution Protocol

After DISPLAY:

1. **Execute** the rewritten prompt immediately after showing the Deep-Think block
2. If the decomposition revealed **unknowns that block execution**, ask the user BEFORE executing — batch all questions in one message
3. **During execution (Weight M+):** Monitor your own output. If you feel yourself rushing or compressing → **STOP and use `notify_user` with checkpoint format.** This is a REAL stop, not a mental note.
4. **During execution (Weight L/XL):** After each step/chunk, actively evaluate: "Am I maintaining the same quality as step 1?" If NO → checkpoint immediately via `notify_user`.
5. **After execution:** Verify the Quality Invariant — were the last items as detailed as the first?

### XL Tasks — Mandatory Split

For XL tasks:
1. Show the Deep-Think block with full decomposition
2. Execute ONLY the planning phase in the first turn
3. Use `notify_user` to present the plan and ask to continue
4. Each subsequent "continue" executes the next phase
5. NEVER attempt to do everything in one turn

---

## Self-Improvement

After each execution, mentally note:
- Did the rewritten prompt lead to a better result?
- Was any step unnecessary for this complexity level?
- Did the token weight estimation match reality?
- Did I checkpoint when I should have, or did I push too far?
- Adjust framework selection and weight estimation for similar future messages

---

## Related Docs

- [references/thinking-frameworks.md](references/thinking-frameworks.md) — Full framework documentation
- [references/prompt-templates.md](references/prompt-templates.md) — Rewrite templates by type
- [references/quality-checklist.md](references/quality-checklist.md) — Validation criteria
- [references/token-guard.md](references/token-guard.md) — Token ceiling management
