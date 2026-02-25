export type Role = 'Admin' | 'Medical_Staff' | 'Legal' | 'Compliance_Officer';

export interface UserContext {
    id: string;
    role: Role;
    permissions: string[];
}

export interface DocumentMetadata {
    id: string;
    title: string;
    classification: 'Public' | 'Internal' | 'Sensitive' | 'PII' | 'PHI';
    requiredPermissions: string[];
    sector: 'Healthcare' | 'Fintech' | 'Legal';
}

export interface Policy {
    id: string;
    name: string;
    effect: 'Allow' | 'Deny';
    condition: (context: UserContext, doc: DocumentMetadata) => boolean;
}

export interface ReasoningStep {
    component: string;
    action: string;
    status: 'SUCCESS' | 'FAILURE' | 'FILTERED';
    details: string;
    timestamp: string;
}

export interface UnifiedResponse {
    answer: string;
    citations: DocumentMetadata[];
    reasoningTrace: ReasoningStep[];
    governanceAlerts: string[];
    confidenceScore: number;
}
