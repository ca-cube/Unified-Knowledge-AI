"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    Database,
    Plus,
    ExternalLink,
    FileText,
    ShieldCheck,
    Search,
    CheckCircle2,
    Clock
} from "lucide-react";

export default function SourcesPage() {
    const sources = [
        { name: "Patient Records (EHR)", type: "Internal Database", status: "Connected", sync: "Real-time", items: 42031 },
        { name: "HIPAA Regulatory Docs", type: "Federal API", status: "Connected", sync: "Daily", items: 124 },
        { name: "SOP Manuals", type: "PDF Vector Store", status: "Connected", sync: "Weekly", items: 890 },
        { name: "Clinic Contracts", type: "SharePoint", status: "Authenticating", sync: "N/A", items: 0 },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden ml-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Knowledge Sources</h2>
                    <button className="glass-button bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border-blue-500/30 px-4 py-2 text-xs font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Connect Source
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-4 gap-6">
                            <StatCard label="Total Indexed Items" value="43,045" change="+12.4%" />
                            <StatCard label="Active Connectors" value="3/4" />
                            <StatCard label="Vector Dimension" value="1536" />
                            <StatCard label="Avg Retrieval Latency" value="142ms" />
                        </div>

                        <div className="glass-card overflow-hidden">
                            <div className="p-6 border-b border-white/10 bg-white/5">
                                <div className="flex items-center gap-2">
                                    <Database className="w-5 h-5 text-blue-400" />
                                    <h3 className="font-bold">Active Knowledge Connectors</h3>
                                </div>
                            </div>
                            <div className="divide-y divide-white/5">
                                {sources.map((source, i) => (
                                    <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/30">
                                                <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold flex items-center gap-2">
                                                    {source.name}
                                                    {source.status === "Connected" && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                </div>
                                                <div className="text-xs text-slate-500">{source.type}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-12 text-center text-xs">
                                            <div>
                                                <div className="text-slate-500 mb-1">Status</div>
                                                <div className={source.status === "Connected" ? "text-emerald-400" : "text-amber-400"}>{source.status}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-500 mb-1">Sync Frequency</div>
                                                <div>{source.sync}</div>
                                            </div>
                                            <div>
                                                <div className="text-slate-500 mb-1">Records</div>
                                                <div className="font-mono">{source.items.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <button className="p-2 rounded hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ label, value, change }: { label: string, value: string, change?: string }) {
    return (
        <div className="glass-card p-6 border-white/10 bg-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">{label}</div>
            <div className="flex items-end gap-3">
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                {change && <div className="text-[10px] font-bold text-emerald-500 mb-1">{change}</div>}
            </div>
        </div>
    );
}

function Settings({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
