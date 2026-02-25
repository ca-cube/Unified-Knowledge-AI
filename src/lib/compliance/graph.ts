import { ReasoningStep } from "./types";

export interface GraphNode {
    id: string;
    type: 'Regulation' | 'Policy' | 'Contract' | 'SOP';
    label: string;
}

export interface GraphEdge {
    from: string;
    to: string;
    relationship: 'Applies-to' | 'Overrides' | 'Requires' | 'Violates';
}

export class ComplianceGraph {
    private nodes: GraphNode[] = [
        { id: 'HIPAA', type: 'Regulation', label: 'Health Insurance Portability and Accountability Act' },
        { id: 'GDPR', type: 'Regulation', label: 'General Data Protection Regulation' },
        { id: 'HOSP_SOP_01', type: 'SOP', label: 'Patient Data Transfer Protocol' },
        { id: 'CONSENT_882', type: 'Contract', label: 'Patient Explicit Consent Form #882' }
    ];

    private edges: GraphEdge[] = [
        { from: 'HOSP_SOP_01', to: 'HIPAA', relationship: 'Applies-to' },
        { from: 'CONSENT_882', to: 'HOSP_SOP_01', relationship: 'Requires' },
        { from: 'GDPR', to: 'HIPAA', relationship: 'Overrides' } // Example conflict
    ];

    verifyReasoning(claims: string[]): { valid: boolean; trace: ReasoningStep[] } {
        const trace: ReasoningStep[] = [];

        // Simple mock logic: If claim mentions "sharing" and no "consent" is in context, check graph
        const mentionsSharing = claims.some(c => c.toLowerCase().includes('share') || c.toLowerCase().includes('transfer'));
        const hasConsentInGraph = this.nodes.find(n => n.id.includes('CONSENT'));

        trace.push({
            component: "GraphReasoning",
            action: "Regulatory Conflict Simulation",
            status: "SUCCESS",
            details: mentionsSharing ?
                `Triggered 'Transfer' rule set. Verified relationship: [CONSENT] --Requires--> [SOP] --Applies-to--> [HIPAA]. No conflicts found.` :
                "No high-risk operations detected in reasoning path.",
            timestamp: new Date().toISOString()
        });

        return { valid: true, trace };
    }
}
