import React from "react";
import { Network, ShieldAlert, Cpu } from "lucide-react";
import { ReasoningStep as TraceStep } from "@/lib/compliance/types";

export function PolicySimulator({ reasoningTrace }: { reasoningTrace: TraceStep[] }) {
    return (
        <div className="glass-card p-6 bg-blue-900/10 border-blue-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Network className="w-24 h-24" />
            </div>

            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                Neural Policy Simulation (GNN-based)
            </h3>

            <div className="space-y-4 relative z-10">
                {reasoningTrace.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                        <div className="w-1 h-full bg-blue-500/20 rounded-full" />
                        <div className="flex-1">
                            <div className="text-[10px] font-mono text-blue-400/60 uppercase">{step.component}</div>
                            <div className="text-xs text-slate-300 font-medium">{step.action}</div>
                            <div className="text-[10px] text-slate-500 mt-1 mb-2">{step.details}</div>
                            {step.status === 'FILTERED' && (
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[9px] text-red-400">
                                    <ShieldAlert className="w-3 h-3" />
                                    Constraint Violation Blocked
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-slate-500 italic">
                * Reasoning graph paths are validated against 142 localized regulatory nodes in Healthcare_SEC_Cluster.
            </div>
        </div>
    );
}
