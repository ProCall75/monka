#!/usr/bin/env python3
"""
P2: Propagate ALL recommendations from recommendations_complete.json + micro_taches
into recommendations.md templates for V1-V5.
Overwrites existing templates with complete data from source.
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

# Load sources
with open(os.path.join(SOURCES, "recommendations_complete.json")) as f:
    reco_src = json.load(f)

# Load micro-tâches
mt_path = os.path.join(SOURCES, "micro_taches_typologie.json")
micro_taches = {}
if os.path.exists(mt_path):
    with open(mt_path) as f:
        micro_taches = json.load(f)


def get_micro_tasks_for_question(vuln_dir, qid):
    """Get typed micro-tasks for a question from micro_taches_typologie.json"""
    # MT source uses different keys than VULN_MAP dirs
    MT_KEY_MAP = {
        "V1_social_relationnel": None,  # No MT in source for V1
        "V2_fragilite_proche": "V2_fragilite_proche",
        "V3_sante_aidant": "V3_sante_aidant",
        "V4_sante_proche": "V4_parcours_medical",
        "V5_administrative": "V5_administrative",
    }
    mt_key = MT_KEY_MAP.get(vuln_dir, vuln_dir)
    if not mt_key:
        return []
    mt_data = micro_taches.get(mt_key, {})
    tasks = mt_data.get("tasks", [])
    matched = []
    for t in tasks:
        if isinstance(t, dict) and t.get("question_id") == qid:
            matched.append(t)
    return matched


def clean_text(txt):
    """Clean text for table display"""
    if not txt:
        return "-"
    txt = txt.strip()
    txt = txt.replace("|", "/")
    txt = txt.replace("\n", " ")
    if txt in ["N/A", "n/a", ""]:
        return "N/A"
    return txt[:120]


def generate_recommendations_md(vuln_code):
    """Generate complete recommendations.md from source data"""
    vuln = VULN_MAP[vuln_code]
    questions = reco_src[vuln_code]["questions"]
    vuln_dir = vuln["dir"]
    
    # Filter out header row
    valid_qs = [q for q in questions if q.get("id") and q["id"] != "N° question"]
    
    # Separate questions with recos from those without
    qs_with_reco = []
    qs_without_reco = []
    
    for q in valid_qs:
        responses = q.get("responses", [])
        has_data = False
        for r in responses:
            if (r.get("recommendation", "").strip() or 
                r.get("actors", "").strip() or 
                r.get("idec_actions", "").strip()):
                has_data = True
                break
        if has_data:
            qs_with_reco.append(q)
        else:
            qs_without_reco.append(q)
    
    md = f"""# 💡 Recommendations {vuln_code} — {vuln['name']}

> **Source** : `SOURCES/extracted/recommendations_complete.json` ({vuln_code})  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: {vuln_code}
name: "{vuln['name']}"
source: "recommendations_complete.json"
extraction_date: "2026-02-07"
questions_with_reco: {len(qs_with_reco)}
questions_without_reco: {len(qs_without_reco)}
total_questions: {len(valid_qs)}
```

---

## 📋 Recommendations par Question

"""
    
    for q in qs_with_reco:
        qid = q["id"]
        text = q.get("text", "")[:60]
        responses = q.get("responses", [])
        
        # Get micro-tasks
        mt = get_micro_tasks_for_question(vuln_dir, qid)
        
        md += f"### {qid} — {text}\n\n"
        
        # Check if any response has relevant data
        has_mt_section = len(mt) > 0
        
        md += "| Réponse | Recommendation App | Acteurs | Actions IDEC |\n"
        md += "|---------|-------------------|---------|--------------|\n"
        
        for r in responses:
            resp_label = r.get("response", "?")
            # Remove prefix like "1-", "2-"
            resp_label = re.sub(r'^\d+-', '', resp_label).strip()
            
            reco_txt = clean_text(r.get("recommendation", ""))
            actors = clean_text(r.get("actors", ""))
            idec = clean_text(r.get("idec_actions", ""))
            
            md += f"| {resp_label[:50]} | {reco_txt} | {actors} | {idec} |\n"
        
        # Add micro-tasks section if available
        if has_mt_section:
            md += f"\n**Micro-tâches associées** ({len(mt)}) :\n\n"
            md += "| # | Tâche | Type | Acteur |\n"
            md += "|---|-------|------|--------|\n"
            for i, t in enumerate(mt, 1):
                task_text = clean_text(t.get("task", t.get("text", "?")))
                task_type = t.get("type", "STRUC")
                task_actor = t.get("actor", "IDEC")
                md += f"| {i} | {task_text} | `{task_type}` | {task_actor} |\n"
        
        md += "\n---\n\n"
    
    # Section for questions without recommendations
    if qs_without_reco:
        ids = ", ".join([q["id"] for q in qs_without_reco])
        md += f"### Questions sans recommandation spécifique\n\n"
        md += f"> Les questions suivantes n'ont pas de recommandation dans le SOPHIE CAT : **{ids}**\n"
        md += f"> Elles servent principalement au scoring, déclencheurs ou contexte.\n\n"
    
    md += """---

## 🤖 Contenu IA (à valider)

| Élément | Source | Statut |
|---------|--------|--------|
| Recommendations App | ✅ SOPHIE CAT | Legacy |
| Actions IDEC | ✅ SOPHIE CAT | Legacy |
| Micro-tâches | ✅ micro_taches_typologie.json | Extracted |
| Typage micro-tâches | 🤖 IA | À valider |
"""
    
    return md


def main():
    print("=== P2: Propagation Recommendations ===\n")
    
    for v in ["V1", "V2", "V3", "V4", "V5"]:
        vuln = VULN_MAP[v]
        md_content = generate_recommendations_md(v)
        
        filepath = os.path.join(TEMPLATES, vuln["dir"], "recommendations.md")
        with open(filepath, "w") as f:
            f.write(md_content)
        
        # Count for summary
        questions = reco_src[v]["questions"]
        valid_qs = [q for q in questions if q.get("id") and q["id"] != "N° question"]
        q_with_reco = sum(1 for q in valid_qs if any(
            r.get("recommendation", "").strip() or r.get("actors", "").strip() or r.get("idec_actions", "").strip()
            for r in q.get("responses", [])
        ))
        
        # Count micro-tasks
        mt_data = micro_taches.get(vuln["dir"], {})
        mt_count = mt_data.get("total", 0)
        
        print(f"  {v}: ✅ {q_with_reco} questions with recos | {mt_count} micro-tâches | → {filepath}")
    
    print("\n✅ Recommendations propagées pour V1-V5")


if __name__ == "__main__":
    main()
