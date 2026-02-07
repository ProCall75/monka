import json
import os
import re
import datetime

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
SOURCE_DIR = os.path.join(ROOT_DIR, "QUESTIONNAIRE_V2")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "data")

VULNERABILITIES = [
    {"code": "V1", "dir": "V1_social_relationnel", "name": "Social et Relationnel"},
    {"code": "V2", "dir": "V2_fragilite_proche", "name": "Fragilité du Proche"},
    {"code": "V3", "dir": "V3_sante_aidant", "name": "Santé de l'Aidant"},
    {"code": "V4", "dir": "V4_sante_proche", "name": "Santé du Proche"},
    {"code": "V5", "dir": "V5_administrative", "name": "Administrative"}
]

# --- Parsing Helpers ---

def clean_label(text):
    if not text: return ""
    # Remove « » " '
    text = text.replace('«', '').replace('»', '').replace('"', '').strip()
    return text

def parse_questions_md(content):
    questions = []
    current_q = None
    
    # Regex patterns
    # Support ### or #### with Hyphen, En Dash, Em Dash
    q_pattern = re.compile(r'^(#{3,4})\s+([A-Z0-9]+)\s+[–—-]\s+(.+)')
    type_pattern = re.compile(r'\*\*Type\*\*\s*:\s*(.+)')
    libelle_pattern = re.compile(r'\*\*Libellé\*\*\s*:\s*(.+)')
    
    # Section headers (### Section X.Y — ...) to skip
    section_pattern = re.compile(r'^###\s+Section\s+\d')
    
    lines = content.split('\n')
    for i, raw_line in enumerate(lines):
        line = raw_line.strip()
        
        # Skip section headers
        if section_pattern.search(line):
            continue
        
        # New Question (### or ####)
        m_q = q_pattern.search(line)
        if m_q:
            if current_q:
                questions.append(current_q)
            current_q = {
                "id": m_q.group(2).strip(),
                "label": m_q.group(3).strip(),
                "type": "descriptive", 
                "options": [],
                "condition": None,
                "tags": []
            }
            continue
            
        if not current_q:
            continue
        
        # Libellé (overrides the header label with the full question text)
        m_lib = libelle_pattern.search(line)
        if m_lib:
            current_q["label"] = m_lib.group(1).strip()
            continue
            
        # Type from **Type** line
        m_type = type_pattern.search(line)
        if m_type:
            type_str = m_type.group(1).lower()
            if "score" in type_str or "scorante" in type_str:
                current_q["type"] = "scorante"
            elif "déclench" in type_str or "declench" in type_str:
                current_q["type"] = "declenchante"
            continue
        
        # Tags from ⚠️ annotations
        if line.startswith("**⚠️"):
            tag_text = line.lower()
            if "scorante" in tag_text and current_q["type"] == "descriptive":
                current_q["type"] = "scorante"
            if "critique" in tag_text:
                current_q["tags"].append("critique_directe")
                if current_q["type"] == "descriptive":
                    current_q["type"] = "critique"
            if "déclenchante" in tag_text or "declenchante" in tag_text:
                if current_q["type"] == "descriptive":
                    current_q["type"] = "declenchante"
                current_q["tags"].append("declenchante")
            # Extract CCC references
            ccc_matches = re.findall(r'CCC\s+([A-Z]\d+)', tag_text, re.IGNORECASE)
            for ccc_ref in ccc_matches:
                current_q["tags"].append(f"ccc_{ccc_ref}")
            continue
            
        # Option row from table
        if line.startswith('|') and "Code" not in line and "---" not in line and "Libellé" not in line:
            parts = [p.strip() for p in line.strip('|').split('|')]
            if len(parts) >= 2:
                code = parts[0]
                # Skip header-like rows
                if code.lower() in ['code', 'état', 'mp', '']:
                    continue
                label = clean_label(parts[1])
                score = 0
                is_critical = False
                
                # Check remaining columns for score and tags
                for col_idx in range(2, len(parts)):
                    col = parts[col_idx].strip()
                    # Score column
                    nums = re.findall(r'^(\d+)$', col)
                    if nums:
                        score = int(nums[0])
                    # Critical markers
                    if '🔴' in col and 'Critique' in col:
                        is_critical = True
                
                option = {
                    "code": code,
                    "label": label,
                    "score": score
                }
                if is_critical:
                    option["critical"] = True
                current_q["options"].append(option)

    if current_q:
        questions.append(current_q)
    return questions

def parse_scoring_md(content):
    scoring_data = {
        "questions": {},
        "max_score": 0,
        "thresholds": []
    }
    
    # Score max from yaml block or inline
    m_max = re.search(r'score_max:\s*(\d+)', content)
    if m_max:
        scoring_data["max_score"] = int(m_max.group(1))
    else:
        m_max = re.search(r'Score max.*:\s*(\d+)', content, re.IGNORECASE)
        if m_max:
            scoring_data["max_score"] = int(m_max.group(1))
        
    lines = content.split('\n')
    in_threshold_table = False
    in_questions_table = False
    current_qid = None
    
    for line in lines:
        stripped = line.strip()
        
        # Detect threshold table (Score | Niveau | Couleur)
        if '| Score' in stripped and ('| Niveau' in stripped or '| Couleur' in stripped or '| Lecture' in stripped):
            in_threshold_table = True
            in_questions_table = False
            continue
        
        # Detect questions table (Question | Réponse | Score)
        if '| Question' in stripped and '| Score' in stripped:
            in_questions_table = True
            in_threshold_table = False
            continue
        
        # Skip separator rows
        if stripped.startswith('|') and '---' in stripped:
            continue
        
        # Parse threshold rows
        if in_threshold_table and stripped.startswith('|'):
            cols = [c.strip() for c in stripped.split('|') if c.strip()]
            if len(cols) >= 2:
                range_str = cols[0]
                # Label is either col 1 or col 2
                label = cols[1] if len(cols) == 2 else cols[1]
                color_hint = cols[-1] if len(cols) >= 3 else cols[1]
                
                color = "green"
                l = (label + " " + color_hint).lower()
                if any(k in l for k in ['modéré', 'moyen', 'orange', '🟠']): color = "orange"
                if any(k in l for k in ['élevé', 'critique', 'urgent', 'rouge', '🔴']): color = "red"
                
                min_val, max_val = 0, 99
                nums = re.findall(r'\d+', range_str)
                if len(nums) == 2:
                    min_val = int(nums[0])
                    max_val = int(nums[1])
                elif len(nums) == 1:
                    if '>' in range_str:
                        min_val = int(nums[0]) + 1
                        max_val = 99
                    elif '<' in range_str:
                        min_val = 0
                        max_val = int(nums[0]) - 1
                    else:
                        min_val = max_val = int(nums[0])
                
                scoring_data["thresholds"].append({
                    "min": min_val,
                    "max": max_val,
                    "label": label,
                    "color": color
                })
            continue
        
        # Parse question scoring rows 
        if in_questions_table and stripped.startswith('|'):
            cols = [c.strip() for c in stripped.split('|') if c.strip()]
            if len(cols) >= 3:
                q_col = cols[0]
                resp = cols[1]
                score = cols[2]
                
                # Extract question ID from bold format **E1** — ...
                m_qid = re.search(r'\*\*([A-Z0-9]+)\*\*', q_col)
                if m_qid:
                    current_qid = m_qid.group(1)
                    if current_qid not in scoring_data["questions"]:
                        scoring_data["questions"][current_qid] = []
                
                if current_qid:
                    try:
                        score_val = int(score)
                    except ValueError:
                        score_val = 0
                    scoring_data["questions"][current_qid].append({
                        "response": resp,
                        "score": score_val
                    })
            continue
        
        # Reset on non-table line
        if not stripped.startswith('|') and stripped and not stripped.startswith('#'):
            if in_threshold_table or in_questions_table:
                in_threshold_table = False
                in_questions_table = False
    
    return scoring_data

def parse_declencheurs_md(content):
    triggers = {
        "critical_direct": [],
        "standard": [],
        "ccc": []
    }
    current_section = None
    in_header_row = False
    
    lines = content.split('\n')
    for line in lines:
        stripped = line.strip()
        if "Critiques" in stripped and "##" in stripped:
            current_section = "critical_direct"
            in_header_row = False
        elif "Standard" in stripped and "##" in stripped:
            current_section = "standard"
            in_header_row = False
        elif "Déclenchant" in stripped and "##" in stripped:
            current_section = "standard"
            in_header_row = False
        elif "CCC" in stripped and "##" in stripped:
             current_section = "ccc_ref"
             in_header_row = False
        elif "Règles" in stripped and "##" in stripped:
             current_section = None
             
        if current_section and "|" in stripped:
            # Skip separator rows
            if "---" in stripped:
                continue
            # Skip header row (contains column titles)
            cols_raw = [c.strip() for c in stripped.split('|') if c.strip()]
            if any(h in stripped for h in ["| Question |", "| ID |"]):
                in_header_row = True
                continue
            if not cols_raw:
                continue
            
            # Find the ID in any column (look for **XX** pattern)
            q_id = None
            q_id_col_idx = -1
            for idx, col in enumerate(cols_raw):
                m_bold = re.search(r'\*\*([A-Z]\d+)\*\*', col)
                if m_bold:
                    q_id = m_bold.group(1)
                    q_id_col_idx = idx
                    break
            
            if not q_id:
                # Try plain ID format
                for idx, col in enumerate(cols_raw):
                    m_plain = re.match(r'^([A-Z]\d+)$', col)
                    if m_plain:
                        q_id = m_plain.group(1)
                        q_id_col_idx = idx
                        break
            
            if not q_id:
                continue
            
            # Get remaining columns (response and MP/sens)
            other_cols = [c for i, c in enumerate(cols_raw) if i != q_id_col_idx]
            
            # Response is typically the column after question text
            # In our format: Question | **ID** | Réponse | MP/Sens
            response_col = ""
            mp_col = ""
            if len(other_cols) >= 2:
                response_col = other_cols[1]  # Skip question text
                if len(other_cols) >= 3:
                    mp_col = other_cols[2]
            elif len(other_cols) == 1:
                response_col = other_cols[0]
            
            # Split responses by / for multiple triggers
            raw_responses = response_col
            responses = [clean_label(r) for r in raw_responses.split('/')]
            
            mp = mp_col.replace('**', '').strip() if mp_col else "Unknown"
            
            target_key = current_section if current_section in triggers else None
            if not target_key:
                continue
            
            for resp in responses:
                if not resp:
                    continue
                entry = {
                    "question_id": q_id,
                    "option_label": resp,
                    "priority": 1 if current_section == "critical_direct" else 3,
                    "delay_days": 7 if current_section == "critical_direct" else 90
                }
                if mp != "Unknown":
                    entry["micro_parcours"] = mp
                triggers[target_key].append(entry)

    return triggers

def parse_recommendations_md(content):
    recos = {}
    questions_blocks = re.split(r'###\s+([A-Z0-9]+)', content)
    
    for i in range(1, len(questions_blocks), 2):
        q_id = questions_blocks[i].strip()
        block_content = questions_blocks[i+1]
        recos[q_id] = {}
        
        # Check structured Options (#### Option: ...)
        if "#### Option" in block_content:
            options_blocks = re.split(r'####\s+Option:?\s*(.+)', block_content)
            for j in range(1, len(options_blocks), 2):
                opt_label = clean_label(options_blocks[j])
                opt_content = options_blocks[j+1]
                
                app_text = None
                m_app = re.search(r'\*\*📱.*?\*\*.*?>\s*(.+)', opt_content, re.IGNORECASE | re.DOTALL)
                if m_app: app_text = m_app.group(1).split('\n')[0].strip()
                if not app_text:
                     m_app = re.search(r'>\s*(.+)', opt_content)
                     if m_app: app_text = m_app.group(1).strip()

                micro_tasks = []
                rows = re.findall(r'\|\s*\d+\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|', opt_content)
                for row in rows:
                    if "---" in row[0]: continue
                    micro_tasks.append({
                        "text": row[0].strip(),
                        "type": row[1].replace('`', '').strip(),
                        "actor": row[2].strip(),
                        "source": "excel", "type_source": "ia"
                    })
                
                recos[q_id][opt_label] = {
                    "app_text": app_text,
                    "app_text_source": "excel",
                    "micro_tasks": micro_tasks
                }
        # Fallback to Table Parsing (V1 style)
        elif "|" in block_content:
            rows = [l.strip() for l in block_content.split('\n') if "|" in l]
            for r in rows:
                cols = [c.strip() for c in r.split('|') if c.strip()]
                if len(cols) < 4 or "Réponse" in cols[0] or "---" in cols[0]: continue
                
                lbl = clean_label(cols[0])
                app_txt = cols[1] if "N/A" not in cols[1] else None
                actors = [a.strip() for a in cols[2].split('/')]
                mt_txt = cols[3]
                
                # Note: V1 table has Actors as col 2, Actions as col 3.
                # If app_txt or mt_txt useful:
                recos[q_id][lbl] = {
                    "app_text": app_txt,
                    "app_text_source": "excel",
                    "actors": actors,
                    "micro_tasks": [{"text": mt_txt, "type": "STRUC", "actor": "IDEC"}]
                }

    return recos

def parse_ccc_md(content):
    ccc_list = []
    # Support all dash types: – (en dash), — (em dash), - (hyphen)
    blocks = re.split(r'###\s+(CCC_[A-Z0-9]+_[0-9]+)\s+[–—-]\s+(.+)', content)
    for i in range(1, len(blocks), 3):
        ccc_id = blocks[i].strip()
        name = blocks[i+1].strip()
        text = blocks[i+2]
        
        # Extract conditions from multiple formats
        conds = []
        
        # Format 1: - Q = value (list format)
        cond_lines = re.findall(r'-\s+([A-Z0-9]+)\s*=\s*(.+)', text)
        for q, o in cond_lines:
            conds.append({"question_id": q, "option_label": clean_label(o)})
        
        # Format 2: Q = "value" inside code blocks
        if not conds:
            code_conds = re.findall(r'([A-Z]\d+)\s*=\s*["«]([^"»]+)["»]', text)
            for q, o in code_conds:
                conds.append({"question_id": q, "option_label": clean_label(o)})
        
        # Format 3: • Q = "value" (bullet points in code blocks)
        if not conds:
            bullet_conds = re.findall(r'[•·]\s*([A-Z]\d+)\s*=\s*(.+)', text)
            for q, o in bullet_conds:
                val = o.strip().strip('"«»')
                if ' OU ' in val:
                    val = val.split(' OU ')[0].strip()
                conds.append({"question_id": q, "option_label": clean_label(val)})
        
        # Extract micro-parcours
        # Format 1: déclenche **F1**
        mp_match = re.search(r'déclenche\s+\*\*([A-Z0-9]+)\*\*', text)
        if mp_match:
            mp = mp_match.group(1)
        else:
            # Format 2: **Micro-parcours** : F1 – ...
            mp_match = re.search(r'\*\*Micro-parcours\*\*\s*:\s*([A-Z0-9]+)', text)
            if mp_match:
                mp = mp_match.group(1)
            else:
                # Format 3: Extract from CCC ID (CCC_F1_01 → F1)
                mp_from_id = re.search(r'CCC_([A-Z0-9]+)_', ccc_id)
                mp = mp_from_id.group(1) if mp_from_id else "Unknown"
        
        # Extract clinical meaning
        sens_match = re.search(r'\*\*Sens clinique\*\*\s*:\s*(.+)', text)
        sens = sens_match.group(1).strip() if sens_match else f"Alerte : {name}"
        
        ccc_list.append({
            "id": ccc_id, "name": name, "micro_parcours": mp,
            "conditions": conds, "conditions_source": "legacy",
            "reasoning_source": "ia",
            "sens_clinique": sens,
            "recommendations": {"app_text": sens, "micro_tasks": []}
        })
    return ccc_list

def parse_asr_md(content):
    """Parse ASR file to extract asr_objectif and signatures per micro-parcours"""
    asr = {}
    blocks = re.split(r'###\s+([A-Z0-9]+)\s+[–—-]\s+(.+)', content)
    for i in range(1, len(blocks), 3):
        code, name = blocks[i].strip(), blocks[i+1].strip()
        block_text = blocks[i+2] if i+2 < len(blocks) else ""
        
        # Extract ASR objective - Pattern 1: **Objectif** : ...
        asr_objectif = None
        obj_match = re.search(r'\*\*Objectif\*\*\s*:\s*(.+)', block_text)
        if obj_match:
            asr_objectif = obj_match.group(1).strip()
        else:
            # Pattern 2: **ASR** : "..."
            asr_match = re.search(r'\*\*ASR\*\*\s*:?\s*["«]?([^"»\n]+)["»]?', block_text)
            if asr_match:
                asr_objectif = asr_match.group(1).strip().strip('"«»')
            else:
                # Fallback: quoted text
                quote_match = re.search(r'>\s*"([^"]+)"', block_text)
                if quote_match:
                    asr_objectif = quote_match.group(1).strip()
        
        asr[code] = {
            "name": name,
            "asr_objectif": asr_objectif if asr_objectif else f"Objectif {name}",
            "asr_source": "legacy",
            "signatures": []  # Signatures are parsed separately from global table
        }
    
    # Parse signatures from global table (at end of file)
    # Format: | R1 | R1-A : ... | R1-B : ... |
    sig_table_match = re.findall(r'\|\s*([A-Z0-9]+)\s*\|\s*([^|]+)\|\s*([^|]+)\|', content)
    for mp, sig_a, sig_b in sig_table_match:
        if mp in asr and "---" not in sig_a:
            # Parse signature A
            sig_a_match = re.search(r'([A-Z0-9]+-[A-Z])\s*:\s*(.+)', sig_a.strip())
            if sig_a_match:
                asr[mp]["signatures"].append({
                    "id": sig_a_match.group(1),
                    "condition": sig_a_match.group(2).strip(),
                    "source": "legacy"
                })
            # Parse signature B
            sig_b_match = re.search(r'([A-Z0-9]+-[A-Z])\s*:\s*(.+)', sig_b.strip())
            if sig_b_match:
                asr[mp]["signatures"].append({
                    "id": sig_b_match.group(1),
                    "condition": sig_b_match.group(2).strip(),
                    "source": "legacy"
                })
    
    return asr

def generate_personas(questions):
    personas = [
        {"name": "Nathalie P., 62 ans", "badge": "sain", "desc": "Équilibrée", "mode": 0},
        {"name": "Jean-Pierre L., 72 ans", "badge": "planifie", "desc": "Fragile", "mode": 0},
        {"name": "Sophie M., 45 ans", "badge": "prioritaire", "desc": "Risques", "mode": 1},
        {"name": "Ahmed K., 38 ans", "badge": "critique", "desc": "Isolement", "mode": 2},
        {"name": "Claire D., 34 ans", "badge": "urgent", "desc": "Crise", "mode": 2} # Force last option
    ]
    res = []
    for p in personas:
        responses = {}
        for q in questions:
            opts = q.get("options", [])
            if not opts: 
                responses[q["id"]] = "1"
                continue
            idx = 0
            if p["mode"] == 1: idx = len(opts) // 2
            if p["mode"] == 2: idx = len(opts) - 1
            responses[q["id"]] = opts[idx]["code"]
        res.append({
            "name": p["name"], "priority_badge": p["badge"], "description": p["desc"],
            "ccc_count": 0, "responses": responses
        })
    return res

def main():
    if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)
    
    for vuln in VULNERABILITIES:
        print(f"Generating {vuln['code']}...")
        out_path = os.path.join(OUTPUT_DIR, vuln["code"])
        if not os.path.exists(out_path): os.makedirs(out_path)
        
        base = os.path.join(SOURCE_DIR, vuln["dir"])
        try:
            with open(f"{base}/questions.md") as f: q_data = parse_questions_md(f.read())
            with open(f"{base}/scoring.md") as f: s_data = parse_scoring_md(f.read())
            with open(f"{base}/declencheurs.md") as f: d_data = parse_declencheurs_md(f.read())
            with open(f"{base}/recommendations.md") as f: r_data = parse_recommendations_md(f.read())
            with open(f"{base}/ccc.md") as f: c_data = parse_ccc_md(f.read())
            with open(f"{base}/asr.md") as f: a_data = parse_asr_md(f.read())
        except Exception as e:
            print(f"Error reading/parsing {vuln['code']}: {e}")
            continue
            
        # Post-process Mappings
        # Map Recommendations Labels -> Codes
        final_recos = {}
        for q_id, opts_map in r_data.items():
            q_obj = next((q for q in q_data if q["id"] == q_id), None)
            if not q_obj: continue
            final_recos[q_id] = {}
            for lbl, content in opts_map.items():
                found = "99"
                best_match_score = 0
                for opt in q_obj["options"]:
                    q_lbl = clean_label(opt["label"]).lower()
                    t_lbl = lbl.lower()
                    # 1. Exact
                    if q_lbl == t_lbl: found = opt["code"]; break
                    # 2. Contains
                    if q_lbl in t_lbl or t_lbl in q_lbl: found = opt["code"]; break
                    # 3. Words intersection
                    words_q = set(q_lbl.split())
                    words_t = set(t_lbl.split())
                    score = len(words_q.intersection(words_t))
                    if score > best_match_score and score > 0:
                        best_match_score = score
                        found = opt["code"]
                if found != "99" or best_match_score > 0:
                    final_recos[q_id][found] = content

        # Map Triggers Labels -> Codes
        MAPPING_OVERRIDES = {
            "E6": {"Refuse la plupart du temps": "3"},
            "E2": {"Personne": "4"},
            "N7": {"Aménagement des horaires": "1", "Congés": "2"},
            "O48": {"1 fois par mois ou moins": "3"},
            "N4": {"Oui": "1"}, 
            "E1": {"Je fais presque tout": "3", "seul": "4"},
            "C": {"Objectif": "99"} 
        }

        for key in ["critical_direct", "standard"]:
            for t in d_data[key]:
                q_id = t["question_id"]
                lbl = t.get("option_label", "")
                
                # Check Overrides first
                if q_id in MAPPING_OVERRIDES:
                    for over_k, over_v in MAPPING_OVERRIDES[q_id].items():
                         if over_k.lower() in lbl.lower() or lbl.lower() in over_k.lower():
                             t["option"] = over_v
                             break
                
                if "option" in t: continue

                q_obj = next((q for q in q_data if q["id"] == t["question_id"]), None)
                found = "99"
                if q_obj and t.get("option_label"):
                    lbl = t["option_label"].lower()
                    # Special Case: "ou moins" logic
                    if "ou moins" in lbl and "mois" in lbl:
                         pass 
                    
                    for opt in q_obj["options"]:
                        q_lbl = clean_label(opt["label"]).lower()
                        if q_lbl in lbl or lbl in q_lbl: found = opt["code"]; break
                        # Words check
                        if len(set(q_lbl.split()) & set(lbl.split())) >= 2: found = opt["code"]; break

                t["option"] = found

        # Restructure declencheurs with correct naming
        declencheurs = {
            "critiques_directs": d_data.get("critical_direct", []),
            "ccc": d_data.get("ccc", []),
            "standards": d_data.get("standard", [])
        }
        
        json_data = {
            "metadata": {
                "vulnerability": vuln["code"],
                "name": vuln["name"],
                "version": "2.1",
                "generated_at": datetime.datetime.now().isoformat(),
                "sources": {
                    "questions": "questions.md",
                    "scoring": "scoring.md",
                    "declencheurs": "declencheurs.md",
                    "recommendations": "recommendations.md",
                    "ccc": "ccc.md",
                    "asr": "asr.md"
                }
            },
            "questions": q_data,
            "scoring": s_data,
            "declencheurs": declencheurs,
            "recommendations": final_recos,
            "ccc": c_data,
            "asr": a_data,
            "personas": generate_personas(q_data)
        }
        
        with open(f"{out_path}/simulator_data.json", "w") as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)
        print(f"Written {out_path}/simulator_data.json")

if __name__ == "__main__":
    main()
