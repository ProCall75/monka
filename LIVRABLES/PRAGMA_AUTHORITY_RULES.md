# PRAGMA AUTHORITY — TRANSCRIPTION & DESIGN PROTOCOL (V5.0)

> **OBJECTIVE:** Produce "Board Grade" HTML presentations that are 100% faithful to the source text (Verbatim) while strictly adhering to the Pragma Authority visual identity.

---

## 1. THE GOLDEN RULE: ZERO DATA LOSS (VERBATIM)
**Principle:** The Source Document is immutable truth.
*   **ABSOLUTE PROHIBITION:** Do not summarize, do not rephrase, do not "improve" the text.
*   **Strict Copy:** If the source says "Legacy scoring 310127.docx", you write "Legacy scoring 310127.docx", NOT "Legacy Scoring File".
*   **Completeness:** Every section, table row, and footnote in the source must appear in the presentation.

## 2. LAYOUT PHYSICS (1920x1080px)
**Principle:** Rigid constraints force clarity.
*   **Viewport:** Fixed `1920px` x `1080px`. No scrolling.
*   **Safe Zone:** Content must fit within `padding: 60px 100px`.
*   **Vertical Strategy (The "Chirurgical Split"):**
    *   IF content exceeds 1080px height:
    *   THEN split into multiple slides (e.g., Slide 4a, Slide 4b).
    *   NEVER shrink font size to fit.
    *   NEVER allow overflow/clipping.

## 3. TYPOGRAPHY (BOARD GRADE)
**Principle:** Legibility at a distance.
*   **Font Family:** `Plus Jakarta Sans` only.
*   **Page Title:** `72px` (Bold 700). Letter-spacing `-2px`.
*   **Section Tag:** `24px` (Caps, Bold 700). Letter-spacing `2px`.
*   **Body Text:** Minimum `28px` (Regular 400).
*   **Tables:** Minimum `22px`. Headers `18px`.

## 4. BRANDING & AESTHETICS (PRAGMA V4.40)
**Principle:** Confidence through scale and simplicity.
*   **Logos (Standard Enterprise):**
    *   **Cover Slide:** `height: 180px` (Prominent but balanced).
    *   **Footer:** `height: 60px` (Standard legibility). Opacity `1`.
*   **Visuals (Nanobanana Protocol):**
    *   **Style:** Flat Vector, No Shadows, Clean Lines.
    *   **Prohibition:** NO EMOJIS anywhere. Use color coding (Green/Orange/Red) for status.
*   **Footer:**
    *   Height: `120px`.
    *   Must be visible and clear on EVERY slide.

## 5. INTELLIGENT TRANSCRIPTION PROCESS
When converting a document to a Pragma Presentation:
1.  **Map:** Identify all semantic blocks in the source.
2.  **Distribute:** Assign blocks to slides. If a block is dense (e.g., "Scoring Formula" + "Scoring Table"), assign to *separate* slides immediately.
3.  **Transcribe:** Copy/Paste text exactly.
4.  **Polish:** Apply CSS classes. Remove artifacts (bullets become table rows). Remove emojis. Ensure logos are 4x.

---
**VALIDATION CHECKLIST:**
- [ ] Is every word from the source present?
- [ ] Are logos at Standard size (180px/60px)?
- [ ] Is font size ≥ 28px?
- [ ] Is there zero scrolling?
- [ ] Are emojis removed?
