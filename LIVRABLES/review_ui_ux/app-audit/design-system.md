# Monka — Design System v2 (Wellness Premium)

> **Patte** : App wellness thérapeutique inspirée des meilleures apps santé mentale.
> Fond crème chaud, pastels doux, typo expressive, formes organiques.
> Zéro technologique — tout est chaleureux, rassurant, humain.

## 1. Palette de Base

| Token | Valeur | Usage |
|---|---|---|
| `--bg-warm` | `#F8F4EF` | Fond principal (crème chaud) |
| `--bg-warm-darker` | `#EDE8E1` | Sections secondaires |
| `--surface` | `#FFFFFF` | Cartes, inputs |
| `--surface-soft` | `rgba(255,255,255,0.85)` | Cartes translucides |
| `--text-primary` | `#2D2A26` | Texte principal (brun foncé, pas noir) |
| `--text-secondary` | `#8A857E` | Texte secondaire (brun clair) |
| `--text-muted` | `#B8B3AB` | Labels, placeholders |

## 2. Pastels par Thème de Vie

| Thème | Couleur Card BG | Couleur Accent | Gradient |
|---|---|---|---|
| Vie sociale (R) | `#F3EFF8` | `#8B5CF6` (violet) | `from-violet-100 to-purple-50` |
| Démarches (A) | `#EEF2FF` | `#6366F1` (indigo) | `from-indigo-100 to-blue-50` |
| Votre santé (S) | `#FDF2F4` | `#E8617A` (rose) | `from-rose-100 to-pink-50` |
| Votre proche (F) | `#FEF7EC` | `#E5953E` (ambre) | `from-amber-100 to-orange-50` |
| Parcours soins (M) | `#ECFDF5` | `#34C88A` (émeraude) | `from-emerald-100 to-teal-50` |

## 3. Typographie

**Font** : Inter (Variable)

| Rôle | Taille | Poids | Tracking | Couleur |
|---|---|---|---|---|
| Hero number | `3rem` (48px) | 700 | `-0.04em` | `--text-primary` |
| Page greeting | `1.5rem` (24px) | 700 | `-0.02em` | `--text-primary` |
| Card title | `1rem` (16px) | 600 | `-0.01em` | `--text-primary` |
| Card subtitle | `0.8125rem` (13px) | 500 | normal | `--text-secondary` |
| Section label | `0.6875rem` (11px) | 600 | `0.06em` uppercase | `--text-muted` |
| Body | `0.875rem` (14px) | 400 | normal | `--text-secondary` |

## 4. Rayons & Formes

| Élément | Radius | Note |
|---|---|---|
| Carte principale | `24px` | Très arrondi, organique |
| Carte secondaire | `20px` | |
| Bouton/Pill | `9999px` | Full rounded |
| Input | `16px` | Doux |
| Avatar/Ring | `50%` | Circulaire |
| Bottom Nav | `28px` | Pill flottante |

## 5. Ombres

| Intensité | Valeur | Usage |
|---|---|---|
| Subtile | `0 2px 8px rgba(45,42,38,0.04)` | Cartes au repos |
| Moyenne | `0 4px 16px rgba(45,42,38,0.06)` | Cartes hover/actives |
| Forte | `0 8px 32px rgba(45,42,38,0.08)` | Modals, nav flottante |
| Nav | `0 -4px 24px rgba(45,42,38,0.06)` | Bottom nav (vers le haut) |

## 6. Bottom Nav (Dark Pill)

- Background : `#2D2A26` (brun foncé, pas noir pur)
- Icônes inactifs : `rgba(255,255,255,0.5)`
- Icône actif : `#FFFFFF`
- Indicator : pastille pleine blanche derrière l'icône
- Height : `56px` | Border-radius : `28px`
- Position : fixed bottom, margin `16px`

## 7. Animations (Framer Motion)

| Type | Config | Usage |
|---|---|---|
| Entrée stagger | `staggerChildren: 0.06` | Liste de cartes |
| Carte apparition | `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` | Chaque carte |
| Checkbox check | `scale: [1, 1.2, 1]` + spring | Satisfaction au tap |
| Ring progress | `duration: 0.8, ease: "easeOut"` | Mise à jour anneau |
| Page transition | `{ opacity: 0 } → { opacity: 1 }` over `0.3s` | Entre écrans |
