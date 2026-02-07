#!/usr/bin/env python3
"""
Script to fill missing questions into QUESTIONNAIRE_V2 templates
from SOURCES/extracted data.
"""
import json
import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES_DIR = os.path.join(ROOT_DIR, "SOURCES", "extracted")
Q_DIR = os.path.join(ROOT_DIR, "QUESTIONNAIRE_V2")

VULN_MAP = {
    "V1": {"dir": "V1_social_relationnel", "sheet": "social et relationnel"},
    "V2": {"dir": "V2_fragilite_proche", "sheet": "fragilité du proche"},
    "V3": {"dir": "V3_sante_aidant", "sheet": "santé physique et psychologique"},
    "V4": {"dir": "V4_sante_proche", "sheet": "parcours médical du proche"},
    "V5": {"dir": "V5_administrative", "sheet": "administrative"},
}

# Load source data
with open(os.path.join(SOURCES_DIR, "Questionnaire_valideě_.xlsx_extracted.json")) as f:
    questionnaire_data = json.load(f)

with open(os.path.join(SOURCES_DIR, "recommendations_complete.json")) as f:
    reco_data = json.load(f)

# Load Sophie CAT for scoring info
sophie_path = os.path.join(SOURCES_DIR, "Tableau_SOPHIE_CAT___Reco-Nouveau_ques_tionnaire_par_Vulnérabilité1_7.xlsx_extracted.json")
with open(sophie_path) as f:
    sophie_data = json.load(f)


def get_existing_ids(vuln_code):
    """Get question IDs already in the template"""
    vuln_dir = VULN_MAP[vuln_code]["dir"]
    filepath = os.path.join(Q_DIR, vuln_dir, "questions.md")
    with open(filepath) as f:
        content = f.read()
    pattern = re.compile(r'^#{3,4}\s+([A-Z0-9]+)\s+[–—-]', re.MULTILINE)
    ids = set(pattern.findall(content))
    ids -= {m for m in ids if m.startswith('Section')}
    return ids


def get_source_ids(vuln_code):
    """Get all question IDs from the source"""
    ids = []
    for q in reco_data[vuln_code]["questions"]:
        qid = q.get("id", "")
        if qid and qid != "N° question":
            ids.append(qid)
    return ids


def get_question_data_from_excel(vuln_code, question_id):
    """Get question data from the Excel extraction"""
    sheet_name = VULN_MAP[vuln_code]["sheet"]
    sheet = questionnaire_data["sheets"][sheet_name]
    
    for row in sheet["rows"]:
        if isinstance(row, list) and len(row) > 7:
            rid = str(row[7]).strip() if row[7] else ""
            if rid == question_id:
                return {
                    "id": rid,
                    "ordre": row[2] if len(row) > 2 else "",
                    "bloc": row[4] if len(row) > 4 else "",
                    "sous_bloc": row[5] if len(row) > 5 else "",
                    "label": row[8] if len(row) > 8 else "",
                    "type_reponse": row[9] if len(row) > 9 else "",
                    "valeurs": row[10] if len(row) > 10 else "",
                }
    return None


def get_reco_data(vuln_code, question_id):
    """Get recommendation data for a question"""
    for q in reco_data[vuln_code]["questions"]:
        if q.get("id") == question_id:
            return q.get("recommendations", {})
    return {}


def format_question_md(q_data, reco):
    """Format a question as markdown for the template"""
    qid = q_data["id"]
    label = q_data["label"]
    type_rep = q_data["type_reponse"]
    valeurs = q_data["valeurs"]
    
    # Build short name from label
    short_name = label.split("?")[0].strip()
    if len(short_name) > 60:
        short_name = short_name[:57] + "..."
    
    md = f"\n#### {qid} — {short_name}\n\n"
    md += f"**Libellé** : {label}\n\n"
    md += f"**Type** : {type_rep}\n\n"
    
    # Parse options
    if valeurs:
        opts = [v.strip() for v in str(valeurs).split("|") if v.strip()]
        if opts:
            md += "| Code | Libellé |\n"
            md += "|------|---------|\n"
            for i, opt in enumerate(opts, 1):
                md += f"| {i} | {opt} |\n"
    
    md += "\n---\n"
    return md


def inject_questions(vuln_code):
    """Inject missing questions into the template"""
    existing = get_existing_ids(vuln_code)
    source = get_source_ids(vuln_code)
    missing = [qid for qid in source if qid not in existing]
    
    if not missing:
        print(f"{vuln_code}: All questions already present ✅")
        return
    
    print(f"{vuln_code}: {len(missing)} questions to add: {missing}")
    
    # Read existing file
    vuln_dir = VULN_MAP[vuln_code]["dir"]
    filepath = os.path.join(Q_DIR, vuln_dir, "questions.md")
    with open(filepath) as f:
        content = f.read()
    
    # Group missing questions by sous-bloc
    by_bloc = {}
    for qid in missing:
        q_data = get_question_data_from_excel(vuln_code, qid)
        if q_data:
            sb = q_data.get("sous_bloc", "Autre")
            if sb not in by_bloc:
                by_bloc[sb] = []
            by_bloc[sb].append(q_data)
        else:
            print(f"  ⚠️  {qid} not found in Excel data!")
    
    # Find where to insert (before ## ⚠️ Règles Legacy)
    insert_marker = "## ⚠️ Règles Legacy"
    if insert_marker not in content:
        insert_marker = None
    
    # Build new content
    new_blocks = "\n\n### Questions additionnelles (complément source)\n\n---\n"
    
    for bloc_name, questions in by_bloc.items():
        if bloc_name:
            # Check if this section already exists
            if bloc_name not in content:
                new_blocks += f"\n### {bloc_name}\n\n---\n"
        
        for q_data in questions:
            reco = get_reco_data(vuln_code, q_data["id"])
            new_blocks += format_question_md(q_data, reco)
    
    # Insert
    if insert_marker and insert_marker in content:
        content = content.replace(insert_marker, new_blocks + "\n" + insert_marker)
    else:
        content += new_blocks
    
    # Update metadata total
    total = len(existing) + len(missing)
    content = re.sub(r'total_questions:\s*\d+', f'total_questions: {total}', content)
    
    with open(filepath, "w") as f:
        f.write(content)
    
    print(f"  ✅ Added {len(missing)} questions to {filepath}")
    print(f"  📊 New total: {total}")


def main():
    for v in ["V2", "V3", "V4", "V5"]:
        inject_questions(v)
        print()


if __name__ == "__main__":
    main()
