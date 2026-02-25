import { PolicyEngine } from "./engine";
import { ComplianceGraph } from "./graph";
import {
    UserContext,
    DocumentMetadata,
    UnifiedResponse,
    ReasoningStep
} from "./types";

export class SecureKnowledgeOrchestrator {
    private policyEngine: PolicyEngine;
    private complianceGraph: ComplianceGraph;

    constructor() {
        this.policyEngine = new PolicyEngine();
        this.complianceGraph = new ComplianceGraph();
    }

    async processQuery(query: string, user: UserContext): Promise<UnifiedResponse> {
        const trace: ReasoningStep[] = [];
        const governanceAlerts: string[] = [];

        // 1. Initial Embedding & Intent Recognition (Trace step)
        trace.push({
            component: "EmbeddingLayer",
            action: "Semantic Mapping",
            status: "SUCCESS",
            details: `Embedded query: "${query.substring(0, 50)}...". Context mapped to Healthcare/Compliance domain.`,
            timestamp: new Date().toISOString()
        });

        // 2. Mock Vector Retrieval with Metadata
        const mockRetrievedDocs: DocumentMetadata[] = [
            { id: "DOC-001", title: "HIPAA Privacy Rule Summary", classification: 'Public', requiredPermissions: [], sector: 'Healthcare' },
            { id: "DOC-002", title: "Patient #882 Clinical Notes", classification: 'PHI', requiredPermissions: ['Medical_Staff'], sector: 'Healthcare' },
            { id: "SEC-999", title: "Internal Salary Records", classification: 'PHI', requiredPermissions: ['Admin'], sector: 'Fintech' },
            { id: "DOC-003", title: "Internal Security Protocol", classification: 'Internal', requiredPermissions: ['Admin'], sector: 'Healthcare' }
        ];

        // 3. Access Control Pre-filter
        const { filtered, trace: policyTrace } = this.policyEngine.filterDocuments(user, mockRetrievedDocs);
        trace.push(...policyTrace);

        if (filtered.length < mockRetrievedDocs.length) {
            governanceAlerts.push(`${mockRetrievedDocs.length - filtered.length} sensitive documents were excluded based on ABAC policies.`);
        }

        // 4. Graph Reasoning Validation
        const reasoningClaims = [
            "Patient data can be shared with specialists given consent.",
            "Consent #882 is valid for the requester's department."
        ];
        const { valid, trace: graphTrace } = this.complianceGraph.verifyReasoning(reasoningClaims);
        trace.push(...graphTrace);

        // 5. Constrained Generation (Mocked)
        const answer = filtered.length > 0
            ? `Based on ${filtered.map(d => d.title).join(', ')}, sharing is permitted under current guidelines.`
            : "Access denied. No authorized documents found to fulfill this query.";

        return {
            answer,
            citations: filtered,
            reasoningTrace: trace,
            governanceAlerts,
            confidenceScore: 0.98
        };
    }
}
