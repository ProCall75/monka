# securite.md — Sécurité & Conformité

> **Périmètre** : RLS Supabase, gestion accès, RGPD/HDS, politique de logs, incidents, encryption
> **Ne contient PAS** : architecture app (→ technique.md), schéma DB (→ donnees.md)
> **MAJ** : 3 mars 2026

---

## Principes

| Principe | Application |
|---|---|
| **Défense en profondeur** | RLS + auth + validation côté serveur |
| **Moindre privilège** | Chaque rôle a le minimum d'accès nécessaire |
| **Traçabilité** | Token Guard sur toute modification de data clinique |
| **Pas de credentials dans le code** | Env vars uniquement (.env.local, Vercel env) |

## RLS (Row-Level Security)

| Table | RLS activé | Politique |
|---|---|---|
| Toutes les tables cliniques | ✅ | Lecture seule pour anon, CRUD pour authenticated |
| `content_blocks` | ✅ | Lecture publique, écriture admin |

## Données sensibles

| Donnée | Sensibilité | Protection |
|---|---|---|
| Réponses questionnaire | 🔴 Haute | RLS + pas de PII stockée (anonymisé) |
| Scores de vulnérabilité | 🔴 Haute | Calculés côté client, pas persistés en l'état |
| Seuils / règles | 🟠 Moyenne | Modification via SOP-001 uniquement |
| Content blocks | 🟡 Basse | Contenu public |

## RGPD

| Exigence | Statut | Détail |
|---|---|---|
| **Pas de PII** | ✅ | Le moteur ne stocke pas de données personnelles identifiantes |
| **Anonymisation** | ✅ | Les personas de test sont anonymisés |
| **Droit à l'effacement** | ⚠️ N/A | Pas de données utilisateur persistées actuellement |
| **HDS** | 🔲 À évaluer | Quand patients réels — hébergement de données de santé |

## Procédure d'incident

→ `sops/sop-incident-data.md`

| Niveau | Exemple | Réaction |
|---|---|---|
| 🟡 Mineur | Typo dans un wording | Correction + D-XXX |
| 🟠 Modéré | Seuil mal configuré | SOP-001 + D-XXX + non-régression |
| 🔴 Critique | Data clinique corrompue en prod | SOP-004 + rollback + notification |

---

> **Audit DB** : → `_archive/finish/audit_db.md`
> **Angles morts identifiés** : → `_archive/finish/anglesmorts.md`
