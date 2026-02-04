# 📋 Stratégie d'Implémentation – Recommandations CCC

> Document technique détaillant les fichiers à modifier et la justification de chaque changement pour intégrer les recommandations CCC au simulateur.
> 
> Date : 02/02/2026

---

## 🎯 Objectif

Intégrer les **8 recommandations CCC** dans le simulateur Monka pour :
1. Afficher visuellement les recommandations CCC activées dans l'onglet "Recommandations"
2. Distinguer clairement les **recommandations CCC** (urgence composite) des **recommandations individuelles** (questions)
3. Respecter la hiérarchie visuelle : CCC en haut (priorité), questions en bas

---

## 📁 Fichiers à modifier

### 1. `/Users/antonin/monka/monka_simulator.html`

**Statut** : ✏️ **À MODIFIER**

**Sections concernées** :
- Section JavaScript `data` : Ajouter l'objet `cccRecommendations`
- Fonction `updateResults()` : Ajouter la logique de détection des CCC activées
- Fonction `updateRecommendations()` : Modifier pour afficher les CCC en priorité
- Section CSS (optionnel) : Ajouter des styles pour badge CCC distinct

---

## 🔧 Détail des modifications

### Modification 1 : Ajout des données CCC (JavaScript)

**Localisation** : Bloc JavaScript, après la définition de `microParcours`

**Contenu à ajouter** :

```javascript
const cccRecommendations = {
    'R1_CC_01': {
        code: 'R1_CC_01',
        name: 'Retentissement vie familiale + sociale/pro',
        condition: 'O27=Oui ET O28=Oui',
        reco: 'Organiser une réunion de synthèse pluridisciplinaire urgente pour sauver l\'équilibre global de l\'aidant et mettre en place un plan de soutien coordonné.',
        actor: 'IDEC (coordinateur) + Psychologue + Assistante sociale + Médecin traitant',
        tasks: [
            'Convoquer une réunion de concertation sous 7 jours avec tous les acteurs',
            'Réaliser une cartographie exhaustive des impacts (famille, travail, loisirs, santé)',
            'Co-construire un plan d\'action avec objectifs à 1 mois',
            'Mettre en place un suivi hebdomadaire pendant 1 mois',
            'Évaluer l\'éligibilité à un congé de proche aidant'
        ]
    },
    'R1_CC_02': {
        code: 'R1_CC_02',
        name: 'Aménagement professionnel + retentissement familial',
        condition: 'N7=aménagement ET O27=Oui',
        reco: 'Réévaluer en urgence l\'organisation globale avec un accompagnement sur les droits des aidants et mise en place de solutions de relais professionnelles.',
        actor: 'Assistante sociale + IDEC + Médecin du travail',
        tasks: [
            'Audit complet des aménagements déjà mis en place',
            'Informer sur le congé de proche aidant (CPF de transition, AJPA)',
            'Évaluer l\'intérêt d\'un passage à temps partiel',
            'Proposer des solutions de répit (accueil de jour, hébergement temporaire)',
            'Organiser une rencontre avec le médecin du travail'
        ]
    },
    'R2_CC_01': {
        code: 'R2_CC_01',
        name: 'Aidant seul + soutien quasi-inexistant',
        condition: 'N4=Oui ET E2=Personne',
        reco: 'Mise en place URGENTE d\'un filet de sécurité externe avec mobilisation des dispositifs institutionnels et associatifs.',
        actor: 'IDEC (référent unique) + Assistante sociale + Associations d\'aidants',
        tasks: [
            'Contact sous 48h par l\'IDEC pour confirmer la situation',
            'Inscrire l\'aidant à une association d\'entraide',
            'Activer un dispositif de "baluchonnage" ou garde itinérante',
            'Mettre en place un suivi rapproché par téléphone (1x/semaine)',
            'Préparer un plan B en cas d\'urgence',
            'Évaluer l\'éligibilité à une aide financière (PCH, APA)'
        ]
    },
    'R2_CC_02': {
        code: 'R2_CC_02',
        name: 'Charge exclusive + soutien quasi-inexistant',
        condition: 'E1=Seul ET E2=Personne',
        reco: 'Accompagnement renforcé pour identifier ou créer un réseau de soutien de substitution (professionnels + associatif).',
        actor: 'IDEC + Assistante sociale + Médiateur familial',
        tasks: [
            'Réaliser un sociogramme de l\'entourage',
            'Si entourage existe mais désengagé : proposer une médiation familiale',
            'Mettre en place des aides professionnelles',
            'Orienter vers des groupes de parole',
            'Activer un dispositif de répit mensuel minimum'
        ]
    },
    'R3_CC_01': {
        code: 'R3_CC_01',
        name: 'Isolement social du proche + faible présence',
        condition: 'N20=Oui ET O48≤1x/mois',
        reco: 'Mise en place d\'une stimulation sociale professionnelle pour le proche et accompagnement de la culpabilité de l\'aidant.',
        actor: 'Ergothérapeute + Animateur en gérontologie + IDEC',
        tasks: [
            'Proposer un accueil de jour 2-3 fois/semaine',
            'Évaluer les activités adaptées à domicile',
            'Si refus du proche : envisager des visites à domicile par bénévoles',
            'Accompagner l\'aidant sur la gestion de la culpabilité',
            'Créer un lien téléphonique régulier entre le proche et l\'aidant'
        ]
    },
    'R4_CC_01': {
        code: 'R4_CC_01',
        name: 'Ne plus reconnaître + relation tendue',
        condition: 'O30=Oui ET E4=Tendue',
        reco: 'Accompagnement psychologique urgent de l\'aidant avec psychoéducation sur la maladie et médiation relationnelle.',
        actor: 'Psychologue (spécialisé aidants) + IDEC + Neurologue/Gériatre',
        tasks: [
            'Proposer sous 7 jours un entretien psychologique individuel',
            'Organiser une séance de psychoéducation',
            'Proposer des techniques de communication adaptées',
            'Si tensions aiguës : envisager un hébergement temporaire du proche',
            'Mettre en place un groupe de parole spécifique "deuil blanc"'
        ]
    },
    'R4_CC_02': {
        code: 'R4_CC_02',
        name: 'Tensions familiales + charge exclusive',
        condition: 'E5=Oui ET E1=Seul',
        reco: 'Médiation familiale urgente pour clarifier les rôles, désamorcer les conflits et redistribuer la charge.',
        actor: 'Médiateur familial + IDEC + Notaire (si conflit patrimonial)',
        tasks: [
            'Proposer une réunion familiale sous 15 jours avec médiateur neutre',
            'Cartographier les sources de désaccord',
            'Co-construire un pacte familial avec répartition claire',
            'Si blocage : proposer une aide professionnelle',
            'Informer sur les recours juridiques si maltraitance'
        ]
    },
    'R4_CC_03': {
        code: 'R4_CC_03',
        name: 'Refus d\'aide extérieure + peur pour l\'avenir',
        condition: 'E6=Refuse ET O31=Oui',
        reco: 'Approche progressive d\'acceptation de l\'aide avec accompagnement de l\'aidant sur l\'anticipation et la gestion de crise.',
        actor: 'IDEC + Psychologue + Médecin traitant',
        tasks: [
            'Identifier les causes du refus',
            'Proposer une approche progressive',
            'Impliquer le médecin traitant pour "prescrire" l\'aide',
            'Accompagner l\'aidant à accepter le refus tout en préparant un plan B',
            'Informer sur les mesures de protection juridique'
        ]
    }
};
```

**Justification** :  
Cette structure contient toutes les données nécessaires pour afficher les recommandations CCC. Elle est indexée par code CCC pour faciliter la récupération.

---

### Modification 2 : Détection des CCC activées (fonction `updateResults()`)

**Localisation** : Fonction `updateResults()`, après le bloc de détection des CCC existant

**Code à ajouter** (après `let activatedCCC = [];`) :

```javascript
// Stockage des objets CCC complets pour affichage recommandations
let activatedCCCFull = [];
cccRules.forEach(ccc => {
    let activated = false;
    if (ccc.code === 'R1_CC_01' && answers['O27']?.score === 2 && answers['O28']?.score === 2) activated = true;
    if (ccc.code === 'R1_CC_02' && answers['N7']?.optionIndex === 1 && answers['O27']?.score === 2) activated = true;
    if (ccc.code === 'R2_CC_01' && answers['N4']?.optionIndex === 1 && answers['E2']?.score === 2) activated = true;
    if (ccc.code === 'R2_CC_02' && answers['E1']?.score === 2 && answers['E2']?.score === 2) activated = true;
    if (ccc.code === 'R3_CC_01' && answers['N20']?.score === 2 && answers['O48']?.optionIndex === 1) activated = true;
    if (ccc.code === 'R4_CC_01' && answers['O30']?.score === 2 && answers['E4']?.score === 1) activated = true;
    if (ccc.code === 'R4_CC_02' && answers['E5']?.score === 2 && answers['E1']?.score === 2) activated = true;
    if (ccc.code === 'R4_CC_03' && answers['E6']?.optionIndex === 2 && answers['O31']?.score === 2) activated = true;
    
    if (activated) {
        activatedCCC.push(ccc);
        // Récupérer l'objet complet de recommandation
        if (cccRecommendations[ccc.code]) {
            activatedCCCFull.push(cccRecommendations[ccc.code]);
        }
    }
});

// Stocker pour usage dans updateRecommendations
window.activatedCCCFull = activatedCCCFull;
```

**Justification** :  
On enrichit la détection CCC existante en stockant les objets complets de recommandations pour pouvoir les afficher ensuite.

---

### Modification 3 : Affichage des recommandations CCC (fonction `updateRecommendations()`)

**Localisation** : Fonction `updateRecommendations()`, remplacer tout le contenu

**Nouveau code** :

```javascript
function updateRecommendations() {
    const container = document.getElementById('reco-list');
    let recos = [];
    
    // Récupérer les CCC activées
    const cccActivated = window.activatedCCCFull || [];
    
    // Récupérer les recommandations individuelles
    Object.entries(answers).forEach(([qId, ans]) => {
        const q = questions.find(q => q.id === qId);
        if (q.recommendations && q.recommendations[ans.optionIndex]) {
            const r = q.recommendations[ans.optionIndex];
            recos.push({ qId, ...r });
        }
    });
    
    // Si aucune recommandation
    if (cccActivated.length === 0 && recos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">💡</div>
                <p>Répondez aux questions pour voir les recommandations</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    // Afficher les CCC en priorité
    if (cccActivated.length > 0) {
        html += '<div style="margin-bottom: 2rem;"><h4 style="color: var(--danger); margin-bottom: 1rem;">🚨 RECOMMANDATIONS CCC (Priorité Niveau 2)</h4>';
        html += cccActivated.map(ccc => `
            <div class="reco-card" style="border-left: 3px solid var(--danger); background: rgba(239, 68, 68, 0.05);">
                <div class="reco-header">
                    <span class="reco-question-id" style="color: var(--danger);">${ccc.code}</span>
                    <span class="reco-actor">${ccc.actor}</span>
                </div>
                <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted); margin-bottom: 0.5rem;">${ccc.name}</div>
                <div class="reco-text">${ccc.reco}</div>
                <div class="micro-tasks">
                    ${ccc.tasks.map(t => `<div class="micro-task">${t}</div>`).join('')}
                </div>
            </div>
        `).join('');
        html += '</div>';
    }
    
    // Afficher les recommandations individuelles
    if (recos.length > 0) {
        html += '<div><h4 style="color: var(--text-muted); margin-bottom: 1rem; font-size: 0.875rem;">📋 Recommandations par question</h4>';
        html += recos.map(r => `
            <div class="reco-card">
                <div class="reco-header">
                    <span class="reco-question-id">${r.qId}</span>
                    <span class="reco-actor">${r.actor}</span>
                </div>
                <div class="reco-text">${r.reco}</div>
                <div class="micro-tasks">
                    ${r.tasks.map(t => `<div class="micro-task">${t}</div>`).join('')}
                </div>
            </div>
        `).join('');
        html += '</div>';
    }
    
    container.innerHTML = html;
}
```

**Justification** :  
- **Hiérarchie visuelle** : CCC en haut avec badge rouge "URGENCE", recommandations individuelles en bas
- **Styling distinct** : Les CCC ont un fond légèrement rouge et bordure rouge pour les différencier
- **Séparation claire** : Titre de section pour chaque type de recommandation

---

### Modification 4 (optionnelle) : Amélioration CSS pour badge CCC

**Localisation** : Section `<style>`, à la fin

**Code à ajouter** :

```css
.ccc-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: rgba(239, 68, 68, 0.2);
    color: var(--danger);
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    margin-left: 0.5rem;
}
```

**Justification** :  
Badge réutilisable pour marquer visuellement les éléments CCC dans toute l'interface.

---

## 📋 Récapitulatif des changements

| Fichier | Type de modification | Lignes estimées | Complexité |
|---------|---------------------|-----------------|------------|
| `monka_simulator.html` | Ajout données CCC | ~150 lignes | Faible |
| `monka_simulator.html` | Détection CCC | ~20 lignes | Moyenne |
| `monka_simulator.html` | Affichage recommandations | ~50 lignes | Moyenne |
| `monka_simulator.html` | CSS optionnel | ~10 lignes | Faible |

**Total** : ~230 lignes, **1 seul fichier à modifier**

---

## ✅ Tests à effectuer après implémentation

1. **Test CCC R1_CC_01** : Répondre O27=Oui + O28=Oui → Vérifier affichage en rouge en haut
2. **Test CCC R2_CC_01** : Répondre N4=Oui + E2=Personne → Vérifier badge "Contact sous 48h"
3. **Test mixte** : Activer 1 CCC + répondre à d'autres questions → Vérifier que les 2 sections s'affichent
4. **Test vide** : Aucune réponse → Vérifier message "Répondez aux questions..."
5. **Test désactivation** : Changer une réponse pour désactiver une CCC → Vérifier disparition

---

## 🚀 Ordre d'exécution recommandé

1. ✅ **Modifications 1 et 2** : Ajouter les données et la détection (backend logique)
2. ✅ **Modification 3** : Modifier l'affichage (frontend visuel)
3. ⚠️ **Tests** : Valider le comportement sur les 8 CCC
4. ✨ **Modification 4** (optionnelle) : Améliorer le styling si nécessaire

---

> 📄 Document créé le 02/02/2026 – Stratégie d'implémentation CCC
