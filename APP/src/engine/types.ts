/* =============================================
   Engine Types — Monka Clinical Engine
   Matches the simulator_data.json schema v2.1
   ============================================= */

// === Question Types ===

export type QuestionCategory = 'etat' | 'facteur' | 'trigger' | 'suivi';
export type QuestionScoring = 'scorante' | 'non_scorante';

export interface QuestionOption {
    text: string;
    score?: number;
    triggers?: string[];
}

export interface Question {
    id: string;
    index: string;
    text: string;
    category: QuestionCategory;
    scoring: QuestionScoring;
    vulnerability: VulnerabilityId;
    micro_parcours?: string;
    options: QuestionOption[];
    activation_rule?: string;
}

// === Vulnerability ===

export type VulnerabilityId = 'V1' | 'V2' | 'V3' | 'V4' | 'V5';

export interface VulnerabilityMeta {
    id: VulnerabilityId;
    name: string;
    description: string;
    question_count: number;
    scoring_question_count: number;
    score_max: number;
}

// === Scoring ===

export interface ScoringThreshold {
    level: 'green' | 'yellow' | 'orange' | 'red';
    label: string;
    min: number;
    max: number;
}

export interface ScoringConfig {
    vulnerability: VulnerabilityId;
    max_score: number;
    thresholds: ScoringThreshold[];
}

// === CCC (Conditions Critiques Composites) ===

export interface CCCRule {
    id: string;
    name: string;
    description: string;
    conditions: CCCCondition[];
    severity: 'critical' | 'high' | 'medium';
    recommendation: string;
}

export interface CCCCondition {
    question_id: string;
    operator: 'equals' | 'gte' | 'lte' | 'in';
    value: string | number | string[];
}

// === Recommendations ===

export interface Recommendation {
    id: string;
    micro_parcours: string;
    title: string;
    level: 'awareness' | 'guidance' | 'action';
    text: string;
    tasks?: MicroTask[];
}

// === Micro-Tasks ===

export type TaskType = 'IDEC' | 'CG' | 'EQUIPE' | 'MEDECIN';

export interface MicroTask {
    id: string;
    reco_id: string;
    text: string;
    type: TaskType;
    domain?: string;
    prescription?: boolean;
    asr_signature?: string;
}

// === Activation Rules ===

export interface ActivationRule {
    id: string;
    micro_parcours: string;
    conditions: ActivationCondition[];
    priority: 'critical' | 'high' | 'standard';
}

export interface ActivationCondition {
    question_id: string;
    operator: 'equals' | 'gte' | 'in';
    value: string | number | string[];
}

// === Simulator Data (full JSON structure) ===

export interface SimulatorData {
    vulnerability: VulnerabilityMeta;
    questions: Question[];
    scoring: ScoringConfig;
    ccc_rules: CCCRule[];
    recommendations: Recommendation[];
    activation_rules: ActivationRule[];
}

// === App State ===

export interface SimulatorState {
    currentVulnerability: VulnerabilityId;
    answers: Record<string, string>; // question_id -> selected option text
    scores: Record<VulnerabilityId, number>;
    activatedRules: string[];
    detectedCCCs: string[];
    activeTab: SimulatorTab;
}

export type SimulatorTab =
    | 'questionnaire'
    | 'scoring'
    | 'recommendations'
    | 'ccc'
    | 'tasks'
    | 'rules'
    | 'summary';

// === Roadmap ===

export type PhaseStatus = 'done' | 'in-progress' | 'pending' | 'blocked';

export interface RoadmapPhase {
    id: number;
    name: string;
    description: string;
    status: PhaseStatus;
    progress: number; // 0-100
    items: RoadmapItem[];
}

export interface RoadmapItem {
    text: string;
    status: 'done' | 'in-progress' | 'pending' | 'blocked';
    blocking?: string;
}
