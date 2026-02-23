/* =============================================
   DB Types — Raw Supabase column types.
   Split from supabaseData.ts for §2 compliance.
   Architecture: types only, no logic.
   ============================================= */



// === Raw DB Types (match Supabase v2 columns) ===

export interface DBVulnerability {
    id: string; name: string; bloc_id: number | null; bloc_label: string | null
    question_count: number | null; weight: number
}

export interface DBQuestion {
    id: string; ordre_global: number | null; vulnerability_id: string | null
    bloc_id: number | null; bloc: string | null; sous_bloc: string | null
    question_text: string; response_type: string | null; response_options: string[] | null
    is_trigger: boolean | null; classification: string | null
    aidance: string | null; sous_categorie_ref: string | null
}

export interface DBMicroParcours {
    id: string; vulnerability_id: string; nom: string; objectif: string | null
    signature_a: string | null; signature_b: string | null
}

export interface DBQuestionMPMapping {
    id: number; question_id: string; mp_id: string; source: string
}

export interface DBCategory {
    id: string; mp_id: string; nom: string; description: string | null; ordre: number
}

export interface DBActivationRule {
    id: string; category_id: string; mp_id: string
    niveau: 'critique' | 'ccc' | 'standard'
    condition_logic: Record<string, unknown>[]
    sens_clinique: string | null; delai_jours: number; rule_group: string | null
}

export interface DBScoringQuestion {
    id: number; question_id: string; vulnerability_id: string
    response_text: string; score: number; max_score_vulnerability: number | null
    coefficient: number
}

export interface DBScoringThreshold {
    id: number; vulnerability_id: string; level: string; niveau: string
    min_score: number; max_score: number; seuil_min: number; seuil_max: number
    description: string | null
}

export interface DBRecommendation {
    id: string; category_id: string; mp_id: string
    niveau: 'standard' | 'ccc' | 'critique' | 'prevention'
    wording_utilisateur: string; wording_idec: string
}

export interface DBMicroTache {
    id: string; category_id: string; mp_id: string; libelle: string
    type: 'STRUC' | 'SEC' | 'MED' | 'INFO' | 'ORGA'
    acteur: string[]; domaine: 'medical' | 'medico_social'
    is_contributive: boolean; is_prevention: boolean; is_parametric: boolean
    parametric_mapping: Record<string, unknown> | null; ordre: number
    wording_idec: string; wording_utilisateur: string
    wording_std: string | null; wording_ccc: string | null; wording_crit: string | null
}

export interface DBSuiviQuestion {
    id: string; niveau: number; question_text: string; response_type: string
    vulnerability_id: string | null; mp_id: string | null
    parent_id: string | null; questions_reouvertes: string[] | null
}

export interface DBContentBlock {
    id: string; entity_type: string; entity_id: string; block_type: string
    content: string; ordre: number; created_at: string
}

export interface DBCRTemplate {
    id: string; template_type: string; vulnerability_id: string | null
    niveau: string | null; content: string; variables: string[] | null
    created_at: string
}

export interface DBPersona {
    id: string; name: string; age: number; emoji: string; color: string
    short_desc: string; story: string
    profile_situation: string; profile_activite: string
    profile_lien_parente: string; profile_duree_aidance: string; profile_proche: string
    traits: string[]; aidance_types: string[]; age_aide: string
    is_combo: boolean; created_at: string
}

export interface DBPersonaAnswer {
    id: string; persona_id: string; question_id: string; answer: string
    created_at: string
}

// === Aggregate data store ===

export interface MonkaData {
    vulnerabilities: DBVulnerability[]
    questions: DBQuestion[]
    microParcours: DBMicroParcours[]
    questionMPMapping: DBQuestionMPMapping[]
    categories: DBCategory[]
    activationRules: DBActivationRule[]
    scoringQuestions: DBScoringQuestion[]
    scoringThresholds: DBScoringThreshold[]
    recommendations: DBRecommendation[]
    microTaches: DBMicroTache[]
    suiviQuestions: DBSuiviQuestion[]
    contentBlocks: DBContentBlock[]
    crTemplates: DBCRTemplate[]
    personas: DBPersona[]
    personaAnswers: DBPersonaAnswer[]
    loaded: boolean
    loading: boolean
    error: string | null
}
