"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, ArrowRight, ArrowsClockwise, PaperPlaneRight, Smiley, Heart, Users as UsersIcon, ChatCircle, BookOpen, Phone, Star, ShieldCheck, MoonStars, Translate, Info, SignOut, HandHeart, FirstAid, ClipboardText, Lock, Check, MagnifyingGlass, MapPin, CaretDown, CaretUp, FileText, Lightbulb, PhoneCall, CheckCircle, Circle, ArrowSquareOut, List, CalendarCheck, CalendarPlus, User, Bell, Question, Moon, Sun, Lightning } from '@phosphor-icons/react';
import { professionals, PRO_CATEGORIES, type Professional } from '../data/pro-finder-data';
import { actionableAdvices, type ActionableAdvice } from '../data/actionable-advice-data';
import { ProductTour } from '../components/molecules/ProductTour';
import { PricingCard, MONKA_PLANS } from '../components/molecules/PricingCard';

// Dynamic import for Leaflet map (SSR-safe)
const ProMap = dynamic(() => import('./ProMap'), { ssr: false, loading: () => <div className="w-full h-[280px] rounded-[20px] bg-[#F3F4F6] animate-pulse" /> });

// ── Components ──
import { Header } from '../components/molecules/Header';


import { HeroCard } from '../components/molecules/HeroCard';
import { ProgressCard } from '../components/molecules/ProgressCard';
import { TaskCard } from '../components/molecules/TaskCard';
import { MicroTaskItem } from '../components/molecules/MicroTaskItem';
import { ResourceCard } from '../components/molecules/ResourceCard';
import { RecoCard } from '../components/molecules/RecoCard';
import { ProfileCard } from '../components/molecules/ProfileCard';
import { SettingsRow, SettingsSection } from '../components/molecules/SettingsRow';
import { StatCard } from '../components/molecules/StatCard';
import { TimelineStep } from '../components/molecules/TimelineStep';
import { BottomNavPill } from '../components/nav/BottomNavPill';
import { ScoreRing } from '../components/atoms/ScoreRing';
import { ThemeButton } from '../components/atoms/ThemeButton';

// ── Data ──
import { kernelMock, mockVulnerabilities, mockUser } from '../data/kernel-mock';
import { ThemeColors, UrgencyConfig, type VulnerabilityDomain, type Vulnerability, type MicroParcours, type Recommendation, type RecoCategory, type Criticality } from '../data/kernel-types';

// Dark mode context
const DarkModeContext = React.createContext<{ isDark: boolean; toggle: () => void }>({ isDark: false, toggle: () => { } });

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type TabId = 'home' | 'monsuivi' | 'chat' | 'community' | 'resources';

type Screen =
    | { type: 'tab'; tab: TabId }
    | { type: 'themeDetail'; vulnerability: Vulnerability }
    | { type: 'programDetail'; vulnerability: Vulnerability; program: MicroParcours }
    | { type: 'recoDetail'; vulnerability: Vulnerability; program: MicroParcours; recommendation: Recommendation; category: RecoCategory }
    | { type: 'articleReader'; article: Article }
    | { type: 'guideDetail'; guide: ActionableAdvice };

/* ═══════════════════════════════════════════════════════
   BACK BUTTON (shared)
═══════════════════════════════════════════════════════ */
const BackButton = ({ onBack, label = 'Retour' }: { onBack: () => void; label?: string }) => (
    <button
        onClick={onBack}
        className="flex items-center gap-2 text-[14px] font-medium text-[#8E8E93] mb-4 hover:text-[#1A1A2E] transition-colors active:scale-95"
    >
        <ArrowLeft size={18} weight="bold" />
        {label}
    </button>
);

/* ═══════════════════════════════════════════════════════
   ARTICLE DATA
═══════════════════════════════════════════════════════ */
interface Article {
    id: string;
    title: string;
    description: string;
    category: string;
    domain: VulnerabilityDomain;
    readingTime: number;
    imageUrl: string;
    content: string;
}

const RESOURCE_CATEGORIES = ['Comprendre', 'Bien-être', 'Démarches', 'Vie quotidienne'] as const;

const articles: Article[] = [
    /* ── COMPRENDRE ── */
    {
        id: 'art-1',
        title: "Comprendre la maladie d'Alzheimer",
        description: "Les bases pour mieux accompagner votre proche au quotidien.",
        category: 'Comprendre',
        domain: 'S' as VulnerabilityDomain,
        readingTime: 8,
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=200&fit=crop',
        content: `La maladie d'Alzheimer touche environ 900 000 personnes en France. En tant qu'aidant, comprendre les mécanismes de cette maladie vous permet de mieux anticiper les comportements de votre proche et d'adapter votre accompagnement.

    ** Les 3 stades principaux:**

        1. ** Stade léger ** — Oublis fréquents, difficulté à trouver les mots.Votre proche reste autonome pour la plupart des activités.C'est le moment idéal pour mettre en place une routine rassurante.

2. ** Stade modéré ** — Besoin d'aide pour les tâches complexes (finances, cuisine). La communication devient plus difficile. Privilégiez les phrases courtes et le contact visuel.

3. ** Stade avancé ** — Assistance nécessaire pour les gestes du quotidien.La présence et le toucher deviennent les principaux moyens de communication.

** Ce que vous pouvez faire dès maintenant:**
    - Établir une routine quotidienne prévisible
        - Étiqueter les tiroirs et placards avec des mots ET des images
            - Garder des photos de famille accessibles pour stimuler la mémoire
                - Parler lentement, avec des phrases simples et positives

                    > L'aidant n'a pas besoin d'être parfait — il a besoin d'être soutenu.`,
    },
    {
        id: 'art-5',
        title: "Maladie de Parkinson : ce qu'il faut savoir",
        description: "Symptômes, évolution et conseils pratiques pour le quotidien.",
        category: 'Comprendre',
        domain: 'S' as VulnerabilityDomain,
        readingTime: 7,
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=200&fit=crop',
        content: `La maladie de Parkinson est la deuxième maladie neurodégénérative la plus fréquente en France, après Alzheimer.Elle touche environ 270 000 personnes.Contrairement aux idées reçues, elle ne se résume pas aux tremblements.

** Les symptômes principaux:**
- ** Tremblements au repos ** — Souvent un seul côté au début.Ils diminuent pendant le mouvement.
- ** Rigidité musculaire ** — Raideurs dans les bras, les jambes, le cou.Votre proche peut sembler « figé ».
- ** Lenteur des mouvements(bradykinésie) ** — Les gestes du quotidien deviennent plus longs: boutonner une chemise, se lever d'une chaise.
    - ** Troubles de l'équilibre** — Risque de chutes accru, surtout dans les espaces encombrés.

        ** Les symptômes souvent méconnus:**
            - Troubles du sommeil(cauchemars agités, somnolence)
                - Perte de l'odorat
                    - Constipation chronique
                        - Dépression et anxiété(chez 40 % des patients)
                            - Voix plus faible et monotone

                                ** Comment adapter le quotidien:**
                                    - Proposer des vêtements à fermeture velcro ou à boutons - pression
                                        - Installer des barres d'appui dans la salle de bain et les couloirs
                                            - Encourager la marche quotidienne — même 15 min font la différence
                                                - Adapter les repas: aliments faciles à mâcher, couverts ergonomiques
                                                    - Respecter les « moments ON » (quand le traitement fait effet) pour les activités

                                                        > Chaque journée avec Parkinson est différente.S'adapter, c'est le plus beau geste d'accompagnement.`,
    },
    {
        id: 'art-6',
        title: "Perte d'autonomie liée à l'âge : les signes à surveiller",
        description: "Comment détecter les premiers signes et réagir à temps.",
        category: 'Comprendre',
        domain: 'S' as VulnerabilityDomain,
        readingTime: 6,
        imageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=200&fit=crop',
        content: `La perte d'autonomie ne survient pas du jour au lendemain. Elle s'installe progressivement, et les premiers signes passent souvent inaperçus — surtout quand on voit son parent régulièrement.

**Les 10 signaux d'alerte :**

1. **Le frigo** — Aliments périmés, frigo vide ou au contraire en surstock d'un même produit
2. **Le courrier** — Factures non ouvertes, courriers empilés, amendes imprévues
3. **L'hygiène** — Vêtements portés plusieurs jours, odeur corporelle inhabituelle
4. **Les repas** — Perte de poids, repas sautés, alimentation déséquilibrée
5. **La maison** — Désordre inhabituel, ménage non fait, poubelles pleines
6. **Le quotidien** — Oublis de rendez-vous, difficultés avec les nouvelles technologies
7. **La conduite** — Accrochages, amendes, anxiété au volant
8. **L'isolement** — Moins d'appels, sorties réduites, amis qui s'éloignent
9. **Les médicaments** — Oublis de prise, confusion entre les traitements
10. **L'humeur** — Irritabilité, tristesse, perte d'intérêt pour les activités habituelles

**Que faire si vous repérez ces signes ?**
- Ne pas paniquer : la perte d'autonomie est progressive et des solutions existent
- En parler avec le médecin traitant de votre proche (avec son accord)
- Contacter le CLIC ou la MAIA de votre département pour un bilan
- Demander une évaluation GIR si besoin d'aide structurée

> Repérer tôt, c'est pouvoir agir avant la crise. Vous n'avez pas besoin d'attendre que « ça empire ».`,
    },

    /* ── BIEN-ÊTRE ── */
    {
        id: 'art-2',
        title: '5 techniques pour gérer le stress',
        description: 'Des exercices simples pour prendre soin de vous.',
        category: 'Bien-être',
        domain: 'R' as VulnerabilityDomain,
        readingTime: 5,
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop',
        content: `En tant qu'aidant, vous êtes exposé à un stress chronique qui peut affecter votre santé physique et mentale. Voici 5 techniques validées scientifiquement que vous pouvez pratiquer en moins de 5 minutes.

**1. La respiration 4-7-8**
Inspirez par le nez pendant 4 secondes. Retenez pendant 7 secondes. Expirez lentement par la bouche pendant 8 secondes. Répétez 3 fois. Cet exercice active votre système nerveux parasympathique et réduit le cortisol.

**2. La technique du grounding (ancrage)**
Identifiez : 5 choses que vous voyez, 4 que vous touchez, 3 que vous entendez, 2 que vous sentez, 1 que vous goûtez. Cette technique vous ramène dans le moment présent.

**3. Le journaling express**
Écrivez pendant 3 minutes sans vous arrêter. Ne cherchez pas la perfection — laissez sortir ce que vous ressentez. Des études montrent que cette pratique réduit l'anxiété de 30%.

**4. La marche de 10 minutes**
Une courte marche, même autour du pâté de maisons, libère des endorphines. Si possible, marchez dans un espace vert.

**5. Le scan corporel**
Allongez-vous et portez attention à chaque partie de votre corps, des pieds à la tête. Relâchez consciemment chaque tension. 5 minutes suffisent.

> Prendre soin de vous n'est pas un luxe — c'est une nécessité pour bien accompagner votre proche.`,
    },
    {
        id: 'art-7',
        title: 'Mieux dormir quand on est aidant',
        description: "Le sommeil perturbé : comprendre et agir concrètement.",
        category: 'Bien-être',
        domain: 'R' as VulnerabilityDomain,
        readingTime: 6,
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop',
        content: `72% des aidants déclarent mal dormir. Les réveils nocturnes de votre proche, l'anxiété et la charge mentale transforment vos nuits en épreuves. Pourtant, un mauvais sommeil empire tout : patience, humeur, santé.

**Pourquoi votre sommeil est perturbé :**
- **L'hyper-vigilance** — Même endormi, votre cerveau « surveille » votre proche
- **La charge mentale** — Votre esprit continue de planifier (rendez-vous, courses, traitements)
- **Les réveils nocturnes** — Si votre proche se lève ou vous appelle la nuit
- **Le cortisol élevé** — Le stress chronique dérègle votre horloge biologique

**7 stratégies qui fonctionnent :**

1. **Le rituel des 30 minutes** — 30 min avant le coucher : pas d'écran, lumière tamisée, tisane ou lecture. Ce signal dit à votre cerveau : « c'est fini pour aujourd'hui ».

2. **La liste du lendemain** — Écrivez vos 3 priorités du lendemain avant de dormir. Votre cerveau peut arrêter de « tourner ».

3. **La chambre sanctuaire** — Température idéale : 18-19°C. Obscurité totale. Aucun rappel de votre rôle d'aidant dans cette pièce.

4. **La micro-sieste** — Si la nuit a été courte : 15-20 minutes max, avant 15h. Pas plus, sinon vous casserez le cycle.

5. **Le soutien nocturne** — Si votre proche se réveille souvent : organisez un roulement avec la famille ou un service d'aide de nuit (finançable par l'APA).

6. **L'activité physique** — 30 min de mouvement dans la journée améliore le sommeil de 65%. Pas après 19h.

7. **Le suivi médical** — Si vos troubles durent plus de 3 semaines, consultez. Vous avez le droit de dormir.

> Le sommeil n'est pas un luxe. C'est le socle sur lequel repose tout le reste.`,
    },
    {
        id: 'art-8',
        title: 'Bouger au quotidien sans culpabiliser',
        description: 'Intégrer une activité physique même avec un emploi du temps chargé.',
        category: 'Bien-être',
        domain: 'R' as VulnerabilityDomain,
        readingTime: 4,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
        content: `« Je n'ai pas le temps de faire du sport. » C'est la phrase que prononcent 9 aidants sur 10. Et c'est vrai — votre emploi du temps est déjà saturé. Mais bouger ne veut pas dire « faire du sport ».

**La règle des 10 minutes :**
Les études sont formelles : 10 minutes d'activité physique modérée par jour suffisent pour réduire le stress de 25%, améliorer la qualité du sommeil et renforcer votre système immunitaire.

**Intégrer le mouvement à votre routine d'aidant :**

- **Pendant les courses** — Garez-vous plus loin, prenez les escaliers au lieu de l'ascenseur
- **Avec votre proche** — Une marche de 10 min autour du pâté de maisons fait du bien aux deux
- **Pendant les temps d'attente** — Étirements dans la salle d'attente du médecin, squats pendant que le café chauffe
- **Le matin** — 5 min d'étirements doux avant que la journée ne commence. YouTube regorge de vidéos « morning stretch 5 min »

**Les 3 exercices de l'aidant :**

1. **Le mur** — Appuyez votre dos contre un mur, descendez en position assise pendant 30 secondes. Renforce les jambes (utile pour les transferts de votre proche).

2. **Les épaules** — Montez vos épaules jusqu'aux oreilles, maintenez 5 secondes, relâchez d'un coup. Répétez 5 fois. Libère la tension du cou et des épaules.

3. **La marche consciente** — Pendant 5 minutes, concentrez-vous sur chaque pas. Sentez le contact du pied avec le sol. C'est à la fois du sport ET de la méditation.

> Votre corps est votre outil principal. En prendre soin, c'est assurer la durabilité de votre accompagnement.`,
    },

    /* ── DÉMARCHES ── */
    {
        id: 'art-3',
        title: "Vos droits en tant qu'aidant",
        description: 'Congés, aides financières, et dispositifs légaux.',
        category: 'Démarches',
        domain: 'A' as VulnerabilityDomain,
        readingTime: 12,
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
        content: `La loi française reconnaît le statut d'aidant depuis 2015. Voici un guide complet de vos droits et des aides disponibles.

**Le congé de proche aidant**
Vous pouvez cesser temporairement votre activité professionnelle pour accompagner votre proche. Durée : jusqu'à 3 mois, renouvelable dans la limite d'1 an. Depuis 2020, ce congé est indemnisé à hauteur de ~60€/jour.

**L'APA (Allocation Personnalisée d'Autonomie)**
Votre proche peut bénéficier de l'APA pour financer une aide à domicile, des fournitures, ou un accueil de jour. Montant : jusqu'à 1 800€/mois selon le degré de dépendance (GIR 1 à 4).

**Le droit au répit**
Depuis 2016, les aidants peuvent bénéficier d'une aide pouvant aller jusqu'à 509€/an pour financer un hébergement temporaire ou un accueil de jour pour leur proche, afin de prendre du temps pour eux.

**Les aides fiscales**
- Crédit d'impôt de 50% pour l'emploi d'une aide à domicile
- Déduction fiscale pour hébergement en EHPAD
- Exonération de charges sociales pour les aidants familiaux salariés

**Comment en bénéficier ?**
1. Contactez le CLIC (Centre Local d'Information et de Coordination) de votre département
2. Demandez une évaluation GIR auprès du Conseil départemental
3. Constituez votre dossier APA avec les pièces justificatives

> Monka vous accompagne dans chaque démarche — étape par étape.`,
    },
    {
        id: 'art-9',
        title: "APA et MDPH : le guide complet",
        description: 'Deux dispositifs essentiels pour financer l\'aide à votre proche.',
        category: 'Démarches',
        domain: 'A' as VulnerabilityDomain,
        readingTime: 10,
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
        content: `L'APA et la MDPH sont deux piliers du financement de l'aide. Pourtant, la plupart des aidants ne savent pas quelle démarche concerne leur situation. Voici comment y voir clair.

**APA (Allocation Personnalisée d'Autonomie)**
Pour les personnes de 60 ans et plus en perte d'autonomie.
- **Qui la demande ?** Votre proche (ou vous, en son nom avec son accord)
- **À qui ?** Au Conseil départemental de son lieu de résidence
- **Montant ?** De 700€ à 1 800€/mois selon le degré de dépendance (GIR)
- **Délai ?** 2 mois en moyenne pour l'évaluation + la décision
- **Ce qu'elle finance ?** Aide à domicile, portage de repas, accueil de jour, fournitures, téléassistance

**MDPH (Maison Départementale des Personnes Handicapées)**
Pour les personnes de moins de 60 ans en situation de handicap — OU pour la PCH en complément.
- **PCH (Prestation de Compensation du Handicap)** — Peut financer une aide humaine, technique, ou l'aménagement du logement
- **La carte d'invalidité/priorité** — Donne accès aux places réservées et à certaines exonérations
- **L'AAH** — Allocation adulte handicapé, sous conditions de ressources

**Comment choisir ?**
- Votre proche a **+ de 60 ans** → APA en priorité
- Votre proche a **- de 60 ans** → MDPH obligatoire
- Votre proche a **+ de 60 ans ET un handicap reconnu avant 60 ans** → Il peut choisir entre APA et PCH

**Astuce Monka :** Vous pouvez cumuler l'APA avec le droit au répit et le crédit d'impôt emploi à domicile. Contactez votre CCAS pour un accompagnement personnalisé.

> Ne faites pas les démarches seul·e. Votre CLIC ou CCAS peut constituer votre dossier avec vous, gratuitement.`,
    },
    {
        id: 'art-10',
        title: 'Le congé de proche aidant expliqué',
        description: 'Tout savoir sur ce droit méconnu des salariés aidants.',
        category: 'Démarches',
        domain: 'A' as VulnerabilityDomain,
        readingTime: 5,
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop',
        content: `Depuis 2020, le congé de proche aidant est indemnisé. Pourtant, seuls 5% des aidants éligibles en font la demande. Pourquoi ? Parce qu'ils ne savent pas qu'il existe, ou pensent ne pas y avoir droit.

**Les conditions :**
- Être salarié, fonctionnaire, indépendant ou demandeur d'emploi
- Accompagner un proche avec un taux d'incapacité ≥ 80% OU classé GIR 1 à 3
- Le proche peut être : parent, conjoint, enfant, frère/sœur, ou même un ami proche

**La durée :**
- 3 mois renouvelables, dans la limite de 1 an sur toute la carrière
- Le congé peut être fractionné (par demi-journées) ou transformé en temps partiel

**L'indemnisation (AJPA) :**
- ~63€/jour pour une personne seule, ~53€/jour pour une personne en couple
- Versée par la CAF, dans la limite de 66 jours sur toute la carrière
- Non cumulable avec les congés payés ou arrêts maladie

**Comment en faire la demande :**
1. Informer votre employeur par courrier recommandé (1 mois avant)
2. Joindre un justificatif de la situation de votre proche (notification MDPH ou évaluation GIR)
3. Demander l'AJPA auprès de votre CAF (formulaire cerfa n°16108*01)

**Vos protections :**
- Votre employeur ne peut pas refuser le congé
- Votre poste est conservé à votre retour
- Le congé est assimilé à du temps de travail effectif pour l'ancienneté et la retraite

> 63€/jour, ce n'est pas beaucoup. Mais combiné avec l'APA et le droit au répit, cela peut vous permettre de souffler le temps qu'il faut.`,
    },

    /* ── VIE QUOTIDIENNE ── */
    {
        id: 'art-4',
        title: 'Aménager le domicile en toute sécurité',
        description: 'Guide pratique pour prévenir les chutes et accidents.',
        category: 'Vie quotidienne',
        domain: 'F' as VulnerabilityDomain,
        readingTime: 6,
        imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=200&fit=crop',
        content: `Les chutes sont la première cause d'accidents domestiques chez les personnes âgées. Un aménagement adapté du domicile peut réduire ce risque de 60%.

**La salle de bain (zone n°1 de risque)**
- Installer des barres d'appui près de la douche et des toilettes
- Remplacer la baignoire par une douche à l'italienne avec siège
- Poser un tapis antidérapant et un rehausseur de WC
- S'assurer que l'eau chaude ne dépasse pas 40°C

**Les escaliers**
- Main courante des deux côtés, solidement fixée
- Nez de marche antidérapants et contrastés
- Éclairage automatique (détecteur de mouvement)
- Monte-escalier si la mobilité est réduite

**Les sols**
- Supprimer tous les tapis non fixés
- Fixer les câbles électriques le long des murs
- Préférer un sol mat et non glissant

**L'éclairage**
- Veilleuses dans les couloirs et la chambre
- Interrupteurs lumineux et accessibles
- Pas de zones d'ombre dans les passages fréquents

**Les aides financières pour l'aménagement**
L'ANAH (Agence Nationale de l'Habitat) peut financer jusqu'à 50% des travaux d'adaptation. Le crédit d'impôt couvre 25% des dépenses d'équipement (plafonné à 5 000€).

> Un domicile bien aménagé, c'est un proche en sécurité et un aidant plus serein.`,
    },
    {
        id: 'art-11',
        title: 'Bien nourrir une personne âgée dépendante',
        description: 'Recettes adaptées, textures modifiées et astuces du quotidien.',
        category: 'Vie quotidienne',
        domain: 'F' as VulnerabilityDomain,
        readingTime: 7,
        imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=200&fit=crop',
        content: `La dénutrition touche 1 personne âgée sur 3 vivant à domicile. Quand on est aidant, préparer des repas adaptés peut devenir un vrai casse-tête — surtout si votre proche a des troubles de la déglutition ou peu d'appétit.

**Les signaux de dénutrition à surveiller :**
- Perte de poids ≥ 5% en 1 mois ou ≥ 10% en 6 mois
- Vêtements devenus trop grands
- Fatigue inhabituelle, chutes plus fréquentes
- Assiettes souvent rendues pleines

**Les 5 règles d'or :**

1. **Fractionner les repas** — 5 à 6 petits repas par jour plutôt que 3 gros. Proposez des collations riches entre les repas (yaourt, fromage, noix).

2. **Enrichir naturellement** — Ajoutez de la crème, du beurre, du fromage râpé, de la poudre de lait dans les purées et les soupes. Chaque cuillère doit compter.

3. **Adapter les textures** — Si la mastication ou la déglutition est difficile : textures mixées lisses, crèmes, flans, mousses. Pas de double texture (liquide + solide).

4. **Rendre le repas plaisant** — Jolies couleurs dans l'assiette, vaisselle contrastée, repas pris ensemble si possible. Le plaisir compte autant que la nutrition.

5. **Hydrater, hydrater, hydrater** — Les personnes âgées ne ressentent plus la soif. Proposez de l'eau régulièrement, mais aussi : compotes, bouillons, glaces, fruits gorgés d'eau.

**Idées de collations enrichies :**
- Smoothie : lait + banane + beurre de cacahuète + miel
- Crème au chocolat maison avec un œuf entier
- Tartine de fromage frais et confiture
- Yaourt grec + fruits coupés fin + granola moulu

> L'alimentation, c'est aussi du lien. Manger ensemble, même un petit goûter, c'est un moment de partage essentiel.`,
    },
    {
        id: 'art-12',
        title: 'Communiquer avec un proche qui perd la mémoire',
        description: 'Adapter ses mots, ses gestes et sa posture pour garder le lien.',
        category: 'Vie quotidienne',
        domain: 'F' as VulnerabilityDomain,
        readingTime: 5,
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop',
        content: `Quand votre proche perd la mémoire, la communication change — mais elle ne disparaît pas. Elle demande simplement un autre langage. Voici comment maintenir le lien, même quand les mots manquent.

**Ce qui ne fonctionne plus :**
- « Tu ne te souviens pas ? On en a parlé hier. » → Crée de la frustration et de la honte
- « Non, ce n'est pas comme ça ! » → Provoque de l'agitation
- « Pourquoi tu fais ça ? » → Votre proche ne sait pas pourquoi. La question l'angoisse.
- Parler entre adultes devant lui/elle comme s'il/elle n'était pas là

**Ce qui fonctionne :**

1. **Entrer dans son monde** — Si votre proche croit être chez ses parents, ne corrigez pas. Demandez plutôt : « Et comment c'est, chez tes parents ? ». C'est ce qu'on appelle la validation.

2. **Les phrases simples** — Une idée par phrase. « On va manger. » Pas : « Allez, viens, on va aller manger parce qu'après on a le médecin et il ne faut pas être en retard. »

3. **Le toucher** — Avant de parler, un contact doux (main, épaule) aide votre proche à se concentrer sur vous. Le toucher reste compris très tard dans la maladie.

4. **Les yeux** — Mettez-vous à la même hauteur. Le contact visuel rassure et capte l'attention.

5. **La musique** — Les souvenirs musicaux résistent plus longtemps que les autres. Chantez ensemble, passez les musiques de sa jeunesse. C'est souvent magique.

6. **Les photos** — Pas « qui est-ce ? » (trop de pression) mais « regarde cette photo, elle est belle ». Laissez votre proche raconter ce qu'il voit.

**Ce qu'il faut se rappeler :**
Votre proche ne « fait pas exprès ». Ses comportements sont des symptômes, pas des choix. Et même quand les mots partent, les émotions restent. Votre présence, votre voix, votre chaleur — il/elle les ressent toujours.

> La communication n'est pas que des mots. Un regard, une main serrée, une chanson fredonnée — c'est ça, rester connecté.`,
    },
];

/* ═══════════════════════════════════════════════════════
   ARTICLE READER SCREEN
═══════════════════════════════════════════════════════ */
const ArticleReaderScreen = ({ article, onBack }: { article: Article; onBack: () => void }) => {
    return (
        <>
            <BackButton onBack={onBack} label="Ressources" />

            {/* Hero image */}
            <div className="-mx-6 mb-6 h-[180px] overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#E8F4F8] rounded-full text-[11px] font-semibold text-[#2C8C99]">
                    {article.category}
                </span>
                <span className="text-[12px] text-[#C8CCD0]">{article.readingTime} min de lecture</span>
            </div>

            {/* Title */}
            <h1 className="text-[22px] font-bold text-[#1A1A2E] leading-tight mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {article.title}
            </h1>

            {/* Content */}
            <div className="prose-sm text-[14px] text-[#4A4A5A] leading-relaxed space-y-4">
                {article.content.split('\n\n').map((paragraph, i) => {
                    // Handle bold headers
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                        return <h3 key={i} className="text-[16px] font-bold text-[#1A1A2E] mt-6 mb-2">{paragraph.replace(/\*\*/g, '')}</h3>;
                    }
                    // Handle blockquotes
                    if (paragraph.startsWith('>')) {
                        return (
                            <div key={i} className="bg-[#E8F4F8] border-l-4 border-[#2C8C99] rounded-r-[12px] p-4 mt-4">
                                <p className="text-[14px] text-[#1A1A2E] font-medium">{paragraph.replace(/^>\s*/, '')}</p>
                            </div>
                        );
                    }
                    // Handle numbered lists
                    if (paragraph.match(/^\d\./)) {
                        return (
                            <div key={i} className="space-y-3">
                                {paragraph.split('\n').map((line, j) => (
                                    <p key={j} className="text-[14px] text-[#4A4A5A] leading-relaxed">
                                        {line.replace(/\*\*/g, '').replace(/^- /, '• ')}
                                    </p>
                                ))}
                            </div>
                        );
                    }
                    return (
                        <p key={i} className="text-[14px] text-[#4A4A5A] leading-relaxed">
                            {paragraph.split('**').map((part, j) =>
                                j % 2 === 1 ? <strong key={j} className="text-[#1A1A2E] font-semibold">{part}</strong> : part
                            )}
                        </p>
                    );
                })}
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   GUIDE DETAIL SCREEN
═══════════════════════════════════════════════════════ */
const GuideDetailScreen = ({ guide, onBack, onNavigateToProCategory }: { guide: ActionableAdvice; onBack: () => void; onNavigateToProCategory?: (contactName?: string) => void }) => {
    const priorityConfig: Record<string, { bg: string; text: string; label: string }> = {
        urgent: { bg: '#FEF3C7', text: '#D97706', label: 'À faire rapidement' },
        recommended: { bg: '#E8F4F8', text: '#2C8C99', label: 'Conseillé' },
        optional: { bg: '#F3F4F6', text: '#6B7280', label: 'Quand vous êtes prêt·e' },
    };
    const pc = priorityConfig[guide.priority] || priorityConfig.recommended;

    return (
        <>
            <BackButton onBack={onBack} label="Ressources" />

            {/* Guide header */}
            <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D6EDF0] rounded-[20px] p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: pc.bg, color: pc.text }}
                    >
                        {pc.label}
                    </span>
                    <span className="text-[11px] text-[#8E8E93]">⏱ {guide.estimatedTime}</span>
                </div>
                <h1 className="text-[20px] font-bold text-[#1A1A2E] leading-tight mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {guide.title}
                </h1>
                <p className="text-[13px] text-[#6B7280]">{guide.subtitle}</p>
            </div>

            {/* Steps */}
            <div className="mb-6">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                    Étapes · {guide.steps.length}
                </h2>
                <div className="space-y-3">
                    {guide.steps.map(step => (
                        <div key={step.order} className="bg-white rounded-[14px] border border-[#E5E5EA] p-3.5">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    {step.isDone
                                        ? <CheckCircle size={20} weight="fill" className="text-[#1A6B5A]" />
                                        : <Circle size={20} weight="regular" className="text-[#D1D5DB]" />
                                    }
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[13px] font-semibold leading-tight ${step.isDone ? 'text-[#1A6B5A] line-through' : 'text-[#1A1A2E]'}`}>
                                        {step.order}. {step.text}
                                    </p>
                                    {step.detail && (
                                        <p className="text-[12px] text-[#6B7280] mt-1.5 leading-relaxed">{step.detail}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Documents */}
            {guide.documents.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">Documents nécessaires</h2>
                    <div className="bg-[#FFFBEB] rounded-[14px] p-3.5">
                        {guide.documents.map((doc, i) => (
                            <div key={i} className="flex items-center gap-2.5 py-1">
                                <FileText size={14} weight="regular" className="text-[#D97706] flex-shrink-0" />
                                <span className="text-[12px] text-[#92400E]">{doc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contacts — navigation buttons, not phone links */}
            {guide.contacts.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">Contacts utiles</h2>
                    <div className="space-y-2">
                        {guide.contacts.map((contact, i) => (
                            <button
                                key={i}
                                onClick={() => onNavigateToProCategory?.(contact.name)}
                                className="w-full flex items-center justify-between bg-white rounded-[14px] border border-[#E5E5EA] p-3.5 hover:border-[#D1D5DB] hover:shadow-sm active:scale-[0.99] transition-all text-left"
                            >
                                <div>
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{contact.name}</p>
                                    <p className="text-[11px] text-[#8E8E93]">{contact.role}</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F0FDF4] text-[#1A6B5A] rounded-full text-[12px] font-semibold">
                                    📍 Localiser
                                    <ArrowSquareOut size={13} weight="bold" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Monka tip */}
            {guide.tip && (
                <div className="bg-[#E8F4F8] rounded-[14px] p-4 flex gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#1A6B5A] flex items-center justify-center flex-shrink-0">
                        <Lightbulb size={16} weight="fill" className="text-white" />
                    </div>
                    <p className="text-[12px] text-[#1A6B5A] leading-relaxed font-medium">{guide.tip}</p>
                </div>
            )}
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════ */


const HomeScreen = ({
    onSelectTheme,
    onSelectArticle,
    onSelectGuide,
    toggledTasks = {},
    onAvatarPress,
    onMenuPress,
}: {
    onSelectTheme: (v: Vulnerability) => void;
    onSelectArticle?: (article: Article) => void;
    onSelectGuide?: (guide: ActionableAdvice) => void;
    toggledTasks?: Record<string, boolean>;
    onAvatarPress?: () => void;
    onMenuPress?: () => void;
}) => {

    const [showNotifToast, setShowNotifToast] = useState(false);

    // Compute dynamic progress from toggledTasks
    const allKernelTasks = mockVulnerabilities.flatMap(v =>
        v.microParcours.flatMap(mp => mp.categories.flatMap(c => c.recommendations.flatMap(r => r.microTasks)))
    );
    const dynamicCompleted = allKernelTasks.filter(t => {
        if (toggledTasks[t.id] !== undefined) return toggledTasks[t.id];
        return t.isCompleted;
    }).length;
    const dynamicProgress = allKernelTasks.length ? Math.round((dynamicCompleted / allKernelTasks.length) * 100) : 0;

    // Find next priority action (first uncompleted contributive task)
    const nextAction = (() => {
        for (const v of mockVulnerabilities) {
            for (const mp of v.microParcours) {
                for (const cat of mp.categories) {
                    for (const reco of cat.recommendations) {
                        for (const task of reco.microTasks) {
                            const isComplete = toggledTasks[task.id] !== undefined ? toggledTasks[task.id] : task.isCompleted;
                            if (!isComplete && task.isContributive) {
                                return { task, vulnerability: v, program: mp };
                            }
                        }
                    }
                }
            }
        }
        return null;
    })();

    return (
        <>
            {/* Notification toast */}
            {showNotifToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#1A1A2E] text-white px-6 py-3 rounded-full shadow-lg text-[13px] font-medium animate-bounce">
                    3 rappels en attente
                </div>
            )}

            {/* Header */}
            <div className="mb-6" data-tour="dashboard-header">
                <Header
                    name={mockUser.name}
                    avatar={mockUser.avatar}
                    variant="design2"
                    notificationCount={mockUser.notificationCount}
                    onNotificationPress={() => {
                        setShowNotifToast(true);
                        setTimeout(() => setShowNotifToast(false), 2500);
                    }}
                    onAvatarPress={onAvatarPress}
                    onMenuPress={onMenuPress}
                />
            </div>

            {/* Daily contextual phrase */}
            <div className="mb-4 px-1" data-tour="dashboard-context">
                <p className="text-[15px] text-[#6B7280] leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {(() => {
                        const phrases = [
                            "Comment vous sentez-vous aujourd'hui ? Monka est là.",
                            "Prenez un moment pour vous. Vous le méritez.",
                            "Bonne journée. On avance à votre rythme.",
                            "Nouvelle semaine, nouveau souffle. On est là.",
                            "Pensez à vous aussi. Votre bien-être compte.",
                            "Francine a de la chance de vous avoir. Voici la suite.",
                            "Un pas après l'autre. À votre rythme, toujours.",
                        ];
                        const dayIndex = new Date().getDay();
                        return phrases[dayIndex % phrases.length];
                    })()}
                </p>
            </div>

            {/* ── Update Situation Card — premium standalone component ── */}
            <button
                onClick={() => {
                    const toast = document.createElement('div');
                    toast.className = "fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#2C8C99] text-white px-6 py-3 rounded-full shadow-lg text-[13px] font-medium animate-bounce";
                    toast.innerText = "Ouverture du questionnaire…";
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2500);
                }}
                className="w-full mb-6 text-left group active:scale-[0.98] transition-all duration-200"
                data-tour="dashboard-update"
            >
                <div
                    className="relative overflow-hidden rounded-[20px] p-[1px]"
                    style={{
                        background: 'linear-gradient(135deg, #2C8C99, #1A6B5A, #2C8C99)',
                    }}
                >
                    <div
                        className="rounded-[19px] px-5 py-4 flex items-center gap-4"
                        style={{
                            background: 'linear-gradient(135deg, #E8F4F8, #F0FDF4)',
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99, #1A6B5A)',
                                boxShadow: '0 4px 12px -2px rgba(44, 140, 153, 0.4)',
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                <path d="m15 5 4 4" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-bold text-[#1A1A2E] leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Quelque chose a changé ?
                            </p>
                            <p className="text-[12px] text-[#6B7280] mt-0.5 leading-snug">
                                Mettez à jour votre situation pour affiner vos recommandations
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C8C99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </button>

            {/* Progress Card — Dynamic */}
            <div className="mb-6" data-tour="dashboard-progress">
                <ProgressCard percentage={dynamicProgress} />
            </div>


            {/* Hero Card — filtered by selected theme */}
            <div className="space-y-4 mb-8" data-tour="dashboard-hero-first">
                {mockVulnerabilities.map(v => {
                    const activeMPs = v.microParcours.filter(mp => mp.criticality !== 'prevention').length;
                    const totalMPs = v.microParcours.length;
                    // S = Santé de l'aidant ("Vous"), others = proche ("Francine")
                    const target = v.domain === 'S' ? 'Vous' : 'Francine';
                    return (
                        <HeroCard
                            key={v.id}
                            domain={v.domain as VulnerabilityDomain}
                            title={v.userTitle}
                            subtitle={v.description}
                            targetPerson={target}
                            activeMP={activeMPs}
                            totalMP={totalMPs}
                            onPress={() => onSelectTheme(v)}
                        />
                    );
                })}
            </div>

            {/* ═══ GUIDES PRATIQUES (§6) ═══ */}
            <div className="mb-6" data-tour="dashboard-guides">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-4">
                    Guides pratiques
                </h3>
                <div className="space-y-2.5">
                    {actionableAdvices.slice(0, 3).map(guide => {
                        const pc_config: Record<string, { bg: string; text: string; label: string }> = {
                            urgent: { bg: '#FEF3C7', text: '#D97706', label: 'À faire rapidement' },
                            recommended: { bg: '#E8F4F8', text: '#2C8C99', label: 'Conseillé' },
                            optional: { bg: '#F3F4F6', text: '#6B7280', label: 'Quand vous êtes prêt·e' },
                        };
                        const pc = pc_config[guide.priority] || pc_config.recommended;
                        return (
                            <button
                                key={guide.id}
                                onClick={() => onSelectGuide?.(guide)}
                                className="w-full text-left bg-white rounded-[14px] p-3.5 border border-[#E5E5EA] shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all active:scale-[0.99]"
                            >
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                        style={{ background: pc.bg, color: pc.text }}
                                    >
                                        {pc.label}
                                    </span>
                                </div>
                                <h4 className="text-[14px] font-semibold text-[#1A1A2E] mb-1">{guide.title}</h4>
                                <p className="text-[12px] text-[#6B7280] line-clamp-1">{guide.subtitle}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-[11px] text-[#8E8E93]">📋 {guide.steps.length} étapes</span>
                                    <span className="text-[11px] text-[#8E8E93]">⏱ {guide.estimatedTime}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Quick resources preview */}
            <div className="mb-6">
                <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-4">
                    À lire cette semaine
                </h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {articles.slice(0, 2).map(art => (
                        <button
                            key={art.id}
                            onClick={() => onSelectArticle?.(art)}
                            className="min-w-[220px] bg-white rounded-[20px] overflow-hidden border border-[#E5E5EA] shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98]"
                        >
                            <div className="h-[100px] overflow-hidden">
                                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3">
                                <p className="text-[12px] text-[#2C8C99] font-semibold mb-1">{art.category}</p>
                                <p className="text-[13px] font-semibold text-[#1A1A2E] line-clamp-2">{art.title}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   THEME DETAIL SCREEN
═══════════════════════════════════════════════════════ */
const ThemeDetailScreen = ({
    vulnerability,
    onBack,
    onSelectProgram,
    toggledTasks = {},
}: {
    vulnerability: Vulnerability;
    onBack: () => void;
    onSelectProgram: (mp: MicroParcours) => void;
    toggledTasks?: Record<string, boolean>;
}) => {
    return (
        <>
            <BackButton onBack={onBack} />

            {/* Simple header — no custom component, just title */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {vulnerability.userTitle}
                </h1>
                <p className="text-[14px] text-[#8E8E93] mt-1">{vulnerability.description}</p>
            </div>

            {/* C2 — TaskCards for each micro-parcours */}
            <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-4">
                Vos programmes
            </h3>
            <div className="space-y-3 mb-8" data-tour="theme-programs">
                {vulnerability.microParcours.map(mp => {
                    // ASR calculation
                    const contributiveTasks = mp.categories.flatMap(cat =>
                        cat.recommendations.flatMap(reco =>
                            reco.microTasks.filter(t => t.isContributive)
                        )
                    );
                    const asrTotal = contributiveTasks.length;
                    const asrDone = contributiveTasks.filter(t =>
                        toggledTasks[t.id] !== undefined ? toggledTasks[t.id] : t.isCompleted
                    ).length;
                    const asrProgress = asrTotal > 0 ? Math.round((asrDone / asrTotal) * 100) : 0;

                    return (
                        <TaskCard
                            key={mp.id}
                            title={mp.title}
                            description={mp.description}
                            criticality={mp.criticality}
                            domain={vulnerability.domain as VulnerabilityDomain}
                            asrProgress={asrProgress}
                            asrDone={asrDone}
                            asrTotal={asrTotal}
                            isActivated={mp.criticality !== 'prevention'}
                            onPress={() => onSelectProgram(mp)}
                        />
                    );
                })}
            </div>

            {/* Timeline */}
            <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-4">
                Votre parcours
            </h3>
            <div className="bg-white rounded-[24px] p-5 mb-6" style={{ boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' }}>
                {vulnerability.microParcours.map((mp, i) => {
                    const mpRecos = mp.categories.flatMap(c => c.recommendations);
                    const mpRecosDone = mpRecos.filter(r => r.microTasks.every(t => toggledTasks[t.id] !== undefined ? toggledTasks[t.id] : t.isCompleted)).length;
                    const status = mpRecosDone === mpRecos.length ? 'done' : mpRecosDone > 0 ? 'active' : 'pending';
                    return (
                        <TimelineStep
                            key={mp.id}
                            label={mp.title}
                            description={`${mpRecosDone}/${mpRecos.length} recommandations`}
                            status={status as 'done' | 'active' | 'pending'}
                            isLast={i === vulnerability.microParcours.length - 1}
                        />
                    );
                })}
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   COMPLETION IMPACT DATA — what each domain unlocks
═══════════════════════════════════════════════════════ */
const completionImpacts: Record<string, {
    headline: string;
    narrative: string;
    unlocks: string[];
    nextStep: string;
}> = {
    R: {
        headline: 'Vous avez retrouvé du répit',
        narrative: "Ces actions vous ont permis de poser les bases d'un équilibre durable. Le répit n'est pas un luxe — c'est ce qui vous permet de continuer à accompagner votre proche.",
        unlocks: [
            'Accès au programme « Répit renforcé » avec des solutions de relais',
            'Notification à votre cercle d\'aidants pour prendre le relais',
            'Recommandation d\'un accueil de jour adapté',
        ],
        nextStep: 'Votre prochain parcours vous aidera à pérenniser ces habitudes.',
    },
    S: {
        headline: 'Votre santé est mieux protégée',
        narrative: "En prenant soin de vous, vous prenez soin de votre proche. Ces actions réduisent votre risque d'épuisement et renforcent votre capacité d'accompagnement.",
        unlocks: [
            'Bilan santé aidant personnalisé à planifier',
            'Rappels automatiques pour vos propres rendez-vous médicaux',
            'Accès à des exercices de bien-être guidés',
        ],
        nextStep: 'Le programme « Suivi santé continu » sera bientôt disponible.',
    },
    M: {
        headline: 'Le suivi médical est organisé',
        narrative: "Le parcours de soins de votre proche est maintenant structuré. Chaque rendez-vous, chaque traitement est suivi — vous n'avez plus besoin de tout garder en tête.",
        unlocks: [
            'Calendrier médical synchronisé avec votre cercle d\'aidants',
            'Rappels de renouvellement d\'ordonnances',
            'Historique médical partageable avec les professionnels',
        ],
        nextStep: 'La coordination avec les professionnels de santé sera la prochaine étape.',
    },
    A: {
        headline: 'Vos démarches avancent',
        narrative: "Les démarches administratives sont souvent le plus grand frein des aidants. En complétant ce parcours, vous avez sécurisé l'accès aux aides auxquelles vous avez droit.",
        unlocks: [
            'Dossier APA pré-rempli et prêt à soumettre',
            'Simulation de vos droits au congé de proche aidant',
            'Alertes sur les nouvelles aides disponibles dans votre département',
        ],
        nextStep: 'Le suivi de vos dossiers en cours sera automatisé.',
    },
    F: {
        headline: 'La relation avec votre proche est renforcée',
        narrative: "Comprendre votre proche, adapter la communication, aménager son quotidien — ces actions transforment votre relation et améliorent sa qualité de vie.",
        unlocks: [
            'Conseils personnalisés selon l\'évolution de votre proche',
            'Guide d\'aménagement du domicile adapté',
            'Mise en relation avec des familles dans la même situation',
        ],
        nextStep: 'De nouvelles ressources seront adaptées à l\'évolution de votre situation.',
    },
};

/* ═══════════════════════════════════════════════════════
   CELEBRATION MODAL — Full-screen overlay
═══════════════════════════════════════════════════════ */
const CelebrationModal = ({
    vulnerability,
    program,
    completedCount,
    themeColor,
    onClose,
}: {
    vulnerability: Vulnerability;
    program: MicroParcours;
    completedCount: number;
    themeColor: string;
    onClose: () => void;
}) => {
    const impact = completionImpacts[vulnerability.domain] || completionImpacts['R'];
    const [showContent, setShowContent] = useState(false);
    const [showUnlocks, setShowUnlocks] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowContent(true), 600);
        const t2 = setTimeout(() => setShowUnlocks(true), 1200);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                style={{ animation: 'cel-fade-in 0.4s ease-out forwards' }}
            />

            {/* Confetti rain */}
            <style>{`
                @keyframes cel-fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes cel-slide-up {
                    from { opacity: 0; transform: translateY(40px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes cel-confetti {
                    0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                @keyframes cel-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes cel-check-ring {
                    0% { stroke-dashoffset: 283; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes cel-check-mark {
                    0% { stroke-dashoffset: 50; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes cel-unlock-item {
                    from { opacity: 0; transform: translateX(-12px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .cel-confetti-piece {
                    position: absolute; top: -20px; border-radius: 2px;
                    animation: cel-confetti linear forwards;
                }
            `}</style>

            {/* Confetti pieces */}
            {[...Array(30)].map((_, i) => (
                <div
                    key={i}
                    className="cel-confetti-piece"
                    style={{
                        left: `${Math.random() * 100}%`,
                        width: `${4 + Math.random() * 6}px`,
                        height: `${4 + Math.random() * 6}px`,
                        backgroundColor: [
                            themeColor, '#FFD700', '#FF6B9D', '#4FC3F7', '#AED581',
                            '#BA68C8', '#FF8A65', '#80DEEA', '#FFF176', '#F48FB1',
                        ][i % 10],
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 1.5}s`,
                        borderRadius: i % 3 === 0 ? '50%' : '2px',
                    }}
                />
            ))}

            {/* Modal content */}
            <div
                className="relative z-10 mx-6 w-full max-w-[360px] bg-white rounded-[28px] overflow-hidden"
                style={{
                    animation: 'cel-slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards',
                    opacity: 0,
                    boxShadow: '0 25px 60px -12px rgba(0,0,0,0.25)',
                }}
            >
                {/* Top gradient bar */}
                <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(90deg, ${themeColor}, ${themeColor}88, ${themeColor})` }}
                />

                <div className="p-6">
                    {/* Animated check circle */}
                    <div className="flex justify-center mb-5">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}25)`,
                                animation: 'cel-pulse 2s ease-in-out infinite 1.5s',
                            }}
                        >
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                                <circle
                                    cx="22" cy="22" r="18"
                                    stroke={themeColor} strokeWidth="3"
                                    fill="none"
                                    strokeDasharray="283"
                                    style={{ animation: 'cel-check-ring 1s ease-out 0.5s forwards', strokeDashoffset: 283 }}
                                />
                                <path
                                    d="M14 22.5L19.5 28L30 17"
                                    stroke={themeColor} strokeWidth="3"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    fill="none"
                                    strokeDasharray="50"
                                    style={{ animation: 'cel-check-mark 0.5s ease-out 1.3s forwards', strokeDashoffset: 50 }}
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="text-center mb-5" style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ backgroundColor: `${themeColor}15` }}>
                            {vulnerability.domain === 'R' && <UsersIcon size={24} weight="duotone" color={themeColor} />}
                            {vulnerability.domain === 'A' && <ClipboardText size={24} weight="duotone" color={themeColor} />}
                            {vulnerability.domain === 'S' && <Heart size={24} weight="duotone" color={themeColor} />}
                            {vulnerability.domain === 'F' && <HandHeart size={24} weight="duotone" color={themeColor} />}
                            {vulnerability.domain === 'M' && <FirstAid size={24} weight="duotone" color={themeColor} />}
                        </div>
                        <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {impact.headline}
                        </h2>
                        <p className="text-[13px] text-[#8E8E93]">
                            {completedCount} actions complétées dans <span className="font-semibold text-[#1A1A2E]">{program.title}</span>
                        </p>
                    </div>

                    {/* Narrative */}
                    <div
                        className="bg-[#FAFBFD] rounded-[16px] p-4 mb-5"
                        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}
                    >
                        <p className="text-[13px] text-[#3A3A4A] leading-relaxed">
                            {impact.narrative}
                        </p>
                    </div>

                    {/* What this unlocks */}
                    <div style={{ opacity: showUnlocks ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                        <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                            Ce que ça débloque
                        </h3>
                        <div className="space-y-2.5 mb-5">
                            {impact.unlocks.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2.5"
                                    style={{
                                        animation: showUnlocks
                                            ? `cel-unlock-item 0.4s ease-out ${i * 0.15}s forwards`
                                            : 'none',
                                        opacity: 0,
                                    }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: `${themeColor}15` }}
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                                    </div>
                                    <p className="text-[13px] text-[#4A4A5A] leading-snug">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Next step hint */}
                    <div
                        className="text-center mb-5"
                        style={{ opacity: showUnlocks ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }}
                    >
                        <p className="text-[12px] text-[#8E8E93] italic">{impact.nextStep}</p>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={onClose}
                        className="w-full py-3.5 rounded-[16px] text-[15px] font-bold text-white transition-all duration-200 active:scale-[0.97]"
                        style={{
                            background: `linear-gradient(135deg, ${themeColor}, ${themeColor}CC)`,
                            boxShadow: `0 4px 16px -4px ${themeColor}66`,
                        }}
                    >
                        Continuer mes parcours
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   PROGRAM DETAIL SCREEN — Couche 3 : liste de RecoCards
   Clic RecoCard → push recoDetail (couche 4)
═══════════════════════════════════════════════════════ */
const ProgramDetailScreen = ({
    vulnerability,
    program,
    onBack,
    toggledTasks,
    onSelectReco,
}: {
    vulnerability: Vulnerability;
    program: MicroParcours;
    onBack: () => void;
    toggledTasks: Record<string, boolean>;
    onSelectReco: (reco: Recommendation, cat: RecoCategory) => void;
}) => {
    const allRecos = program.categories.flatMap(c => c.recommendations);

    return (
        <>
            <BackButton onBack={onBack} label={vulnerability.userTitle} />

            {/* Simple header — title + description only */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {program.title}
                </h1>
                <p className="text-[14px] text-[#8E8E93]">{program.description}</p>
            </div>

            {/* C3 — Flat list of RecoCards (no category grouping) */}
            <div className="space-y-2.5" data-tour="program-recos">
                {allRecos.map(reco => {
                    // Find the category this reco belongs to
                    const cat = program.categories.find(c => c.recommendations.some(r => r.id === reco.id))!;
                    return (
                        <RecoCard
                            key={reco.id}
                            title={reco.title}
                            domain={vulnerability.domain as VulnerabilityDomain}
                            urgency={reco.criticality}
                            onClick={() => onSelectReco(reco, cat)}
                        />
                    );
                })}
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   RECO DETAIL SCREEN — Couche 4 : MicroTaskItem storybook
   Chaque MT = composant MicroTaskItem du storybook
═══════════════════════════════════════════════════════ */
const RecoDetailScreen = ({
    vulnerability,
    program,
    recommendation,
    category,
    onBack,
    toggledTasks,
    onToggleTask,
    guidedActionsByTaskId,
    onNavigateToProCategory,
}: {
    vulnerability: Vulnerability;
    program: MicroParcours;
    recommendation: Recommendation;
    category: RecoCategory;
    onBack: () => void;
    toggledTasks: Record<string, boolean>;
    onToggleTask: (taskId: string) => void;
    guidedActionsByTaskId: Record<string, ActionableAdvice>;
    onNavigateToProCategory: (contactName?: string) => void;
}) => {
    const theme = ThemeColors[vulnerability.domain];
    const urgency = UrgencyConfig[recommendation.criticality];

    const tasksWithState = recommendation.microTasks.map(t => ({
        ...t,
        isCompleted: toggledTasks[t.id] !== undefined ? toggledTasks[t.id] : t.isCompleted,
    }));
    const completedCount = tasksWithState.filter(t => t.isCompleted).length;

    return (
        <>
            <BackButton onBack={onBack} label={program.title} />

            {/* Reco header */}
            <div
                className="rounded-[20px] p-5 mb-6"
                style={{
                    background: `linear-gradient(135deg, ${theme.color}12 0%, ${theme.color}06 100%)`,
                    border: `1px solid ${theme.color}20`,
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: urgency.softColor, color: urgency.color }}
                    >
                        {urgency.userLabel}
                    </span>
                    <span className="text-[11px] text-[#8E8E93]">{category.name}</span>
                </div>
                <h1 className="text-[18px] font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {recommendation.title}
                </h1>
                <p className="text-[12px] text-[#8E8E93]">
                    {completedCount}/{recommendation.microTasks.length} actions complétées
                </p>
            </div>

            {/* Micro-tasks — MicroTaskItem storybook components */}
            <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                Actions à faire
            </h3>
            <div className="space-y-2.5 mb-8" data-tour="reco-tasks">
                {[...tasksWithState]
                    .sort((a, b) => {
                        if (a.isContributive !== b.isContributive) return a.isContributive ? -1 : 1;
                        if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
                        return 0;
                    })
                    .map(task => (
                        <MicroTaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggleTask}
                            guidedAction={guidedActionsByTaskId[task.id]}
                            onNavigateToResources={onNavigateToProCategory}
                        />
                    ))}
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   CALENDAR SCREEN — Agenda collaboratif
═══════════════════════════════════════════════════════ */
interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    assignee: string;
    assigneeAvatar: string;
    domain: VulnerabilityDomain;
    note?: string;
    day: number; // 0=Lun .. 6=Dim
}



const caregivers = [
    { name: 'Marie', role: 'Aidante principale', avatar: 'https://ui-avatars.com/api/?name=Marie+D&background=E8F4F8&color=2C8C99&bold=true', status: 'En ligne' },
    { name: 'Fatima', role: 'Sœur', avatar: 'https://ui-avatars.com/api/?name=Fatima+L&background=DDD6FE&color=5B21B6&bold=true', status: 'Actif il y a 2h' },
    { name: 'Rachid', role: 'Frère', avatar: 'https://ui-avatars.com/api/?name=Rachid+L&background=BBF7D0&color=166534&bold=true', status: 'Actif hier' },
];

const weekEvents: CalendarEvent[] = [
    { id: 'ev1', title: 'RDV Dr. Martin — bilan trimestriel', time: '09:30', assignee: 'Marie', assigneeAvatar: caregivers[0].avatar, domain: 'M', day: 0 },
    { id: 'ev2', title: 'Courses & médicaments', time: '14:00', assignee: 'Fatima', assigneeAvatar: caregivers[1].avatar, domain: 'F', note: 'Liste sur le frigo', day: 0 },
    { id: 'ev3', title: 'Garde après-midi', time: '14:00 – 18:00', assignee: 'Rachid', assigneeAvatar: caregivers[2].avatar, domain: 'R', day: 1 },
    { id: 'ev4', title: 'Kiné — séance rééducation', time: '10:00', assignee: 'Marie', assigneeAvatar: caregivers[0].avatar, domain: 'S', day: 2 },
    { id: 'ev5', title: 'Appel assistante sociale (dossier APA)', time: '11:00', assignee: 'Fatima', assigneeAvatar: caregivers[1].avatar, domain: 'A', day: 3 },
    { id: 'ev6', title: 'Accueil de jour', time: '09:00 – 17:00', assignee: 'Marie', assigneeAvatar: caregivers[0].avatar, domain: 'M', note: 'Prévoir le sac repas', day: 4 },
];



const CalendarScreen = () => {
    const [selectedDay, setSelectedDay] = useState(0);
    const [showShareToast, setShowShareToast] = useState(false);
    const [showMockToast, setShowMockToast] = useState('');

    const showToast = (msg: string) => {
        setShowMockToast(msg);
        setTimeout(() => setShowMockToast(''), 2500);
    };



    // Build week days starting from today
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return {
            dayLabel: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
            dateNum: d.getDate(),
            isToday: d.toDateString() === today.toDateString(),
        };
    });

    const dayEvents = weekEvents.filter(e => e.day === selectedDay);

    return (
        <>
            {/* Share toast */}
            {showShareToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#1A1A2E] text-white px-6 py-3 rounded-full shadow-lg text-[13px] font-medium animate-bounce">
                    Lien de partage copié
                </div>
            )}

            {/* Mock action toast */}
            {showMockToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#2C8C99] text-white px-6 py-3 rounded-full shadow-lg text-[13px] font-medium animate-bounce">
                    {showMockToast}
                </div>
            )}

            <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Agenda partagé
            </h1>
            <p className="text-[14px] text-[#8E8E93] mb-5">Coordonnez-vous avec votre cercle d&apos;aidants.</p>

            {/* Week strip */}
            <div className="flex gap-1.5 mb-6 overflow-x-auto no-scrollbar">
                {weekDays.map((d, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedDay(i)}
                        className={`flex-1 min-w-[44px] py-2 rounded-[16px] flex flex-col items-center gap-0.5 transition-all active:scale-95 ${selectedDay === i
                            ? 'bg-[#1A1A2E] text-white shadow-lg shadow-black/10'
                            : d.isToday
                                ? 'bg-[#E8F4F8] text-[#2C8C99]'
                                : 'bg-white text-[#8E8E93] border border-[#E5E5EA]'
                            }`}
                    >
                        <span className="text-[10px] font-semibold uppercase">{d.dayLabel}</span>
                        <span className={`text-[16px] font-bold ${selectedDay === i ? 'text-white' : ''}`}>{d.dateNum}</span>
                        {weekEvents.some(e => e.day === i) && selectedDay !== i && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2C8C99] mt-0.5" />
                        )}
                    </button>
                ))}
            </div>

            {/* Day events */}
            <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                {weekDays[selectedDay]?.dayLabel} {weekDays[selectedDay]?.dateNum}
            </h3>
            {dayEvents.length === 0 ? (
                <div className="bg-white rounded-[20px] p-6 text-center border border-[#E5E5EA] mb-6">
                    <p className="text-[14px] text-[#8E8E93]">Aucun événement ce jour</p>
                    <p className="text-[12px] text-[#C8CCD0] mt-1">Appuyez sur + pour en ajouter</p>
                </div>
            ) : (
                <div className="space-y-3 mb-6">
                    {dayEvents.map(ev => {
                        const theme = ThemeColors[ev.domain];
                        return (
                            <div
                                key={ev.id}
                                className="bg-white rounded-[20px] p-4 border border-[#E5E5EA] shadow-sm"
                                style={{ borderLeftWidth: 4, borderLeftColor: theme.color }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <p className="text-[14px] font-semibold text-[#1A1A2E]">{ev.title}</p>
                                        <p className="text-[12px] text-[#8E8E93] mt-0.5">{ev.time}</p>
                                    </div>
                                    <img src={ev.assigneeAvatar} alt={ev.assignee} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${theme.color}12`, color: theme.color }}>
                                        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: theme.color }} /> {theme.label}
                                    </span>
                                    <span className="text-[11px] text-[#C8CCD0]">→ {ev.assignee}</span>
                                </div>
                                {ev.note && (
                                    <div className="mt-2 bg-[#FEF9E7] rounded-[12px] px-3 py-2">
                                        <p className="text-[12px] text-[#92770C]">{ev.note}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Add event button */}
            <button
                onClick={() => showToast('Bientôt disponible — ajout d\'événements')}
                className="w-full bg-[#E8F4F8] text-[#2C8C99] rounded-[16px] py-3 mb-6 font-semibold text-[14px] hover:bg-[#D6EDF0] transition-colors active:scale-[0.98]"
            >
                + Ajouter un événement
            </button>

            {/* Circle members */}
            <h3 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                Membres du cercle
            </h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 mb-6">
                {caregivers.map((c, i) => (
                    <div key={i} className="bg-white rounded-[20px] p-3 min-w-[120px] text-center border border-[#E5E5EA] shadow-sm">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-[#E8F4F8]" />
                        <h4 className="text-[13px] font-bold text-[#1A1A2E]">{c.name}</h4>
                        <p className="text-[10px] text-[#8E8E93]">{c.role}</p>
                        <p className="text-[10px] text-[#2C8C99] mt-1">{c.status}</p>
                    </div>
                ))}
                {/* Invite button */}
                <button
                    onClick={() => showToast('Invitation envoyée — bientôt disponible')}
                    className="bg-white rounded-[20px] p-3 min-w-[120px] flex flex-col items-center justify-center border border-dashed border-[#C8CCD0] hover:border-[#2C8C99] transition-colors"
                >
                    <div className="w-12 h-12 rounded-full bg-[#E8F4F8] flex items-center justify-center mb-2">
                        <span className="text-[20px] text-[#2C8C99]">+</span>
                    </div>
                    <p className="text-[13px] font-semibold text-[#8E8E93]">Inviter</p>
                </button>
            </div>

            {/* Share button */}
            <button
                onClick={() => { setShowShareToast(true); setTimeout(() => setShowShareToast(false), 2500); }}
                className="w-full bg-white rounded-[16px] py-3 mb-6 font-semibold text-[14px] text-[#1A1A2E] border border-[#E5E5EA] hover:border-[#C8CCD0] transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Partager l&apos;agenda (Google Calendar)
            </button>


        </>
    );
};

/* ═══════════════════════════════════════════════════════
   MON SUIVI — Refonte : Onglets Actions / Agenda+Cercle
═══════════════════════════════════════════════════════ */
const MonSuiviScreen = ({
    toggledTasks,
    onToggleTask,
    onSelectTheme,
    onSelectProgram,
}: {
    toggledTasks: Record<string, boolean>;
    onToggleTask: (taskId: string) => void;
    onSelectTheme: (v: Vulnerability) => void;
    onSelectProgram: (v: Vulnerability, mp: MicroParcours) => void;
}) => {
    const [activeTab, setActiveTab] = useState<'actions' | 'agenda'>('actions');
    const [vulnFilter, setVulnFilter] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const [showMockToast, setShowMockToast] = useState('');

    const showToast = (msg: string) => {
        setShowMockToast(msg);
        setTimeout(() => setShowMockToast(''), 2500);
    };

    // ── Urgency sort order (critical first) ──
    const urgencyOrder: Record<string, number> = { critical: 0, ccc: 1, standard: 2, prevention: 3 };

    // ── DATA: Group by MicroParcours with ASR calculation ──
    type FlatMP = {
        id: string;
        title: string;
        description: string;
        domain: VulnerabilityDomain;
        criticality: Criticality;
        asrDone: number;
        asrTotal: number;
        asrProgress: number;
        isActivated: boolean;
        vulnerability: Vulnerability;
        program: MicroParcours;
    };

    const allMPs: FlatMP[] = mockVulnerabilities.flatMap(v =>
        v.microParcours.map(mp => {
            // Collect all contributive micro-tasks across all recos
            const allContributiveTasks = mp.categories.flatMap(cat =>
                cat.recommendations.flatMap(reco =>
                    reco.microTasks.filter(t => t.isContributive)
                )
            );
            const asrTotal = allContributiveTasks.length;
            const asrDone = allContributiveTasks.filter(t =>
                toggledTasks[t.id] !== undefined ? toggledTasks[t.id] : t.isCompleted
            ).length;
            const asrProgress = asrTotal > 0 ? Math.round((asrDone / asrTotal) * 100) : 0;

            // Determine highest criticality across recommendations
            const allCriticalities = mp.categories.flatMap(cat =>
                cat.recommendations.map(r => r.criticality)
            );
            const highestCrit: Criticality = allCriticalities.includes('critical')
                ? 'critical'
                : allCriticalities.includes('ccc')
                    ? 'ccc'
                    : allCriticalities.includes('standard')
                        ? 'standard'
                        : 'prevention';

            return {
                id: `${v.id}-${mp.id}`,
                title: mp.title,
                description: mp.description || '',
                domain: v.domain as VulnerabilityDomain,
                criticality: highestCrit,
                asrDone,
                asrTotal,
                asrProgress,
                isActivated: highestCrit !== 'prevention',
                vulnerability: v,
                program: mp,
            };
        })
    );

    // Sort by urgency (critical first)
    const sortedMPs = [...allMPs].sort((a, b) => urgencyOrder[a.criticality] - urgencyOrder[b.criticality]);

    // Filter by vulnerability
    const filteredMPs = vulnFilter
        ? sortedMPs.filter(m => m.vulnerability.id === vulnFilter)
        : sortedMPs;

    // Build vulnerability filter list
    const vulnsWithPending = mockVulnerabilities.filter(v =>
        allMPs.some(m => m.vulnerability.id === v.id)
    );

    const totalPendingCount = filteredMPs.reduce((acc, m) => acc + (m.asrTotal - m.asrDone), 0);

    // ── AGENDA DATA ──
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return {
            dayLabel: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
            dateNum: d.getDate(),
            isToday: d.toDateString() === today.toDateString(),
        };
    });
    const dayEvents = weekEvents.filter(e => e.day === selectedDay);

    return (
        <>
            {/* Toast */}
            {showMockToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-[#2C8C99] text-white px-6 py-3 rounded-full shadow-lg text-[13px] font-medium animate-bounce">
                    {showMockToast}
                </div>
            )}

            {/* ── HEADER ── */}
            <div data-tour="monsuivi-header">
                <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Mon suivi
                </h1>
                <p className="text-[14px] text-[#8E8E93] mb-5">Votre quotidien, vos actions, votre rythme.</p>
            </div>

            {/* ── TAB PILLS ── */}
            <div className="flex gap-1 bg-[#F0F0F3] rounded-[14px] p-1 mb-6" data-tour="monsuivi-tabs">
                <button
                    onClick={() => setActiveTab('actions')}
                    className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-semibold transition-all duration-200 ${activeTab === 'actions'
                        ? 'bg-white text-[#1A1A2E] shadow-sm'
                        : 'text-[#8E8E93] hover:text-[#6B7280]'
                        }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    <span className="flex items-center justify-center gap-1.5">
                        <Lightning size={16} weight={activeTab === 'actions' ? 'fill' : 'regular'} />
                        Mes actions
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('agenda')}
                    className={`flex-1 py-2.5 rounded-[11px] text-[13px] font-semibold transition-all duration-200 ${activeTab === 'agenda'
                        ? 'bg-white text-[#1A1A2E] shadow-sm'
                        : 'text-[#8E8E93] hover:text-[#6B7280]'
                        }`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    <span className="flex items-center justify-center gap-1.5">
                        <CalendarCheck size={16} weight={activeTab === 'agenda' ? 'fill' : 'regular'} />
                        Agenda & Cercle
                    </span>
                </button>
            </div>

            {/* ══════════════════════════════════════════════
                TAB 1: MES ACTIONS — RecoCards par urgence
            ══════════════════════════════════════════════ */}
            {activeTab === 'actions' && (
                <>
                    {/* ── VULNERABILITY FILTERS — Circular theme icons ── */}
                    <div className="flex gap-4 overflow-x-auto no-scrollbar mb-5 pb-1 justify-center">
                        {/* "Tous" circle */}
                        <button
                            onClick={() => setVulnFilter(null)}
                            className="flex-shrink-0 flex flex-col items-center gap-1.5 transition-all duration-200"
                        >
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${!vulnFilter ? 'ring-[2.5px] ring-offset-2 ring-offset-[#F8F4EF] shadow-md' : 'shadow-sm hover:shadow-md hover:scale-105'}`}
                                style={{
                                    backgroundColor: !vulnFilter ? '#1A1A2E' : '#F0F0F3',
                                    ...(!vulnFilter ? { boxShadow: '0 0 0 2.5px #1A1A2E' } : {}),
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={!vulnFilter ? 'white' : '#8E8E93'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="8" r="3" />
                                    <circle cx="16" cy="8" r="3" />
                                    <circle cx="8" cy="16" r="3" />
                                    <circle cx="16" cy="16" r="3" />
                                </svg>
                            </div>
                            <span className={`text-[11px] font-semibold leading-tight text-center ${!vulnFilter ? 'text-[#2D2A26]' : 'text-[#8A857E]'}`}>
                                Tous
                            </span>
                        </button>

                        {/* Theme circles */}
                        {vulnsWithPending.map(v => (
                            <ThemeButton
                                key={v.id}
                                domain={v.domain}
                                isSelected={vulnFilter === v.id}
                                showLabel
                                size="md"
                                onClick={() => setVulnFilter(vulnFilter === v.id ? null : v.id)}
                            />
                        ))}
                    </div>

                    {/* Header count */}
                    <p className="text-[13px] text-[#8E8E93] mb-3">
                        <span className="font-semibold text-[#1A1A2E]">{filteredMPs.length}</span> programme{filteredMPs.length > 1 ? 's' : ''} · <span className="font-semibold text-[#1A1A2E]">{totalPendingCount}</span> action{totalPendingCount > 1 ? 's' : ''} en attente
                    </p>

                    {/* ── TASK CARDS LIST (grouped by MicroParcours) ── */}
                    {filteredMPs.length === 0 ? (
                        <div className="bg-white rounded-[16px] p-6 text-center border border-[#E5E5EA] mb-8">
                            <CheckCircle size={32} weight="fill" className="text-[#10B981] mx-auto mb-2" />
                            <p className="text-[14px] font-semibold text-[#1A1A2E]">Tout est fait !</p>
                            <p className="text-[12px] text-[#8E8E93] mt-1">Bravo, vous êtes à jour.</p>
                        </div>
                    ) : (
                        <div className="space-y-2.5 mb-8">
                            {filteredMPs.map(m => (
                                <TaskCard
                                    key={m.id}
                                    title={m.title}
                                    description={m.description}
                                    criticality={m.criticality}
                                    domain={m.domain}
                                    asrProgress={m.asrProgress}
                                    asrDone={m.asrDone}
                                    asrTotal={m.asrTotal}
                                    isActivated={m.isActivated}
                                    onPress={() => onSelectProgram(m.vulnerability, m.program)}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}







            {/* ══════════════════════════════════════════════
                TAB 2: AGENDA & CERCLE AIDANT
            ══════════════════════════════════════════════ */}
            {
                activeTab === 'agenda' && (
                    <>
                        {/* ── AGENDA SECTION ── */}
                        <div className="bg-white rounded-[20px] p-4 mb-6" style={{ boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <CalendarCheck size={18} weight="bold" className="text-[#2C8C99]" />
                                <h3 className="text-[14px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>Agenda de la semaine</h3>
                            </div>

                            {/* Week strip */}
                            <div className="flex gap-1 mb-4">
                                {weekDays.map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDay(i)}
                                        className={`flex-1 min-w-[36px] py-1.5 rounded-[12px] flex flex-col items-center gap-0 transition-all active:scale-95 ${selectedDay === i
                                            ? 'bg-[#1A1A2E] text-white'
                                            : d.isToday
                                                ? 'bg-[#E8F4F8] text-[#2C8C99]'
                                                : 'text-[#8E8E93]'
                                            }`}
                                    >
                                        <span className="text-[9px] font-semibold uppercase">{d.dayLabel}</span>
                                        <span className={`text-[14px] font-bold ${selectedDay === i ? 'text-white' : ''}`}>{d.dateNum}</span>
                                        {weekEvents.some(e => e.day === i) && selectedDay !== i && (
                                            <div className="w-1 h-1 rounded-full bg-[#2C8C99] mt-0.5" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Day events */}
                            {dayEvents.length === 0 ? (
                                <p className="text-[12px] text-[#C8CCD0] text-center py-4">Aucun événement ce jour</p>
                            ) : (
                                <div className="space-y-1.5">
                                    {dayEvents.map(ev => {
                                        const evTheme = ThemeColors[ev.domain];
                                        return (
                                            <div
                                                key={ev.id}
                                                className="flex items-center gap-2.5 py-2.5 px-3 rounded-[12px] bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors"
                                                style={{ borderLeft: `3px solid ${evTheme.color}` }}
                                            >
                                                <span className="text-[11px] font-bold text-[#8E8E93] w-[42px] flex-shrink-0">{ev.time.split('–')[0].trim()}</span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] text-[#1A1A2E] font-medium truncate">{ev.title}</p>
                                                    <p className="text-[10px] text-[#B0B5BD]">{ev.time}</p>
                                                </div>
                                                <img src={ev.assigneeAvatar} alt={ev.assignee} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" />
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ── CERCLE AIDANT ── */}
                        <div className="bg-white rounded-[20px] p-5 mb-6" style={{ boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <UsersIcon size={18} weight="bold" className="text-[#7C3AED]" />
                                    <h3 className="text-[14px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>Mon cercle aidant</h3>
                                </div>
                                <span className="text-[11px] font-semibold text-[#7C3AED] bg-[#F3E8FF] px-2.5 py-1 rounded-full">3 membres</span>
                            </div>

                            {/* Cercle members */}
                            <div className="space-y-2.5">
                                {[
                                    { name: 'Sophie M.', role: 'Aidante principale', avatar: 'https://i.pravatar.cc/150?img=1', color: '#7C3AED' },
                                    { name: 'Pierre D.', role: 'Frère — soutien logistique', avatar: 'https://i.pravatar.cc/150?img=3', color: '#2563EB' },
                                    { name: 'Dr. Martin', role: 'Médecin traitant', avatar: 'https://i.pravatar.cc/150?img=12', color: '#059669' },
                                ].map((member, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-[14px] bg-[#FAFAFA] hover:bg-[#F5F5F5] transition-colors">
                                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.name}</p>
                                            <p className="text-[11px] text-[#8E8E93]">{member.role}</p>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center hover:border-[#7C3AED] transition-colors">
                                                <ChatCircle size={14} weight="bold" className="text-[#8E8E93]" />
                                            </button>
                                            <button className="w-8 h-8 rounded-full bg-white border border-[#E5E5EA] flex items-center justify-center hover:border-[#7C3AED] transition-colors">
                                                <Phone size={14} weight="bold" className="text-[#8E8E93]" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add member CTA */}
                            <button className="w-full mt-3 py-2.5 rounded-[12px] border-2 border-dashed border-[#E5E5EA] text-[12px] font-semibold text-[#8E8E93] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all">
                                + Ajouter un membre
                            </button>

                            {/* Share agenda link */}
                            <button
                                onClick={() => { showToast('📅 Lien de partage copié !'); }}
                                className="w-full mt-3 bg-white rounded-[12px] py-2.5 font-semibold text-[13px] text-[#1A1A2E] border border-[#E5E5EA] hover:border-[#7C3AED] transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Partager l&apos;agenda
                            </button>
                        </div>
                    </>
                )
            }
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   CHAT SCREEN
═══════════════════════════════════════════════════════ */
const ChatScreen = () => {
    const [messages] = useState([
        { id: '1', from: 'bot', text: "Bonjour Marie, comment puis-je vous aider aujourd'hui ?", time: '10:30' },
        { id: '2', from: 'user', text: "J'ai besoin d'informations sur le congé proche aidant", time: '10:31' },
        { id: '3', from: 'bot', text: "Bien sûr ! Le congé de proche aidant vous permet de cesser temporairement votre activité professionnelle pour vous occuper d'un proche.", time: '10:31' },
        { id: '4', from: 'bot', text: "Souhaitez-vous que je vous aide à constituer votre dossier ?", time: '10:32' },
    ]);
    const [showPaywall, setShowPaywall] = useState(true);
    const [showPricingScreen, setShowPricingScreen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'decouverte' | 'essentiel' | 'serenite'>('essentiel');
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const plans = [
        {
            id: 'decouverte' as const,
            name: 'Découverte',
            price: 'Gratuit',
            priceSuffix: '',
            features: ['Conseils personnalisés', 'Ressources éducatives', 'Questionnaires'],
        },
        {
            id: 'essentiel' as const,
            name: 'Essentiel',
            price: '6,99€',
            priceSuffix: '/mois',
            features: ['Suivi santé via IA', 'Alertes & recommandations', 'Rappels adaptés', 'Chat assistant'],
            recommended: true,
        },
        {
            id: 'serenite' as const,
            name: 'Sérénité',
            price: '59,99€',
            priceSuffix: '/mois',
            features: ['Pack Essentiel inclus', 'Infirmier·e dédié·e', 'Orientation locale', 'Aide aux démarches'],
        },
    ];

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [messages]);

    const send = () => {
        if (!input.trim()) return;
        setInput('');
    };

    return (
        <div className="flex flex-col h-full -mx-6 -mt-4 relative">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-[#D6EDF0] bg-[#E8F4F8]/80 backdrop-blur-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A6B5A] flex items-center justify-center text-white font-bold text-sm">M</div>
                    <div className="flex-1">
                        <h3 className="font-bold text-[15px] text-[#1A1A2E]">Monka Assistant</h3>
                        <p className="text-[11px] text-[#1A6B5A] font-medium">En ligne</p>
                    </div>
                    {showPaywall && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D6EDF0]">
                            <Lock size={12} weight="bold" className="text-[#1A6B5A]" />
                            <span className="text-[11px] font-medium text-[#1A6B5A]">Abonnement</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Messages (blurred when paywall active) */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
                style={showPaywall ? { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.6 } : {}}
            >
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-[20px] px-4 py-3 ${msg.from === 'user'
                            ? 'bg-[#1A1A2E] text-white rounded-br-[8px]'
                            : 'bg-white text-[#1A1A2E] rounded-bl-[8px] border border-[#E5E5EA]'
                            }`}>
                            <p className="text-[14px] leading-relaxed">{msg.text}</p>
                            <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-white/50' : 'text-[#C8CCD0]'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input (blurred when paywall active) */}
            <div
                className="px-4 py-3 border-t border-[#E5E5EA] bg-white/90 backdrop-blur-sm mb-20"
                style={showPaywall ? { filter: 'blur(2px)', pointerEvents: 'none' } : {}}
            >
                <div className="flex items-center gap-2 bg-[#E8F4F8] rounded-full px-4 py-2">
                    <button className="text-[#C8CCD0] hover:text-[#1A1A2E]"><Smiley size={22} weight="bold" /></button>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && send()}
                        placeholder="Écrire un message..."
                        className="flex-1 bg-transparent text-[14px] text-[#1A1A2E] placeholder:text-[#C8CCD0] outline-none"
                    />
                    <button onClick={send} className="w-8 h-8 bg-[#1A6B5A] rounded-full flex items-center justify-center text-white transition-colors active:scale-90">
                        <PaperPlaneRight size={16} weight="bold" />
                    </button>
                </div>
            </div>

            {/* ─── PAYWALL OVERLAY ─── */}
            {showPaywall && (
                <div
                    className="absolute inset-0 z-20 flex flex-col justify-end"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(232,244,248,0.4) 40%, rgba(232,244,248,0.9) 60%)',
                    }}
                >
                    {/* Bottom sheet */}
                    <div
                        className="rounded-t-[24px] px-5 pt-5 pb-5"
                        style={{
                            background: '#FFFFFF',
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
                        }}
                    >
                        {/* Handle bar */}
                        <div className="flex justify-center mb-4">
                            <div className="w-10 h-1 rounded-full bg-[#D6EDF0]" />
                        </div>

                        {/* Header — empathetic, not sales-y */}
                        <div className="text-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-[#E8F4F8] flex items-center justify-center mx-auto mb-3">
                                <HandHeart size={24} weight="regular" className="text-[#1A6B5A]" />
                            </div>
                            <h3 className="text-[17px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Accédez à votre accompagnement
                            </h3>
                            <p className="text-[13px] text-[#8E8E93] mt-1">
                                Posez vos questions, nous sommes là pour vous
                            </p>
                        </div>

                        {/* Plan cards — Monka style: white bg, teal border highlight */}
                        <div className="space-y-2 mb-4">
                            {plans.map(plan => (
                                <button
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className="w-full rounded-2xl p-3.5 text-left transition-all duration-150 flex items-center gap-3"
                                    style={{
                                        background: selectedPlan === plan.id ? '#F0FAF7' : '#FAFAFA',
                                        border: selectedPlan === plan.id ? '2px solid #1A6B5A' : '1.5px solid #E8E8ED',
                                    }}
                                >
                                    {/* Radio circle */}
                                    <div
                                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                        style={{
                                            borderColor: selectedPlan === plan.id ? '#1A6B5A' : '#C8CCD0',
                                            background: selectedPlan === plan.id ? '#1A6B5A' : 'transparent',
                                        }}
                                    >
                                        {selectedPlan === plan.id && (
                                            <Check size={12} weight="bold" className="text-white" />
                                        )}
                                    </div>

                                    {/* Plan info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px] font-semibold text-[#1A1A2E]">{plan.name}</span>
                                            {plan.recommended && (
                                                <span className="text-[9px] font-semibold text-[#1A6B5A] bg-[#E8F4F8] px-1.5 py-0.5 rounded-full">
                                                    Recommandé
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-[#8E8E93] mt-0.5">
                                            {plan.features.slice(0, 2).join(' · ')}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-[16px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                            {plan.price}
                                        </span>
                                        {plan.priceSuffix && (
                                            <span className="text-[10px] text-[#8E8E93]">{plan.priceSuffix}</span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* CTA — Monka teal, simple and solid */}
                        <button
                            onClick={() => setShowPaywall(false)}
                            className="w-full py-3.5 rounded-2xl text-white font-semibold text-[15px] transition-all duration-150 active:scale-[0.98]"
                            style={{
                                background: '#1A6B5A',
                                fontFamily: "'Outfit', sans-serif",
                            }}
                        >
                            {selectedPlan === 'decouverte' ? 'Commencer' : `S'abonner`}
                        </button>

                        {/* Trial note */}
                        {selectedPlan !== 'decouverte' && (
                            <p className="text-center text-[11px] text-[#8E8E93] mt-2.5">
                                Essai gratuit de 7 jours · Sans engagement
                            </p>
                        )}

                        {/* "Voir les abonnements" link — opens pricing screen */}
                        <button
                            onClick={() => setShowPricingScreen(true)}
                            className="w-full text-center text-[13px] text-[#1A6B5A] font-medium mt-2 py-2"
                        >
                            Voir le détail des offres
                        </button>
                    </div>
                </div>
            )}

            {/* ─── PRICING SCREEN OVERLAY ─── */}
            {showPricingScreen && (
                <div
                    className="absolute inset-0 z-30 flex flex-col bg-[#E8F4F8]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 pt-14 pb-3">
                        <button
                            onClick={() => setShowPricingScreen(false)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        >
                            <ArrowLeft size={16} weight="bold" className="text-[#1A1A2E]" />
                        </button>
                        <h2 className="text-[18px] font-bold text-[#1A1A2E]">Nos offres</h2>
                    </div>

                    {/* Subtitle */}
                    <div className="px-5 mb-2">
                        <p className="text-[13px] text-[#6B8A8E] leading-relaxed">
                            Choisissez l&apos;accompagnement qui vous correspond.
                            <br />Changez de formule à tout moment.
                        </p>
                    </div>

                    {/* Center zone — cards + dots */}
                    <div className="flex-1 flex flex-col justify-center">
                        {/* Pricing Cards — horizontal swipe */}
                        <div
                            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-5 pr-5 pt-4 pb-3 no-scrollbar"
                            onWheel={(e) => {
                                if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                                    e.currentTarget.scrollLeft += e.deltaY;
                                }
                            }}
                        >
                            {MONKA_PLANS.map((plan, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const planId = ['decouverte', 'essentiel', 'serenite'][i] as typeof selectedPlan;
                                        setSelectedPlan(planId);
                                        setShowPaywall(false);
                                        setShowPricingScreen(false);
                                    }}
                                    className="snap-center flex-shrink-0 text-left"
                                    style={{ width: '65%' }}
                                >
                                    <PricingCard plan={plan} />
                                </button>
                            ))}
                        </div>

                        {/* Scroll indicator dots */}
                        <div className="flex justify-center gap-1.5 py-2">
                            <div className="w-5 h-1 rounded-full bg-[#1A1A2E]" />
                            <div className="w-1.5 h-1 rounded-full bg-[#C8CCD0]" />
                            <div className="w-1.5 h-1 rounded-full bg-[#C8CCD0]" />
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="px-5 pb-6 text-center">
                        <p className="text-[11px] text-[#8A9EA2]">
                            Sans engagement · Annulation en 1 clic
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   RESOURCES SCREEN
═══════════════════════════════════════════════════════ */
const ResourcesScreen = ({ onSelectArticle, onSelectGuide }: { onSelectArticle: (article: Article) => void; onSelectGuide: (guide: ActionableAdvice) => void }) => {
    const [resourceTab, setResourceTab] = useState<'articles' | 'guides'>('articles');
    const [activeCategory, setActiveCategory] = useState<string>('Comprendre');

    const filteredArticles = articles.filter(a => a.category === activeCategory);

    const featuredArticle = filteredArticles[0];
    const restArticles = filteredArticles.slice(1);

    const priorityConfig: Record<string, { bg: string; text: string; label: string }> = {
        urgent: { bg: '#FEF3C7', text: '#D97706', label: 'À faire rapidement' },
        recommended: { bg: '#E8F4F8', text: '#2C8C99', label: 'Conseillé' },
        optional: { bg: '#F3F4F6', text: '#6B7280', label: 'Quand vous êtes prêt·e' },
    };

    const domainColors: Record<string, { bg: string; text: string; label: string }> = {
        S: { bg: '#EFF6FF', text: '#2563EB', label: 'Santé' },
        R: { bg: '#ECFDF5', text: '#059669', label: 'Répit' },
        A: { bg: '#FDF2F8', text: '#DB2777', label: 'Démarches' },
        F: { bg: '#FFF7ED', text: '#EA580C', label: 'Famille' },
        M: { bg: '#F5F3FF', text: '#7C3AED', label: 'Médical' },
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4" data-tour="resources-header">
                <div>
                    <h1 className="text-[22px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Mes ressources
                    </h1>
                    <p className="text-[13px] text-[#8E8E93] mt-0.5">
                        Articles et guides pour vous accompagner
                    </p>
                </div>
            </div>

            {/* ═══ SUB-TABS ═══ */}
            <div className="flex gap-1 bg-[#F3F4F6] rounded-[14px] p-1 mb-5">
                {(['articles', 'guides'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setResourceTab(tab)}
                        className={`flex-1 py-2 rounded-[10px] text-[13px] font-semibold transition-all ${resourceTab === tab
                            ? 'bg-white text-[#1A1A2E] shadow-sm'
                            : 'text-[#8E8E93] hover:text-[#6B7280]'
                            }`}
                    >
                        {tab === 'articles' ? '📖 Articles' : '📋 Guides'}
                    </button>
                ))}
            </div>

            {/* ═══ ARTICLES TAB ═══ */}
            {resourceTab === 'articles' && <>
                {/* Category pills */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-1 px-1">
                    {RESOURCE_CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${activeCategory === cat
                                ? 'bg-[#1A1A2E] text-white shadow-md shadow-black/10'
                                : 'bg-white text-[#6B7280] border border-[#E5E5EA] hover:border-[#2C8C99] hover:text-[#2C8C99]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured article */}
                {featuredArticle && (
                    <button
                        onClick={() => onSelectArticle(featuredArticle)}
                        className="w-full mb-6 text-left group"
                    >
                        <div className="relative rounded-[20px] overflow-hidden shadow-lg shadow-black/8">
                            <div className="h-[180px] overflow-hidden">
                                <img
                                    src={featuredArticle.imageUrl}
                                    alt={featuredArticle.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span
                                        className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{
                                            background: (domainColors[featuredArticle.domain] || domainColors.S).bg,
                                            color: (domainColors[featuredArticle.domain] || domainColors.S).text,
                                        }}
                                    >
                                        {featuredArticle.category}
                                    </span>
                                    <span className="text-white/70 text-[11px]">{featuredArticle.readingTime} min</span>
                                </div>
                                <h3 className="text-white font-bold text-[16px] leading-tight">{featuredArticle.title}</h3>
                                <p className="text-white/80 text-[12px] mt-1 line-clamp-2">{featuredArticle.description}</p>
                            </div>
                        </div>
                    </button>
                )}

                {/* Section heading */}
                <div className="mb-4">
                    <h2 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-3">
                        {activeCategory}
                    </h2>
                </div>

                {/* Article cards */}
                <div className="space-y-3 mb-8">
                    {restArticles.map(art => {
                        const dc = domainColors[art.domain] || domainColors.S;
                        return (
                            <button
                                key={art.id}
                                onClick={() => onSelectArticle(art)}
                                className="w-full flex gap-3 bg-white rounded-[16px] p-3 border border-[#E5E5EA] shadow-sm text-left hover:shadow-md hover:border-[#D1D5DB] transition-all active:scale-[0.99]"
                            >
                                <div className="w-[80px] h-[80px] rounded-[12px] overflow-hidden flex-shrink-0">
                                    <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                                style={{ background: dc.bg, color: dc.text }}
                                            >
                                                {art.category}
                                            </span>
                                        </div>
                                        <h4 className="text-[14px] font-semibold text-[#1A1A2E] line-clamp-2 leading-tight">{art.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1.5">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                        <span className="text-[11px] text-[#8E8E93]">{art.readingTime} min de lecture</span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D6EDF0] rounded-[20px] p-5 text-center mb-4">
                    <p className="text-[14px] font-semibold text-[#1A1A2E] mb-1">Du nouveau chaque semaine</p>
                    <p className="text-[12px] text-[#6B7280]">De nouveaux articles adaptés à votre situation sont ajoutés régulièrement.</p>
                </div>
            </>}

            {/* ═══ GUIDES TAB ═══ */}
            {resourceTab === 'guides' && <>
                <div className="mb-4">
                    <h2 className="font-bold text-[13px] uppercase tracking-[0.08em] text-[#C8CCD0] mb-1">Vos guides pratiques</h2>
                    <p className="text-[12px] text-[#8E8E93]">Des procédures détaillées, étape par étape</p>
                </div>

                {/* Group guides by domain/theme */}
                {(['R', 'A', 'S', 'F', 'M'] as const).map(domain => {
                    const guidesForDomain = actionableAdvices.filter(g => g.domain === domain);
                    if (guidesForDomain.length === 0) return null;
                    const theme = ThemeColors[domain];
                    return (
                        <div key={domain} className="mb-6">
                            {/* Theme section header with colored circle */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${theme.color}15` }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        {theme.label}
                                    </h3>
                                    <span className="text-[11px] text-[#8E8E93]">{guidesForDomain.length} guide{guidesForDomain.length > 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {/* Guide cards for this theme */}
                            <div className="space-y-2.5 ml-1">
                                {guidesForDomain.map(guide => {
                                    const pc = priorityConfig[guide.priority] || priorityConfig.recommended;
                                    return (
                                        <button
                                            key={guide.id}
                                            onClick={() => onSelectGuide(guide)}
                                            className="w-full text-left bg-white rounded-[14px] p-3.5 border border-[#E5E5EA] shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all active:scale-[0.99]"
                                        >
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span
                                                    className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                                    style={{ background: pc.bg, color: pc.text }}
                                                >
                                                    {pc.label}
                                                </span>
                                            </div>
                                            <h4 className="text-[14px] font-semibold text-[#1A1A2E] mb-1">{guide.title}</h4>
                                            <p className="text-[12px] text-[#6B7280] mb-2.5 line-clamp-1">{guide.subtitle}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[11px] text-[#8E8E93]">📋 {guide.steps.length} étapes</span>
                                                <span className="text-[11px] text-[#8E8E93]">⏱ {guide.estimatedTime}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </>}
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   COMMUNITY SCREEN
═══════════════════════════════════════════════════════ */
const CommunityScreen = ({ initialProCategory }: { initialProCategory?: string }) => {
    const [proSearch, setProSearch] = useState('');
    const [proCategory, setProCategory] = useState(initialProCategory || 'sante');
    const [selectedPro, setSelectedPro] = useState<Professional | null>(null);

    // Sync category when navigating from micro-tasks
    useEffect(() => {
        if (initialProCategory) {
            setProCategory(initialProCategory);
        }
    }, [initialProCategory]);

    const filteredPros = professionals.filter(p => {
        const matchesCategory = p.category === proCategory;
        const matchesSearch = !proSearch || p.name.toLowerCase().includes(proSearch.toLowerCase()) || p.specialty.toLowerCase().includes(proSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <h1 className="text-2xl font-bold text-[#1A1A2E] mb-1" data-tour="community-header" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Mes professionnels
            </h1>
            <p className="text-[14px] text-[#8E8E93] mb-4">Les professionnels de votre territoire, sélectionnés pour vous.</p>

            {/* Search bar */}
            <div className="relative mb-4">
                <MagnifyingGlass size={18} weight="bold" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                <input
                    value={proSearch}
                    onChange={e => setProSearch(e.target.value)}
                    placeholder="Rechercher un professionnel…"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-[14px] border border-[#E5E5EA] text-[14px] text-[#1A1A2E] placeholder:text-[#C8CCD0] outline-none focus:border-[#1A6B5A] focus:ring-2 focus:ring-[#1A6B5A]/10 transition-all"
                />
            </div>

            {/* Category chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 -mx-1 px-1">
                {PRO_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setProCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${proCategory === cat.id
                            ? 'bg-[#1A6B5A] text-white shadow-md shadow-[#1A6B5A]/20'
                            : 'bg-white text-[#6B7280] border border-[#E5E5EA] hover:border-[#1A6B5A] hover:text-[#1A6B5A]'
                            }`}
                    >
                        <span className="text-[14px]">{cat.icon}</span>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* ─── Interactive Map ─── */}
            <ProMap professionals={filteredPros} selectedPro={selectedPro} onSelectPro={setSelectedPro} />

            {/* Results count */}
            <div className="flex items-center justify-between mb-3 mt-4">
                <div className="flex items-center gap-1.5">
                    <MapPin size={13} weight="fill" className="text-[#1A6B5A]" />
                    <span className="text-[12px] text-[#8E8E93]">{filteredPros.length} professionnels trouvés</span>
                </div>
                {selectedPro && (
                    <button
                        onClick={() => setSelectedPro(null)}
                        className="text-[11px] text-[#1A6B5A] font-semibold"
                    >
                        Voir tous
                    </button>
                )}
            </div>

            {/* Professional cards — clickable, sync with map */}
            <div className="space-y-2.5 mb-8">
                {filteredPros.map(pro => {
                    const isSelected = selectedPro?.id === pro.id;
                    return (
                        <button
                            key={pro.id}
                            onClick={() => setSelectedPro(isSelected ? null : pro)}
                            className={`w-full text-left rounded-[16px] p-3.5 transition-all active:scale-[0.98] ${isSelected
                                ? 'bg-[#F0FAF7] border-2 border-[#1A6B5A]/30 shadow-md shadow-[#1A6B5A]/8'
                                : 'bg-white border border-[#E5E5EA] hover:border-[#D6EDF0]'
                                }`}
                            style={{ boxShadow: isSelected ? undefined : '0 1px 4px rgba(0,0,0,0.03)' }}
                        >
                            <div className="flex gap-3">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={pro.avatar}
                                        alt={pro.name}
                                        className="w-11 h-11 rounded-full"
                                    />
                                    {pro.isPartner && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#1A6B5A] rounded-full flex items-center justify-center border-[1.5px] border-white">
                                            <Check size={8} weight="bold" className="text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[13px] font-semibold text-[#1A1A2E] truncate">{pro.name}</h4>
                                        {pro.isPartner && (
                                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#D6EDF0] text-[#1A6B5A] uppercase tracking-wider flex-shrink-0">Partenaire</span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-[#8E8E93] mt-0.5">{pro.specialty}</p>
                                    <div className="flex items-center gap-2.5 mt-1.5">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={10} weight="fill" className="text-[#C8CCD0]" />
                                            <span className="text-[10px] text-[#8E8E93]">{pro.distance}</span>
                                        </div>
                                        {pro.rating && (
                                            <div className="flex items-center gap-0.5">
                                                <Star size={10} weight="fill" className="text-amber-400" />
                                                <span className="text-[10px] text-[#8E8E93]">{pro.rating}</span>
                                            </div>
                                        )}
                                        {pro.note && (
                                            <span className="text-[9px] text-[#1A6B5A] font-medium truncate">💡 {pro.note}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Call CTA */}
                                <a
                                    href={`tel:${pro.phone.replace(/\s/g, '')}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-shrink-0 self-center w-9 h-9 rounded-full bg-[#1A6B5A] flex items-center justify-center text-white shadow-sm shadow-[#1A6B5A]/15 hover:bg-[#155A4A] active:scale-90 transition-all"
                                >
                                    <PhoneCall size={16} weight="fill" />
                                </a>
                            </div>
                        </button>
                    );
                })}
            </div>
        </>
    );
};

/* ═══════════════════════════════════════════════════════
   CHAT IDEC SCREEN — with Paywall
═══════════════════════════════════════════════════════ */
const ChatIDECScreen = () => {
    const [showPricingScreen, setShowPricingScreen] = useState(false);
    const fakeMessages = [
        { id: 1, from: 'idec', text: 'Bonjour Marie ! Comment allez-vous aujourd\'hui ?', time: '09:12' },
        { id: 2, from: 'user', text: 'Bonjour, j\'ai une question sur le renouvellement de l\'APA...', time: '09:14' },
        { id: 3, from: 'idec', text: 'Bien sûr ! Le renouvellement de l\'APA se fait automatiquement, mais vous devez signaler tout changement de situation. Voulez-vous que je vous guide ?', time: '09:15' },
        { id: 4, from: 'user', text: 'Oui, l\'état de santé de mon père s\'est dégradé depuis l\'évaluation.', time: '09:17' },
        { id: 5, from: 'idec', text: 'Je comprends. Dans ce cas, vous pouvez demander une réévaluation du plan d\'aide. Je vous prépare la démarche étape par étape.', time: '09:18' },
    ];

    return (
        <div className="relative">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5" data-tour="chat-header">
                <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2C8C99] to-[#1A6B75] flex items-center justify-center">
                        <FirstAid size={22} weight="fill" className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#10B981] rounded-full border-2 border-[#E8F4F8]" />
                </div>
                <div>
                    <h1 className="text-[18px] font-bold text-[#1A1A2E]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Chat IDEC
                    </h1>
                    <p className="text-[12px] text-[#10B981] font-medium">En ligne • Temps de réponse ~5 min</p>
                </div>
            </div>

            {/* Chat messages — blurred behind paywall */}
            <div className="relative">
                <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' }}>
                    <div className="space-y-3 mb-4">
                        {fakeMessages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[75%] px-4 py-2.5 rounded-[18px] ${msg.from === 'user'
                                        ? 'bg-[#2C8C99] text-white rounded-br-[6px]'
                                        : 'bg-white text-[#1A1A2E] border border-[#E5E5EA] rounded-bl-[6px]'
                                        }`}
                                    style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                                >
                                    <p className="text-[14px] leading-relaxed">{msg.text}</p>
                                    <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-white/60' : 'text-[#8E8E93]'} text-right`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fake input bar */}
                    <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-[#E5E5EA]">
                        <Smiley size={22} className="text-[#C8CCD0]" />
                        <span className="flex-1 text-[14px] text-[#C8CCD0]">Écrire un message…</span>
                        <PaperPlaneRight size={22} className="text-[#C8CCD0]" />
                    </div>
                </div>

                {/* ═══ PAYWALL OVERLAY ═══ */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(232,244,248,0.3) 0%, rgba(232,244,248,0.95) 40%, rgba(232,244,248,1) 100%)' }}>
                    <div className="text-center px-6 py-8 max-w-[300px]">
                        {/* Lock icon */}
                        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#2C8C99] to-[#1A6B75] flex items-center justify-center mb-5" style={{ boxShadow: '0 8px 32px rgba(44,140,153,0.25)' }}>
                            <Lock size={28} weight="bold" className="text-white" />
                        </div>

                        <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Accès Premium
                        </h2>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
                            Échangez directement avec un·e <strong className="text-[#2C8C99]">Infirmier·e De Coordination</strong> pour toutes vos questions sur le parcours de soins de votre proche.
                        </p>

                        {/* Benefits chips */}
                        <div className="space-y-2 mb-6">
                            {[
                                { icon: '💬', text: 'Réponses personnalisées en ~5 min' },
                                { icon: '🩺', text: 'Expertise médicale et administrative' },
                                { icon: '📋', text: 'Suivi de vos démarches' },
                            ].map((b, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white rounded-[12px] px-4 py-2.5 border border-[#E5E5EA] text-left" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                                    <span className="text-[16px]">{b.icon}</span>
                                    <span className="text-[13px] text-[#1A1A2E] font-medium">{b.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => setShowPricingScreen(true)}
                            className="w-full py-3.5 rounded-[14px] text-[15px] font-bold text-white transition-all active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                            }}
                        >
                            Débloquer le Chat IDEC
                        </button>
                        <button
                            onClick={() => setShowPricingScreen(true)}
                            className="text-[12px] text-[#2C8C99] font-medium mt-2.5 py-1"
                        >
                            Voir les offres
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── PRICING SCREEN ─── */}
            {showPricingScreen && (
                <div
                    className="absolute inset-0 z-30 flex flex-col bg-[#E8F4F8] rounded-[20px]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 pt-5 pb-3">
                        <button
                            onClick={() => setShowPricingScreen(false)}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        >
                            <ArrowLeft size={16} weight="bold" className="text-[#1A1A2E]" />
                        </button>
                        <h2 className="text-[18px] font-bold text-[#1A1A2E]">Nos offres</h2>
                    </div>

                    <div className="px-5 mb-2">
                        <p className="text-[13px] text-[#6B8A8E] leading-relaxed">
                            Le Chat IDEC est inclus dans le pack Sérénité.
                        </p>
                    </div>

                    {/* Center zone — cards + dots */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div
                            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-5 pr-5 pt-4 pb-3 no-scrollbar"
                            onWheel={(e) => {
                                if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                                    e.currentTarget.scrollLeft += e.deltaY;
                                }
                            }}
                        >
                            {MONKA_PLANS.map((plan, i) => (
                                <div key={i} className="snap-center flex-shrink-0" style={{ width: '65%' }}>
                                    <PricingCard plan={plan} />
                                </div>
                            ))}
                        </div>

                        {/* Scroll indicator dots */}
                        <div className="flex justify-center gap-1.5 py-2">
                            <div className="w-5 h-1 rounded-full bg-[#1A1A2E]" />
                            <div className="w-1.5 h-1 rounded-full bg-[#C8CCD0]" />
                            <div className="w-1.5 h-1 rounded-full bg-[#C8CCD0]" />
                        </div>
                    </div>

                    <div className="px-5 pb-6 text-center">
                        <p className="text-[11px] text-[#8A9EA2]">
                            Sans engagement · Annulation en 1 clic
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   ONBOARDING OVERLAY
═══════════════════════════════════════════════════════ */
const ONBOARDING_SLIDES = [
    {
        image: '/onboarding_welcome.png',
        title: 'Bienvenue sur Monka',
        subtitle: 'Votre compagnon au quotidien',
        description: 'Monka vous accompagne pas à pas dans votre rôle d\'aidant — démarches, soins, bien-être, organisation du quotidien.',
        highlight: 'Vous n\'êtes plus seul·e.',
    },
    {
        image: '/onboarding_idec.png',
        title: 'Votre IDEC, c\'est quoi ?',
        subtitle: 'Infirmier·e De Coordination',
        description: 'Un·e professionnel·le de santé qui coordonne tout le parcours de soins de votre proche — médecins, spécialistes, aides à domicile.',
        highlight: 'Monka met cette coordination à portée de main.',
    },
    {
        image: '/onboarding_benefits.png',
        title: 'Ce que Monka vous apporte',
        subtitle: 'Un accompagnement complet',
        description: '',
        benefits: [
            { icon: <CheckCircle size={24} weight="fill" color="#2C8C99" />, text: 'Des actions concrètes, étape par étape, adaptées à votre situation' },
            { icon: <ClipboardText size={24} weight="fill" color="#7C4DFF" />, text: 'Un suivi personnalisé qui évolue avec vos besoins' },
            { icon: <UsersIcon size={24} weight="fill" color="#E5793B" />, text: 'Un cercle d\'aidants pour avancer ensemble' },
        ],
        highlight: 'Prêt·e à découvrir ?',
    },
    {
        image: '/onboarding_benefits.png',
        title: 'Un agenda partagé',
        subtitle: 'Coordonnez-vous en famille',
        description: 'Planifiez les rendez-vous, les gardes et les tâches du quotidien avec votre cercle d\'aidants. Tout le monde voit qui fait quoi, quand.',
        highlight: 'Fini les oublis et les doublons.',
    },
    {
        image: '/onboarding_questionnaire.png',
        title: 'Un questionnaire pour vous connaître',
        subtitle: 'Quelques minutes pour tout personnaliser',
        description: 'Avant de commencer, nous allons vous poser quelques questions sur votre situation et celle de votre proche. C\'est grâce à vos réponses que Monka peut créer un parcours vraiment adapté à vos besoins.',
        highlight: 'Vos réponses restent strictement confidentielles.',
    },
    {
        type: 'radar' as const,
        image: '',
        title: 'On a appris à vous connaître',
        subtitle: 'Votre parcours est prêt',
        description: '',
        highlight: 'Monka s\'adapte à votre situation.',
    },
];

/* ── Profile Analysis — spider chart premium ── */
const SPIDER_DOMAINS = [
    { label: 'Santé', target: 72 },
    { label: 'Vie sociale', target: 45 },
    { label: 'Famille', target: 88 },
    { label: 'Administratif', target: 35 },
    { label: 'Suivi médical', target: 60 },
];
const SPIDER_TEAL = '#2C8C99';

const ProfileAnalysisView = ({ active }: { active: boolean }) => {
    const [values, setValues] = useState(SPIDER_DOMAINS.map(() => 0));
    const [phase, setPhase] = useState<'scanning' | 'building' | 'done'>('scanning');
    const [revealedAxes, setRevealedAxes] = useState(0);
    const [revealedDots, setRevealedDots] = useState(0);
    const [glowPulse, setGlowPulse] = useState(false);

    useEffect(() => {
        if (!active) {
            setValues(SPIDER_DOMAINS.map(() => 0));
            setPhase('scanning');
            setRevealedAxes(0);
            setRevealedDots(0);
            setGlowPulse(false);
            return;
        }

        // Phase 1: scanning (1.2s) — spinner + glow
        // Phase 2: building — axes reveal one by one, then polygon grows
        const buildStart = setTimeout(() => {
            setPhase('building');

            // Stagger axis reveals (one every 300ms)
            SPIDER_DOMAINS.forEach((_, i) => {
                setTimeout(() => setRevealedAxes(prev => Math.max(prev, i + 1)), i * 300);
            });

            // Start polygon animation after axes are settled
            setTimeout(() => {
                const startTime = Date.now();
                const duration = 2000;
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Smooth ease-out quartic
                    const eased = 1 - Math.pow(1 - progress, 4);
                    setValues(SPIDER_DOMAINS.map(d => d.target * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);

                // Stagger dot reveals as polygon grows
                SPIDER_DOMAINS.forEach((_, i) => {
                    setTimeout(() => setRevealedDots(prev => Math.max(prev, i + 1)), 400 + i * 350);
                });
            }, SPIDER_DOMAINS.length * 300 + 200);
        }, 1200);

        // Phase 3: done — glow pulse
        const doneTimer = setTimeout(() => {
            setPhase('done');
            setGlowPulse(true);
        }, 1200 + SPIDER_DOMAINS.length * 300 + 200 + 2200);

        return () => {
            clearTimeout(buildStart);
            clearTimeout(doneTimer);
        };
    }, [active]);

    // Spider chart geometry — BIG
    const svgSize = 340;
    const cx = svgSize / 2, cy = svgSize / 2;
    const maxR = 110;
    const n = SPIDER_DOMAINS.length;
    const angleStep = (2 * Math.PI) / n;
    const startAngle = -Math.PI / 2;

    const getPoint = (i: number, pct: number) => {
        const angle = startAngle + i * angleStep;
        const r = (pct / 100) * maxR;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    const polyPoints = (pct: number) =>
        SPIDER_DOMAINS.map((_, i) => {
            const pt = getPoint(i, pct);
            return `${pt.x},${pt.y}`;
        }).join(' ');

    const dataPoints = values.map((v, i) => getPoint(i, v));
    const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

    // Label positions — pushed further out
    const labelPoints = SPIDER_DOMAINS.map((_, i) => getPoint(i, 125));

    return (
        <div className="flex flex-col items-center" style={{ marginTop: -8 }}>
            {/* Status */}
            <div className="flex items-center gap-2 mb-2">
                {phase === 'scanning' ? (
                    <>
                        <div
                            className="w-4 h-4 rounded-full border-2 border-[#2C8C99] border-t-transparent"
                            style={{ animation: 'spin 0.8s linear infinite' }}
                        />
                        <span className="text-[13px] text-[#8E8E93] font-medium">
                            Analyse en cours…
                        </span>
                    </>
                ) : phase === 'done' ? (
                    <>
                        <CheckCircle size={18} weight="fill" color={SPIDER_TEAL} />
                        <span className="text-[13px] font-semibold text-[#2C8C99]" style={{ animation: 'fadeIn 0.5s ease' }}>
                            Profil analysé
                        </span>
                    </>
                ) : (
                    <>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2C8C99] animate-pulse" />
                        <span className="text-[12px] text-[#8E8E93] font-medium animate-pulse">
                            Construction du profil…
                        </span>
                    </>
                )}
            </div>

            {/* Spider SVG — large */}
            <svg
                width="100%"
                height="auto"
                viewBox={`0 0 ${svgSize} ${svgSize}`}
                style={{ maxWidth: 340, aspectRatio: '1/1' }}
            >
                <defs>
                    {/* Soft teal gradient fill */}
                    <radialGradient id="spiderFill" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={SPIDER_TEAL} stopOpacity="0.30" />
                        <stop offset="100%" stopColor={SPIDER_TEAL} stopOpacity="0.06" />
                    </radialGradient>
                    {/* Glow filter — stronger */}
                    <filter id="spiderGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation={glowPulse ? 12 : 6} result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Dot glow */}
                    <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Subtle guide pentagons — 3 levels for depth */}
                {[33, 66, 100].map(level => (
                    <polygon
                        key={level}
                        points={polyPoints(level)}
                        fill="none"
                        stroke="#C8CCD0"
                        strokeWidth="0.7"
                        opacity={revealedAxes > 0 ? 0.35 : 0.1}
                        style={{ transition: 'opacity 0.8s ease' }}
                    />
                ))}

                {/* Axis lines — fade in one by one */}
                {SPIDER_DOMAINS.map((_, i) => {
                    const pt = getPoint(i, 100);
                    const isRevealed = revealedAxes > i;
                    return (
                        <line
                            key={i}
                            x1={cx} y1={cy} x2={pt.x} y2={pt.y}
                            stroke={isRevealed ? '#A0AEC0' : '#E2E8F0'}
                            strokeWidth={isRevealed ? 0.8 : 0.4}
                            opacity={isRevealed ? 0.5 : 0.15}
                            style={{ transition: 'all 0.6s ease' }}
                        />
                    );
                })}

                {/* Data polygon — glow + fill + stroke */}
                <polygon
                    points={dataPolygon}
                    fill="url(#spiderFill)"
                    stroke={SPIDER_TEAL}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    filter="url(#spiderGlow)"
                    opacity={phase === 'scanning' ? 0 : 0.9}
                    style={{ transition: 'opacity 0.5s ease' }}
                />

                {/* Data points — pop in one by one */}
                {dataPoints.map((pt, i) => {
                    const isRevealed = revealedDots > i;
                    return (
                        <circle
                            key={i}
                            cx={pt.x} cy={pt.y}
                            r={isRevealed ? (phase === 'done' ? 6 : 4) : 0}
                            fill="white"
                            stroke={SPIDER_TEAL}
                            strokeWidth="2.5"
                            filter={phase === 'done' ? 'url(#dotGlow)' : undefined}
                            style={{ transition: 'r 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                        />
                    );
                })}

                {/* Labels — fade in with axes */}
                {SPIDER_DOMAINS.map((d, i) => {
                    const isRevealed = revealedAxes > i;
                    return (
                        <text
                            key={i}
                            x={labelPoints[i].x}
                            y={labelPoints[i].y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isRevealed ? '#374151' : '#D1D5DB'}
                            fontSize="12"
                            fontWeight="600"
                            fontFamily="'Outfit', sans-serif"
                            style={{ transition: 'fill 0.5s ease, opacity 0.5s ease', opacity: isRevealed ? 1 : 0.2 }}
                        >
                            {d.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

const OnboardingOverlay = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0);
    const slide = ONBOARDING_SLIDES[step];
    const isLast = step === ONBOARDING_SLIDES.length - 1;

    return (
        <div className="absolute inset-0 z-[60] bg-[#E8F4F8] flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Top bar: Logo + Skip */}
            <div className="flex items-center justify-between px-6 pt-14">
                {/* Monka logo */}
                <div className="flex items-center">
                    <img src="/monka-logo.png" alt="Monka" className="h-8 object-contain" />
                </div>
                {!isLast && (
                    <button
                        onClick={onComplete}
                        className="text-[13px] text-[#8E8E93] font-medium z-10 hover:text-[#1A1A2E] transition-colors"
                    >
                        Passer
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center" key={step} style={{ animation: 'fadeIn 0.35s ease-out' }}>
                {/* Radar analysis slide */}
                {('type' in slide && slide.type === 'radar') ? (
                    <>
                        <ProfileAnalysisView active={true} />
                        <h1 className="text-[22px] font-bold text-[#1A1A2E] mb-1 mt-4 leading-tight">
                            {slide.title}
                        </h1>
                        <p className="text-[14px] font-semibold text-[#2C8C99] mb-3">
                            {slide.subtitle}
                        </p>
                        <p className="text-[14px] font-semibold text-[#2C8C99] mt-1">
                            {slide.highlight}
                        </p>
                    </>
                ) : (
                    <>
                        {/* Illustration */}
                        <div className="w-[160px] h-[160px] rounded-[32px] bg-white flex items-center justify-center mb-8 overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(44,140,153,0.10)' }}>
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Title */}
                        <h1 className="text-[24px] font-bold text-[#1A1A2E] mb-1 leading-tight">
                            {slide.title}
                        </h1>
                        <p className="text-[14px] font-semibold text-[#2C8C99] mb-5">
                            {slide.subtitle}
                        </p>

                        {/* Description or Benefits */}
                        {slide.description ? (
                            <p className="text-[15px] text-[#4A4A5A] leading-relaxed max-w-[300px] mb-4">
                                {slide.description}
                            </p>
                        ) : null}

                        {slide.benefits && (
                            <div className="space-y-3 mb-4 w-full max-w-[300px]">
                                {slide.benefits.map((b, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white rounded-[16px] p-4 text-left" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                        <div className="mt-0.5 flex-shrink-0">{b.icon}</div>
                                        <p className="text-[13px] text-[#1A1A2E] font-medium leading-snug">{b.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Highlight */}
                        <p className="text-[14px] font-semibold text-[#2C8C99] mt-2">
                            {slide.highlight}
                        </p>
                    </>
                )}
            </div>

            {/* Bottom: dots + button */}
            <div className="pb-12 px-8 flex flex-col items-center gap-6">
                {/* Dots */}
                <div className="flex gap-2">
                    {ONBOARDING_SLIDES.map((_, i) => (
                        <div
                            key={i}
                            className="h-[6px] rounded-full transition-all duration-300"
                            style={{
                                width: i === step ? 24 : 6,
                                backgroundColor: i === step ? '#2C8C99' : '#C8CCD0',
                            }}
                        />
                    ))}
                </div>

                {/* CTA */}
                <button
                    onClick={() => isLast ? onComplete() : setStep(s => s + 1)}
                    className="w-full py-4 rounded-[16px] text-[16px] font-bold text-white transition-all active:scale-[0.97]"
                    style={{
                        background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                        boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                    }}
                >
                    {isLast ? 'Commencer' : 'Suivant'}
                </button>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   MAIN APP SHELL
═══════════════════════════════════════════════════════ */
export default function DemoApp() {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [showProductTour, setShowProductTour] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [activeTab, setActiveTab] = useState<TabId>('home');
    const [screenStack, setScreenStack] = useState<Screen[]>([{ type: 'tab', tab: 'home' }]);
    const [toggledTasks, setToggledTasks] = useState<Record<string, boolean>>({});
    const [pendingProCategory, setPendingProCategory] = useState<string | undefined>(undefined);
    const [showSidebar, setShowSidebar] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Build lookup: micro-task ID → linked ActionableAdvice
    const guidedActionsByTaskId = useMemo(() => {
        const map: Record<string, ActionableAdvice> = {};
        actionableAdvices.forEach(a => {
            // Only assign guide to the FIRST linked micro-task to avoid duplication
            const firstId = a.linkedMicroTaskIds?.[0];
            if (firstId) { map[firstId] = a; }
        });
        return map;
    }, []);

    const currentScreen = screenStack[screenStack.length - 1];

    const pushScreen = useCallback((screen: Screen) => {
        setScreenStack(prev => [...prev, screen]);
        setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }, []);

    const popScreen = useCallback(() => {
        setScreenStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
        setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }, []);

    const switchTab = useCallback((tab: string) => {
        const tabId = tab as TabId;
        setActiveTab(tabId);
        setScreenStack([{ type: 'tab', tab: tabId }]);
        scrollRef.current?.scrollTo({ top: 0 });
    }, []);

    const handleToggleTask = useCallback((taskId: string) => {
        setToggledTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    }, []);

    // Determine if we're in a drill-down (hide bottom nav)
    const isInDrillDown = currentScreen.type !== 'tab';

    const renderScreen = () => {
        const openArticle = (art: Article) => pushScreen({ type: 'articleReader', article: art });

        const resolveProCategory = (contactName?: string) => {
            const cn = contactName?.toLowerCase() || '';
            let cat = 'social';
            if (cn.includes('médecin') || cn.includes('psychologue') || cn.includes('infirm') || cn.includes('kiné')) cat = 'sante';
            else if (cn.includes('mairie') || cn.includes('cpam') || cn.includes('caf') || cn.includes('mdph') || cn.includes('retraite') || cn.includes('autonomie')) cat = 'administratif';
            else if (cn.includes('admr') || cn.includes('ergo') || cn.includes('accueil de jour') || cn.includes('domicile')) cat = 'domicile';
            setPendingProCategory(cat);
            switchTab('community');
        };

        switch (currentScreen.type) {
            case 'tab':
                switch (currentScreen.tab) {
                    case 'home':
                        return <HomeScreen onSelectTheme={(v) => pushScreen({ type: 'themeDetail', vulnerability: v })} onSelectArticle={openArticle} onSelectGuide={(guide) => pushScreen({ type: 'guideDetail', guide })} toggledTasks={toggledTasks} onAvatarPress={() => setActiveTab('home')} onMenuPress={() => setShowSidebar(true)} />;
                    case 'monsuivi':
                        return <MonSuiviScreen toggledTasks={toggledTasks} onToggleTask={handleToggleTask} onSelectTheme={(v) => pushScreen({ type: 'themeDetail', vulnerability: v })} onSelectProgram={(v, mp) => pushScreen({ type: 'programDetail', vulnerability: v, program: mp })} />;
                    case 'chat':
                        return <ChatIDECScreen />;
                    case 'community':
                        return <CommunityScreen initialProCategory={pendingProCategory} />;
                    case 'resources':
                        return <ResourcesScreen onSelectArticle={openArticle} onSelectGuide={(guide) => pushScreen({ type: 'guideDetail', guide })} />;
                }
                break;
            case 'themeDetail':
                return (
                    <ThemeDetailScreen
                        vulnerability={currentScreen.vulnerability}
                        onBack={popScreen}
                        onSelectProgram={(mp) => pushScreen({ type: 'programDetail', vulnerability: currentScreen.vulnerability, program: mp })}
                        toggledTasks={toggledTasks}
                    />
                );
            case 'programDetail':
                return (
                    <ProgramDetailScreen
                        vulnerability={currentScreen.vulnerability}
                        program={currentScreen.program}
                        onBack={popScreen}
                        toggledTasks={toggledTasks}
                        onSelectReco={(reco, cat) => pushScreen({
                            type: 'recoDetail',
                            vulnerability: currentScreen.vulnerability,
                            program: currentScreen.program,
                            recommendation: reco,
                            category: cat,
                        })}
                    />
                );
            case 'recoDetail':
                return (
                    <RecoDetailScreen
                        vulnerability={currentScreen.vulnerability}
                        program={currentScreen.program}
                        recommendation={currentScreen.recommendation}
                        category={currentScreen.category}
                        onBack={popScreen}
                        toggledTasks={toggledTasks}
                        onToggleTask={handleToggleTask}
                        guidedActionsByTaskId={guidedActionsByTaskId}
                        onNavigateToProCategory={resolveProCategory}
                    />
                );
            case 'articleReader':
                return (
                    <ArticleReaderScreen
                        article={currentScreen.article}
                        onBack={popScreen}
                    />
                );
            case 'guideDetail':
                return (
                    <GuideDetailScreen
                        guide={currentScreen.guide}
                        onBack={popScreen}
                        onNavigateToProCategory={resolveProCategory}
                    />
                );
        }
    };

    const darkModeCtx = useMemo(() => ({ isDark, toggle: () => setIsDark(p => !p) }), [isDark]);

    return (
        <DarkModeContext.Provider value={darkModeCtx}>
            <div className="fixed inset-0 sm:static sm:min-h-screen flex items-center justify-center bg-[#E8F4F8] sm:bg-[#D6EDF0]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {/* Frame: full viewport on mobile, fixed iPhone size on desktop */}
                <div className="relative w-screen h-[100dvh] sm:w-[393px] sm:h-[852px]">
                    {/* Bezel: invisible on mobile, iPhone border on desktop */}
                    <div className="absolute inset-0 overflow-hidden rounded-none sm:rounded-[48px] border-0 sm:border-[8px] sm:border-[#1A1A1A] sm:shadow-[0_25px_80px_rgba(0,0,0,0.25),inset_0_0_0_2px_#333]">

                        {/* Dynamic Island — desktop only */}
                        <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 z-50 w-[120px] h-[34px] bg-black rounded-full" />

                        {/* Status bar — desktop only */}
                        <div className={`hidden sm:flex absolute top-0 left-0 right-0 z-40 pt-[14px] px-8 justify-between items-center`}>
                            <span className={`text-[12px] font-semibold ${isDark ? 'text-[#E2E8F0]' : 'text-[#1A1A2E]'}`}>
                                {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="flex items-center gap-1">
                                <svg width="16" height="12" viewBox="0 0 16 12" fill={isDark ? '#E2E8F0' : '#1A1A2E'}><rect x="0" y="3" width="3" height="9" rx="1" /><rect x="4" y="2" width="3" height="10" rx="1" /><rect x="8" y="0" width="3" height="12" rx="1" /><rect x="12" y="1" width="3" height="11" rx="1" opacity="0.3" /></svg>
                                <svg width="16" height="12" viewBox="0 0 24 24" fill={isDark ? '#E2E8F0' : '#1A1A2E'}><path d="M1.3 7.5a14.5 14.5 0 0 1 21.4 0" stroke={isDark ? '#E2E8F0' : '#1A1A2E'} strokeWidth="2" fill="none" /><path d="M5.5 11.5a9 9 0 0 1 13 0" stroke={isDark ? '#E2E8F0' : '#1A1A2E'} strokeWidth="2" fill="none" /><circle cx="12" cy="17" r="2" /></svg>
                                <svg width="25" height="12" viewBox="0 0 25 12" fill={isDark ? '#E2E8F0' : '#1A1A2E'}><rect x="0" y="0" width="22" height="12" rx="3" stroke={isDark ? '#E2E8F0' : '#1A1A2E'} strokeWidth="1.5" fill="none" /><rect x="2" y="2" width="16" height="8" rx="1.5" fill={isDark ? '#E2E8F0' : '#1A1A2E'} /><rect x="23" y="4" width="2" height="4" rx="1" fill={isDark ? '#E2E8F0' : '#1A1A2E'} opacity="0.4" /></svg>
                            </div>
                        </div>

                        {/* App content — scrollable */}
                        <div
                            ref={scrollRef}
                            className={`absolute inset-0 overflow-y-auto no-scrollbar transition-colors duration-300 ${isDark ? 'bg-[#0F172A]' : 'bg-[#E8F4F8]'}`}
                        >
                            <div
                                key={`${screenStack.length}-${currentScreen.type}-${currentScreen.type === 'tab' ? currentScreen.tab : ''}`}
                                className={`px-5 pt-3 sm:px-6 sm:pt-14 animate-fadeIn pb-24 sm:pb-28`}
                                style={{
                                    animation: 'fadeIn 0.2s ease-out',
                                    transform: 'scale(0.93)',
                                    transformOrigin: 'top center',
                                    width: `${100 / 0.93}%`,
                                    marginLeft: `${-(100 / 0.93 - 100) / 2}%`,
                                }}
                            >
                                {renderScreen()}
                            </div>
                        </div>

                        {/* Onboarding overlay */}
                        {showOnboarding && (
                            <OnboardingOverlay onComplete={() => { setShowOnboarding(false); setShowProductTour(true); }} />
                        )}

                        {/* Product Tour (driver.js) — launches after onboarding */}
                        {showProductTour && (
                            <ProductTour onComplete={() => setShowProductTour(false)} switchTab={switchTab} />
                        )}

                        {/* Bottom Nav — always visible */}
                        <div className="absolute bottom-0 left-0 right-0 z-30">
                            <BottomNavPill activeTab={activeTab} onTabChange={switchTab} />
                        </div>

                        {/* Sidebar Drawer */}
                        {showSidebar && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="absolute inset-0 z-[70] bg-black/40"
                                    style={{ backdropFilter: 'blur(4px)' }}
                                    onClick={() => setShowSidebar(false)}
                                />
                                {/* Drawer */}
                                <div
                                    className="absolute top-0 left-0 bottom-0 z-[80] w-[75%] max-w-[280px]"
                                    style={{
                                        background: 'rgba(255,255,255,0.92)',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '8px 0 40px rgba(0,0,0,0.12)',
                                        animation: 'slideInLeft 0.3s ease-out',
                                    }}
                                >
                                    <div className="p-6 pt-16 flex flex-col h-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                        {/* Profile */}
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2C8C99] shadow-md">
                                                <img src={mockUser.avatar || ''} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-bold text-[#1A1A2E]">{mockUser.name}</p>
                                                <p className="text-[11px] text-[#8E8E93]">{mockUser.role}</p>
                                            </div>
                                        </div>

                                        {/* Menu items */}
                                        <div className="space-y-1 flex-1">
                                            {[
                                                { icon: <User size={20} weight="bold" />, label: 'Mon profil', desc: 'Informations personnelles' },
                                                { icon: <FileText size={20} weight="bold" />, label: 'Mes documents', desc: 'Fichiers et justificatifs' },
                                                { icon: <Bell size={20} weight="bold" />, label: 'Notifications', desc: 'Gérer les alertes' },
                                                { icon: <ShieldCheck size={20} weight="bold" />, label: 'Confidentialité', desc: 'Vie privée et données' },
                                                { icon: <Question size={20} weight="bold" />, label: 'Aide & FAQ', desc: 'Centre d\'aide' },
                                            ].map((item, i) => (
                                                <button
                                                    key={i}
                                                    className="w-full flex items-center gap-3 py-3 px-3 rounded-[12px] hover:bg-[#E8F4F8] transition-colors text-left"
                                                >
                                                    <div className="w-8 h-8 rounded-[10px] bg-[#E8F4F8] flex items-center justify-center text-[#2C8C99] flex-shrink-0">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-semibold text-[#1A1A2E]">{item.label}</p>
                                                        <p className="text-[10px] text-[#8E8E93]">{item.desc}</p>
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Dark mode toggle */}
                                            <div className="flex items-center justify-between py-3 px-3 rounded-[12px]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-[10px] bg-[#E8F4F8] flex items-center justify-center text-[#2C8C99] flex-shrink-0">
                                                        {isDark ? <Moon size={20} weight="bold" /> : <Sun size={20} weight="bold" />}
                                                    </div>
                                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">Mode sombre</p>
                                                </div>
                                                <button
                                                    onClick={() => setIsDark(d => !d)}
                                                    className={`w-10 h-6 rounded-full transition-colors relative ${isDark ? 'bg-[#2C8C99]' : 'bg-[#D1D5DB]'}`}
                                                >
                                                    <div
                                                        className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all shadow-sm"
                                                        style={{ left: isDark ? 22 : 4 }}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-[#E5E5EA]">
                                            <p className="text-[10px] text-[#C8CCD0] text-center">Monka v2.0 — Démo</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Sidebar slide-in animation */}
                        <style>{`
                            @keyframes slideInLeft {
                                from { transform: translateX(-100%); }
                                to { transform: translateX(0); }
                            }
                        `}</style>

                        {/* Home indicator — desktop only */}
                        <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-[134px] h-[5px] bg-[#1A1A1A] rounded-full opacity-30" />

                        {/* Dark mode CSS overrides */}
                        {isDark && (
                            <style>{`
                            /* Global dark mode overrides */
                            .bg-white, [class*="bg-white"] { background-color: #1E293B !important; }
                            .bg-\\[\\#E8F4F8\\] { background-color: #0F172A !important; }
                            .bg-\\[\\#F3F4F6\\] { background-color: #1E293B !important; }
                            .bg-\\[\\#F9FAFB\\] { background-color: #1E293B !important; }
                            .bg-\\[\\#FFFBEB\\] { background-color: #1E293B !important; }
                            .bg-\\[\\#F0FDF4\\] { background-color: rgba(26,107,90,0.15) !important; }
                            .bg-\\[\\#F0FAF7\\] { background-color: rgba(26,107,90,0.15) !important; }
                            .bg-\\[\\#FEF2F2\\] { background-color: rgba(239,68,68,0.1) !important; }
                            .bg-\\[\\#EEF2FF\\] { background-color: rgba(99,102,241,0.1) !important; }
                            .bg-\\[\\#EFF6FF\\] { background-color: rgba(59,130,246,0.1) !important; }
                            .bg-\\[\\#ECFDF5\\] { background-color: rgba(16,185,129,0.1) !important; }
                            .bg-\\[\\#F5F3FF\\] { background-color: rgba(139,92,246,0.1) !important; }

                            /* Text colors */
                            .text-\\[\\#1A1A2E\\] { color: #F1F5F9 !important; }
                            .text-\\[\\#374151\\] { color: #CBD5E1 !important; }
                            .text-\\[\\#4A4A5A\\] { color: #94A3B8 !important; }
                            .text-\\[\\#6B7280\\] { color: #94A3B8 !important; }
                            .text-\\[\\#8E8E93\\] { color: #64748B !important; }
                            .text-\\[\\#C8CCD0\\] { color: #475569 !important; }
                            .text-\\[\\#92400E\\] { color: #FBBF24 !important; }
                            .text-\\[\\#92770C\\] { color: #FBBF24 !important; }
                            .text-2xl { color: #F1F5F9 !important; }

                            /* Borders */
                            .border-\\[\\#E5E5EA\\], .border-\\[\\#E5E7EB\\] { border-color: #334155 !important; }
                            .border-white\\/50 { border-color: rgba(51,65,85,0.5) !important; }

                            /* Cards & containers */
                            [class*="rounded-"][class*="bg-white"],
                            [class*="rounded-"][style*="background: white"],
                            [class*="rounded-"][style*="background-color: white"] {
                                background-color: #1E293B !important;
                            }

                            /* Gradient backgrounds */
                            .bg-gradient-to-br.from-\\[\\#E8F4F8\\] { background: linear-gradient(to bottom right, #0F172A, #1E293B) !important; }
                            .bg-gradient-to-br.from-\\[\\#D6EDF0\\] { background: linear-gradient(to bottom right, #0F172A, #1E293B) !important; }

                            /* BottomNavPill glassmorphism */
                            nav[class*="rounded-full"][style*="rgba(255"] {
                                background: rgba(30,41,59,0.9) !important;
                                border-color: rgba(51,65,85,0.5) !important;
                            }

                            /* Input fields */
                            input[class*="bg-white"], input[class*="bg-\\[\\#F9FAFB\\]"], input[class*="bg-\\[\\#F3F4F6\\]"] {
                                background-color: #1E293B !important;
                                color: #F1F5F9 !important;
                                border-color: #334155 !important;
                            }
                            input::placeholder { color: #475569 !important; }

                            /* Shadows — muted in dark mode */
                            [class*="shadow-sm"], [class*="shadow-md"], [class*="shadow-lg"] {
                                --tw-shadow-color: rgba(0,0,0,0.3) !important;
                            }

                            /* Settings rows */
                            [class*="SettingsRow"], [class*="border-b"] {
                                border-color: #334155 !important;
                            }
                        `}</style>
                        )}
                    </div>
                </div>
            </div>
        </DarkModeContext.Provider>
    );
}
