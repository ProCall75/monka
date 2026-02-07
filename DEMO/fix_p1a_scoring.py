#!/usr/bin/env python3
"""
P1-A: Propagate scores from scores_by_vulnerability.json into:
1. questions.md — Add Score column to question option tables
2. scoring.md — Update max_score and question list
3. Fix scoring.md format so generate_json_v3.py can parse it
"""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES = os.path.join(ROOT, "SOURCES", "extracted")
TEMPLATES = os.path.join(ROOT, "QUESTIONNAIRE_V2")

VULN_MAP = {
    "V1": {"dir": "V1_social_relationnel", "name": "Social et Relationnel"},
    "V2": {"dir": "V2_fragilite_proche", "name": "Fragilité du Proche"},
    "V3": {"dir": "V3_sante_aidant", "name": "Santé de l'Aidant"},
    "V4": {"dir": "V4_sante_proche", "name": "Parcours Médical du Proche"},
    "V5": {"dir": "V5_administrative", "name": "Administrative"},
}

# Load scoring source
with open(os.path.join(SOURCES, "scores_by_vulnerability.json")) as f:
    scores_source = json.load(f)

# Load questionnaire source for labels
with open(os.path.join(SOURCES, "recommendations_complete.json")) as f:
    reco_source = json.load(f)


def get_question_label(vuln_code, qid):
    """Get question label from source"""
    for q in reco_source[vuln_code]["questions"]:
        if q.get("id") == qid:
            return q.get("text", qid)[:60]
    return qid


def update_scoring_md(vuln_code):
    """Rewrite scoring.md with complete scoring data from source"""
    vuln = VULN_MAP[vuln_code]
    score_data = scores_source.get(vuln_code, {})
    
    if not score_data:
        print(f"  {vuln_code}: No scoring data in source, skipping")
        return
    
    # Calculate max_score
    max_score = 0
    for qid, opts in score_data.items():
        max_q = max(int(o.get("score", 0)) for o in opts) if opts else 0
        max_score += max_q
    
    # Build scoring.md
    md = f"""# 📊 Scoring {vuln_code} — {vuln['name']}

> **Source** : `SOURCES/extracted/scores_by_vulnerability.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: {vuln_code}
name: "{vuln['name']}"
source: "scores_by_vulnerability.json"
extraction_date: "2026-02-07"
score_max: {max_score}
questions_scorantes: {len(score_data)}
```

---

## 📋 Questions Scorantes

Score max global : {max_score}

| Question | Réponse | Score |
|----------|---------|-------|
"""
    
    for qid in score_data:
        opts = score_data[qid]
        label = get_question_label(vuln_code, qid)
        for i, opt in enumerate(opts):
            resp = opt.get("response", "?")
            score = opt.get("score", "0")
            if i == 0:
                md += f"| **{qid}** — {label} | {resp} | {score} |\n"
            else:
                md += f"| | {resp} | {score} |\n"
    
    # Thresholds (calculated as thirds of max_score)
    t1 = max_score // 3
    t2 = (max_score * 2) // 3
    
    md += f"""
---

## 🎯 Seuils d'Interprétation

| Score | Niveau | Couleur |
|-------|--------|---------|
| 0-{t1} | Faible | 🟢 Vert |
| {t1+1}-{t2} | Modéré | 🟠 Orange |
| {t2+1}-{max_score} | Élevé | 🔴 Rouge |

---

## ⚠️ Règle Clé

> **Le scoring mesure une INTENSITÉ, il ne déclenche JAMAIS seul un micro-parcours.**

Le scoring sert à :
- Moduler la priorité d'affichage
- Nuancer l'urgence
- Compléter les déclencheurs
"""
    
    filepath = os.path.join(TEMPLATES, vuln["dir"], "scoring.md")
    with open(filepath, "w") as f:
        f.write(md)
    
    print(f"  {vuln_code}: scoring.md ✅ ({len(score_data)} questions, max={max_score})")


def update_questions_scores(vuln_code):
    """Add Score column to question options in questions.md"""
    vuln = VULN_MAP[vuln_code]
    score_data = scores_source.get(vuln_code, {})
    
    if not score_data:
        return
    
    filepath = os.path.join(TEMPLATES, vuln["dir"], "questions.md")
    with open(filepath) as f:
        content = f.read()
    
    lines = content.split('\n')
    result = []
    current_qid = None
    in_table = False
    table_has_score = False
    option_idx = 0
    current_opts = None
    
    q_pattern = re.compile(r'^#{3,4}\s+([A-Z0-9]+)\s+[–—-]')
    
    for line in lines:
        stripped = line.strip()
        
        # Detect question ID
        m = q_pattern.search(stripped)
        if m:
            qid = m.group(1)
            if qid in score_data:
                current_qid = qid
                current_opts = score_data[qid]
            else:
                current_qid = None
                current_opts = None
            in_table = False
            option_idx = 0
            result.append(line)
            continue
        
        # Detect table header
        if current_qid and stripped.startswith('|') and ('Code' in stripped or 'Libellé' in stripped):
            in_table = True
            table_has_score = 'Score' in stripped
            if not table_has_score:
                # Add Score column
                line = line.rstrip()
                if line.endswith('|'):
                    line = line + ' Score |'
                else:
                    line = line + ' | Score |'
            result.append(line)
            continue
        
        # Table separator
        if current_qid and in_table and stripped.startswith('|') and '---' in stripped:
            if not table_has_score:
                line = line.rstrip()
                if line.endswith('|'):
                    line = line + '-------|'
                else:
                    line = line + ' |-------|'
            result.append(line)
            continue
        
        # Table data row
        if current_qid and in_table and stripped.startswith('|') and '---' not in stripped:
            if not table_has_score and current_opts:
                # Find matching score
                score = find_score_for_option(current_opts, stripped, option_idx)
                line = line.rstrip()
                if line.endswith('|'):
                    line = line + f' {score} |'
                else:
                    line = line + f' | {score} |'
                option_idx += 1
            result.append(line)
            continue
        
        # End of table
        if in_table and not stripped.startswith('|'):
            in_table = False
            current_qid = None
        
        result.append(line)
    
    with open(filepath, "w") as f:
        f.write('\n'.join(result))
    
    scored_count = len(score_data)
    print(f"  {vuln_code}: questions.md ✅ (scores added for {scored_count} questions)")


def find_score_for_option(source_opts, table_line, idx):
    """Match a table line to a source option score"""
    parts = [p.strip() for p in table_line.strip('|').split('|')]
    if len(parts) < 2:
        return 0
    
    label = parts[1].strip().lower().replace('«', '').replace('»', '').replace('"', '')
    
    # Try exact match by index
    if idx < len(source_opts):
        return source_opts[idx].get("score", 0)
    
    # Try label match
    for opt in source_opts:
        resp = opt.get("response", "").lower()
        # Remove prefix like "1-", "2-"
        resp_clean = re.sub(r'^\d+-', '', resp).strip()
        if resp_clean in label or label in resp_clean:
            return opt.get("score", 0)
    
    return 0


def main():
    print("=== P1-A: Propagation Scoring ===\n")
    
    for v in ["V1", "V2", "V3", "V4", "V5"]:
        print(f"\n--- {v} ---")
        update_scoring_md(v)
        update_questions_scores(v)
    
    print("\n✅ Scoring propagé pour toutes les vulnérabilités")


if __name__ == "__main__":
    main()
