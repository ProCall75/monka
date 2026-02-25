# 📁 Checklist Documentaire — Build My Monka

> **18 documents nécessaires pour le build complet d'une app medtech HDS.**
> Séparation entre les docs standard (toute app sérieuse) et les docs spécifiques santé (obligations RGPD/HDS).

---

## 🔵 Docs Standard — Toute App Sérieuse (12)

| # | Document | Responsable | Statut | Quand |
|---|----------|-------------|--------|-------|
| 1 | **PRD** (Product Requirements Document) | PRAGMA | ✅ Fait | Pré-dev |
| 2 | **Document de Contexte** | PRAGMA | ✅ Fait | Pré-dev |
| 3 | **ADR** (Architecture Decision Records) | PRAGMA | 🟡 Ébauché dans le PRD | Pré-dev |
| 4 | **API Spec** (OpenAPI / Swagger) | PRAGMA | 🟡 Ébauché dans le PRD | Pré-dev / Dev |
| 5 | **Deployment Architecture** | PRAGMA + CTO Monka | 🔴 À faire | Pré-dev |
| 6 | **Test Plan** | PRAGMA | 🟡 Ébauché dans le PRD | Dev |
| 7 | **Registre de Dette Technique** | PRAGMA | 🔴 À créer dès J1 | Dev |
| 8 | **Changelog / Version History** | PRAGMA | 🔴 À créer dès J1 | Dev |
| 9 | **Rollback Procedure** | PRAGMA | 🔴 À faire | Pré-prod |
| 10 | **Runbook** (procédures d'exploitation) | PRAGMA + DevOps | 🔴 À faire | Pré-prod |
| 11 | **CGU** (Conditions Générales d'Utilisation) | Juriste Monka | 🔴 À faire | Pré-prod |
| 12 | **Politique de Confidentialité** | Juriste / DPO Monka | 🔴 À faire | Pré-prod |

---

## 🔴 Docs Supplémentaires — Spécifiques Santé / HDS (6)

| # | Document | Responsable | Statut | Source légale |
|---|----------|-------------|--------|---------------|
| 13 | **AIPD** (Analyse d'Impact Protection des Données) | DPO Monka (inputs techniques par PRAGMA) | 🔴 À faire | RGPD Art. 35 + liste CNIL |
| 14 | **Registre des Traitements** (détaillé santé) | DPO Monka | 🔴 À faire | RGPD Art. 30 |
| 15 | **Data Flow Diagram** (flux données de santé) | PRAGMA + CTO Monka | 🔴 À faire | Exigence CNIL pour l'AIPD |
| 16 | **Incident Response Procedure** | DPO + CTO Monka | 🔴 À faire | RGPD Art. 33-34 (notification CNIL 72h) |
| 17 | **Backup & Disaster Recovery Plan** | CTO Monka + PRAGMA | 🔴 À faire | HDS / ISO 27001 (critère Disponibilité DICA) |
| 18 | **Nomination DPO** (doc interne) | Direction Monka | 🔴 À faire | RGPD Art. 37 |

---

## Résumé

```
App sérieuse standard :     12 docs
Supplément santé/HDS :     + 6 docs
                           ────────
Total My Monka :            18 docs
```

- **2 faits** (PRD + Contexte)
- **3 ébauchés** dans le PRD (ADR, API Spec, Test Plan)
- **7 à la charge de PRAGMA**
- **6 à la charge de Monka** (DPO, juriste, CTO)

> Les 6 docs santé ne sont pas des best practices optionnelles — c'est la **loi française** (RGPD + Code de la santé publique Art. L1111-8). Un manquement sur les données de santé peut entraîner des sanctions jusqu'à 4% du CA ou 20M€ (RGPD Art. 83) et jusqu'à 5 ans d'emprisonnement + 300 000€ d'amende (Code de la santé publique).
