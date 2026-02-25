"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    Scale,
    ShieldCheck,
    Lock,
    UserCheck,
    AlertTriangle,
    ChevronRight,
    Zap,
    Fingerprint
} from "lucide-react";

export default function PoliciesPage() {
    const policies = [
        { id: "POL-001", name: "PHI Access Control", type: "ABAC", status: "Active", risk: "Medium", coverage: "100%" },
        { id: "POL-002", name: "Legal Lock Constraint", type: "Deterministic", status: "Active", risk: "Low", coverage: "100%" },
        { id: "POL-003", name: "Cross-Sector Sharing", type: "GNN-Validated", status: "Simulating", risk: "High", coverage: "94%" },
        { id: "POL-004", name: "Internal Financials", type: "RBAC", status: "Active", risk: "Critical", coverage: "100%" },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden ml-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Policy Engine</h2>
                    <div className="flex gap-4">
                        <button className="glass-card hover:bg-white/5 px-4 py-2 text-xs font-bold transition-all">Export Report</button>
                        <button className="glass-button bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold flex items-center gap-2 transition-all">
                            <ShieldCheck className="w-4 h-4" />
                            Sync Graph
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-2 space-y-6">
                                <div className="glass-card p-6 bg-blue-900/10 border-blue-500/20">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                            <Scale className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">Policy Distribution</h3>
                                            <p className="text-xs text-slate-500">Managing 142 attributes across 4 regulatory clusters.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="p-4 glass-card bg-black/40 text-center">
                                            <div className="text-xl font-bold">88</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">Healthcare</div>
                                        </div>
                                        <div className="p-4 glass-card bg-black/40 text-center">
                                            <div className="text-xl font-bold">34</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">Fintech</div>
                                        </div>
                                        <div className="p-4 glass-card bg-black/40 text-center">
                                            <div className="text-xl font-bold">12</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">GDPR</div>
                                        </div>
                                        <div className="p-4 glass-card bg-black/40 text-center">
                                            <div className="text-xl font-bold">8</div>
                                            <div className="text-[10px] text-slate-500 uppercase font-bold mt-1">Internal</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card overflow-hidden">
                                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                        <h3 className="font-bold flex items-center gap-2">
                                            <UserCheck className="w-4 h-4 text-emerald-400" />
                                            Compliance Rulesets
                                        </h3>
                                        <button className="text-blue-400 text-[10px] uppercase font-bold hover:underline">Manage Attributes</button>
                                    </div>
                                    <div className="divide-y divide-white/5">
                                        {policies.map((p, i) => (
                                            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded bg-white/5 border border-white/10 ${p.status === 'Simulating' ? 'animate-pulse' : ''}`}>
                                                        <Lock className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold">{p.name}</div>
                                                        <div className="text-[10px] text-slate-500">{p.type}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-8 items-center">
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-slate-500 uppercase mb-0.5">Risk</div>
                                                        <div className={`text-[10px] font-bold ${p.risk === 'Critical' ? 'text-red-400' : p.risk === 'High' ? 'text-amber-400' : 'text-blue-400'}`}>{p.risk}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-[9px] text-slate-500 uppercase mb-0.5">Coverage</div>
                                                        <div className="text-[10px] font-bold font-mono text-emerald-400">{p.coverage}</div>
                                                    </div>
                                                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                        {p.status}
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                                        <h3 className="font-bold text-amber-500">Governance Review</h3>
                                    </div>
                                    <p className="text-xs text-amber-200/60 leading-relaxed mb-6">
                                        3 policies are currently in "Shadow Mode" and require manual validation before full enforcement in the Healthcare_SEC cluster.
                                    </p>
                                    <button className="w-full py-2 bg-amber-500 text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-all">Review Diff</button>
                                </div>

                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-blue-400" />
                                        Policy Latency Impact
                                    </h3>
                                    <div className="space-y-4">
                                        <LatencyBar label="ABAC Filter" value={42} color="bg-blue-500" />
                                        <LatencyBar label="Graph Reasoning" value={88} color="bg-purple-500" />
                                        <LatencyBar label="Retrieval Clear" value={15} color="bg-emerald-500" />
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-slate-500 italic">
                                        Total policy overhead: +145ms / query
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function LatencyBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-mono">{value}ms</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(value / 150) * 100}%` }}
                />
            </div>
        </div>
    );
}
