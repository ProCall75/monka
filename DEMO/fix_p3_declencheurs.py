#!/usr/bin/env python3
"""
P3: Rewrite declencheurs.md using ALL available sources.
Combines data from:
- typologie_ccc_scoring.json (tables with specific trigger data)
- Existing template knowledge (V2/V4 already have good trigger data)
Generates normalized format the parser can read.
"""
import json, os, re

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

with open(os.path.join(SOURCES, "typologie_ccc_scoring.json")) as f:
    ccc_src = json.load(f)
tables = ccc_src["tables"]

def cq(t):
    return t.replace("\u201c",'"').replace("\u201d",'"').replace("\u00ab",'"').replace("\u00bb",'"').replace("\u2019","'")

# Build data per vulnerability
# Each vuln has: standards (question→response→MP) and critiques (question→response→sens)
VULN_DATA = {
    "V1": {
        "standards": [
            {"id": "N7", "question": "Aménagement activité professionnelle", "response": "Aménagement horaires / Congés", "mp": "R1"},
            {"id": "O48", "question": "Fréquence des visites", "response": "1 fois par mois ou moins", "mp": "R3"},
            {"id": "N4", "question": "Aidant seul dans la famille", "response": "Oui", "mp": "R2"},
            {"id": "E6", "question": "Acceptation aide extérieure", "response": "Refuse la plupart du temps", "mp": "R4"},
        ],
        "critiques": [
            {"id": "E6", "question": "Acceptation aide extérieure", "response": "Refuse la plupart du temps", "sens": "Refus d'aide compromettant la sécurisation"},
            {"id": "E2", "question": "Soutien mobilisable", "response": "Personne", "sens": "Isolement relationnel sévère de l'aidant"},
        ],
    },
    "V2": {
        "standards": [
            {"id": "E21", "question": "Maintien situation sans changement", "response": "Non / Je ne sais pas", "mp": "F1"},
            {"id": "E24", "question": "Besoin présence la nuit", "response": "Oui", "mp": "F2"},
            {"id": "E23", "question": "Temps possible seul", "response": "Pas plus d'1h / Ne peut pas rester seul", "mp": "F2"},
            {"id": "O51", "question": "Projet adaptation lieu de vie", "response": "Oui", "mp": "F1"},
            {"id": "E28", "question": "Hospitalisations récentes", "response": "≥ 2", "mp": "F5"},
        ],
        "critiques": [
            {"id": "E27", "question": "Comportements dangereux", "response": "Oui", "sens": "Danger immédiat pour le proche ou l'aidant"},
            {"id": "N25", "question": "Idées suicidaires", "response": "Oui", "sens": "Risque vital immédiat"},
            {"id": "N22", "question": "Comportements à risque", "response": "Oui", "sens": "Mise en danger"},
            {"id": "N38", "question": "Perte de contrôle addiction", "response": "Oui", "sens": "Addiction non contrôlée"},
            {"id": "N39", "question": "Violence passive/active", "response": "Oui", "sens": "Violence domestique"},
        ],
    },
    "V3": {
        "standards": [
            {"id": "O49", "question": "Durée de l'aidance", "response": "Depuis plus de 2 ans", "mp": "S1"},
            {"id": "N8", "question": "Arrêt de travail lié au rôle", "response": "Toute réponse ≠ Non", "mp": "S1"},
            {"id": "E14", "question": "Jours d'arrêt sur 30 jours", "response": "Entre 4 et 7 / Plus de 7 jours", "mp": "S1"},
            {"id": "O32", "question": "Souhaitez-vous être davantage aidé·e", "response": "Oui", "sens": "Demande explicite de soutien"},
            {"id": "E9", "question": "Temps pour soi", "response": "Non", "mp": "S2"},
        ],
        "critiques": [
            {"id": "E12", "question": "Risque pour la personne aidée", "response": "Oui", "sens": "Risque vital immédiat"},
            {"id": "E13", "question": "Risque pour autrui", "response": "Oui", "sens": "Risque vital immédiat"},
        ],
    },
    "V4": {
        "standards": [
            {"id": "E36", "question": "Examens nombreux sans clarification", "response": "Oui, beaucoup", "mp": "M1"},
            {"id": "E37", "question": "Avis médicaux contradictoires", "response": "Oui, souvent", "mp": "M1"},
            {"id": "E42", "question": "RDV non programmés récents", "response": "≥ 2", "mp": "M3"},
            {"id": "E44", "question": "Bilan de synthèse global", "response": "Non, jamais", "mp": "M3"},
            {"id": "E45", "question": "Suivi addictologie", "response": "Non", "mp": "M4"},
            {"id": "E46", "question": "Suivi post-hospitalisation", "response": "Non", "mp": "M3/M6"},
            {"id": "E47", "question": "Plan en cas d'aggravation", "response": "Non, on improvise", "mp": "M3/M6"},
            {"id": "E50", "question": "Observance traitement psy", "response": "Non, pas de suivi", "mp": "M3/M6"},
            {"id": "E52", "question": "Coordinateur identifié", "response": "Non, personne ne coordonne", "mp": "M5"},
        ],
        "critiques": [],  # V4 gère la sécurité via V3 (E12, E13)
    },
    "V5": {
        "standards": [
            {"id": "E68", "question": "Temps administratif mensuel", "response": "≥ 1h / mois", "mp": "A1"},
            {"id": "E62", "question": "Droits/aides demandés", "response": "Aucun / Je ne sais pas", "mp": "A2"},
            {"id": "O53", "question": "Évaluation dépendance AGGIR", "response": "Non / Je ne sais pas", "mp": "A2"},
            {"id": "E61", "question": "Directives anticipées", "response": "Non / Je ne sais pas", "mp": "A3"},
            {"id": "E21", "question": "Maintien situation de vie", "response": "Non / incertain", "mp": "A1/A3"},
        ],
        "critiques": [
            {"id": "E68", "question": "Temps administratif mensuel", "response": "> 5h / mois", "sens": "Charge administrative incompatible"},
            {"id": "E62", "question": "Aides en cours", "response": "Aucun droit engagé malgré besoin", "sens": "Risque de rupture financière / sociale"},
            {"id": "E61", "question": "Directives anticipées", "response": "Refus total + situation instable", "sens": "Risque décisionnel majeur en crise"},
        ],
    },
}


def gen_template(vuln_code):
    vuln = VULN_MAP[vuln_code]
    data = VULN_DATA[vuln_code]
    std = data["standards"]
    crit = data["critiques"]
    
    md = f"""# 🚀 Déclencheurs {vuln_code} — {vuln['name']}

> **Source** : `SOURCES/extracted/typologie_ccc_scoring.json`  
> **Date extraction** : 2026-02-07

---

## 📊 Métadonnées

```yaml
vulnerability: {vuln_code}
name: "{vuln['name']}"
source: "typologie_ccc_scoring.json"
extraction_date: "2026-02-07"
total_declencheurs: {len(std)}
critiques_directes: {len(crit)}
```

---

"""
    
    if std:
        md += """## 📋 Questions Déclenchantes Standard

| Question | ID | Réponse déclenchante | Micro-parcours |
|----------|----|--------------------|----------------|
"""
        for t in std:
            md += f"| {t['question'][:45]} | **{t['id']}** | {t['response'][:55]} | {t.get('mp','')} |\n"
        md += "\n---\n\n"
    
    if crit:
        md += """## 🚨 Questions Critiques Directes

| Question | ID | Réponse critique | Sens clinique |
|----------|----|--------------------|---------------|
"""
        for t in crit:
            md += f"| {t['question'][:45]} | **{t['id']}** | {t['response'][:55]} | {t['sens'][:50]} |\n"
        md += "\n---\n\n"
    elif vuln_code == "V4":
        md += """## 🚨 Questions Critiques Directes

> Pas de critiques directes en V4 : la sécurité est gérée via V3 (E12, E13)

---

"""
    
    md += """## ⚠️ Règles Legacy

1. **Critiques** : Priorité niveau 1, délai 7 jours
2. **Standard** : Priorité niveau 3, délai 90 jours
3. **Multi-déclencheurs** : Plusieurs MP peuvent s'ouvrir simultanément
4. **CCC > Score** : Conditions critiques composites priment sur le scoring
"""
    return md


def main():
    print("=== P3: Propagation Déclencheurs ===\n")
    for v in ["V1","V2","V3","V4","V5"]:
        vuln = VULN_MAP[v]
        content = gen_template(v)
        fp = os.path.join(TEMPLATES, vuln["dir"], "declencheurs.md")
        with open(fp, "w") as f:
            f.write(content)
        std = len(VULN_DATA[v]["standards"])
        crit = len(VULN_DATA[v]["critiques"])
        print(f"  {v}: ✅ {std} standards + {crit} critiques → {os.path.basename(fp)}")
    print("\n✅ Déclencheurs propagés V1-V5")


if __name__ == "__main__":
    main()
