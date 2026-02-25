import { UserContext, DocumentMetadata, Policy, ReasoningStep } from "./types";

export class PolicyEngine {
    private policies: Policy[] = [
        {
            id: "POL-001",
            name: "PHI Access Control",
            effect: "Deny",
            condition: (ctx, doc) => doc.classification === 'PHI' && ctx.role !== 'Medical_Staff' && ctx.role !== 'Admin'
        },
        {
            id: "POL-002",
            name: "Legal Lock",
            effect: "Deny",
            condition: (ctx, doc) => doc.classification === 'Sensitive' && ctx.role === 'Medical_Staff' && doc.sector === 'Legal'
        }
    ];

    validateAccess(context: UserContext, document: DocumentMetadata): { allowed: boolean; reason?: string } {
        for (const policy of this.policies) {
            if (policy.condition(context, document)) {
                return {
                    allowed: policy.effect === "Allow",
                    reason: `Policy Violation: ${policy.name} (${policy.id}) - Access ${policy.effect}ed for ${context.role} on ${document.classification} data.`
                };
            }
        }
        return { allowed: true };
    }

    filterDocuments(context: UserContext, documents: DocumentMetadata[]): { filtered: DocumentMetadata[], trace: ReasoningStep[] } {
        const trace: ReasoningStep[] = [];
        const filtered = documents.filter(doc => {
            const result = this.validateAccess(context, doc);
            trace.push({
                component: "PolicyEngine",
                action: `Evaluate Access [${doc.id}]`,
                status: result.allowed ? "SUCCESS" : "FILTERED",
                details: result.reason || "Access granted based on role/classification clearing.",
                timestamp: new Date().toISOString()
            });
            return result.allowed;
        });

        return { filtered, trace };
    }
}
