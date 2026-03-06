# qualite.md — Standards & Certification

> **Périmètre** : Standards appliqués, certifications, checklist qualité, registre d'anomalies
> **Ne contient PAS** : contenu clinique (→ clinique.md), code (→ technique.md)
> **MAJ** : 3 mars 2026

---

## Standards appliqués

| Standard | Ce qu'on en prend | Statut |
|---|---|---|
| **IEC 62304** | Cycle de vie SW médical : docs structurés, V&V, traçabilité | ⚠️ Aligné (Class A) |
| **ISO 13485** | QMS : contrôle documentaire, revue par les pairs, registre | ⚠️ L'esprit, pas la lettre |
| **ISO 42001** | Management IA : registre décisions, SOPs, provenance code | ✅ Niveau 2 |
| **HAS** | Références cliniques françaises | ✅ Aligné |
| **NIST AI RMF** | Gestion risques IA | ⚠️ Partiel |
| **Marquage CE (MDR)** | Dispositif médical européen | ❌ Pas encore |

## Processus qualité

### Par sprint

Chaque sprint applique les **10 contrôles** définis dans `moteur/_standards/checklist-qualite.md` :
- Q1-Q4 : Contrôles data (intégrité, complétude, cohérence, non-régression)
- Q5-Q7 : Contrôles techniques (build, types, affichage)
- Q8-Q9 : Contrôles cliniques (validation Dr. Monka, sens clinique)
- Q10 : Traçabilité (registre à jour)

### Par décision

Chaque modification de données cliniques → décision tracée (D-XXX) dans `moteur/registre-decisions.md`.
→ Template : `moteur/_templates/tpl-05-decision.md`

### Par sprint report

Fin de sprint → rapport complet utilisant `moteur/_templates/tpl-06-sprint-report.md`.

## SOPs

5 procédures opérationnelles dans `sops/` :

| SOP | Déclencheur |
|---|---|
| SOP-001 : Modification data clinique | Toute modif scoring/règles/MTs/seuils |
| SOP-002 : Validation MP | Début validation d'un MP |
| SOP-003 : Cycle sprint | Début/fin de sprint |
| SOP-004 : Incident data clinique | Bug détecté sur data prod |
| SOP-005 : Déploiement | Push vers production |

---

> **Templates** : → `moteur/_templates/`
> **Checklist qualité** : → `moteur/_standards/checklist-qualite.md`
