import { NextRequest, NextResponse } from "next/server";
import { SecureKnowledgeOrchestrator } from "@/lib/compliance/orchestrator";
import { UserContext } from "@/lib/compliance/types";

export async function POST(req: NextRequest) {
    try {
        const { query, userRole } = await req.json();

        // In a real app, user context would come from auth session
        const mockUser: UserContext = {
            id: "usr-001",
            role: userRole || 'Medical_Staff',
            permissions: ['read_patient_data']
        };

        const orchestrator = new SecureKnowledgeOrchestrator();
        const result = await orchestrator.processQuery(query, mockUser);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Query Error:", error);
        return NextResponse.json({ error: "Failed to process query through compliance layer" }, { status: 500 });
    }
}
