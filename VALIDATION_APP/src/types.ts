export interface Annotation {
    id?: string;
    mp_id: string;
    section_id: string;
    item_id?: string;
    status: 'pending' | 'validated' | 'rejected' | 'comment';
    comment?: string;
    reviewer: string;
    created_at?: string;
    updated_at?: string;
}

export interface TodoItem {
    id: string;
    vulnerability: string;
    mp_id: string;
    section_id: string;
    label: string;
    checked: boolean;
    checked_at?: string;
    checked_by?: string;
    created_at?: string;
}

export interface MPSection {
    id: string;
    title: string;
    content: string;
    decisionItems: DecisionItem[];
}

export interface DecisionItem {
    id: string;
    label: string;
    type: 'decision' | 'wording' | 'prevention';
    sectionId: string;
}

export interface MPData {
    id: string;
    title: string;
    subtitle: string;
    vulnerability: string;
    questions: number;
    categories: number;
    rules: number;
    microTasks: number;
    rawContent: string;
    sections: MPSection[];
}
