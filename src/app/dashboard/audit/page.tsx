"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    History,
    Search,
    ShieldCheck,
    AlertCircle,
    ChevronRight,
    Filter,
    Download,
    Calendar,
    Clock,
    Fingerprint
} from "lucide-react";

export default function AuditPage() {
    const auditLogs = [
        { id: "TX-9921", query: "Can I share patient records with external specialists?", user: "Medical_Staff", status: "Verified", time: "2 mins ago", role: "Medical_Staff" },
        { id: "TX-9920", query: "What is the policy for SOP_44 updates?", user: "Compliance_Officer", status: "Verified", time: "15 mins ago", role: "Admin" },
        { id: "TX-9919", query: "Retrieve internal salary data for Q4.", user: "Financial_Analyst", status: "Blocked", time: "1 hour ago", role: "Viewer" },
        { id: "TX-9918", query: "Generate a summary of HIPAA 2024 changes.", user: "Legal_Consultant", status: "Verified", time: "4 hours ago", role: "Legal" },
    ];

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden ml-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Audit Trace Core</h2>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Filter logs..."
                                className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-blue-500/50 w-64"
                            />
                        </div>
                        <button className="p-2 rounded glass-card hover:bg-white/5 border-white/10">
                            <Filter className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="glass-button bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border-blue-500/30 px-4 py-1.5 text-xs font-bold flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export Ledger
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="grid grid-cols-3 gap-6">
                            <AuditStat label="Verified Queries" value="1,242" color="text-emerald-500" />
                            <AuditStat label="Policy Blocks" value="14" color="text-red-500" />
                            <AuditStat label="Avg Confidence" value="98.2%" color="text-blue-500" />
                        </div>

                        <div className="glass-card">
                            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="w-5 h-5 text-blue-400" />
                                    <h3 className="font-bold">Encryption-Locked Audit Ledger</h3>
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">HASH: 0x82f...a12c</div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-white/10 bg-black/20 text-slate-500 uppercase tracking-tighter">
                                        <tr>
                                            <th className="px-6 py-4 font-bold">Transaction ID</th>
                                            <th className="px-6 py-4 font-bold">Query Mapping</th>
                                            <th className="px-6 py-4 font-bold">Initiator</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                            <th className="px-6 py-4 font-bold">Timestamp</th>
                                            <th className="px-6 py-4 font-bold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {auditLogs.map((log, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                                                <td className="px-6 py-4 font-mono text-blue-400">{log.id}</td>
                                                <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-slate-300">{log.query}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Fingerprint className="w-3 h-3 text-slate-500" />
                                                        <span>{log.user}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${log.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                        }`}>
                                                        {log.status === 'Verified' ? <ShieldCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                        <span className="font-bold uppercase tracking-tighter">{log.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                                                    <Clock className="w-3 h-3" />
                                                    {log.time}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-500 hover:text-white transition-colors">
                                                        <ChevronRight className="w-4 h-4 ml-auto" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pb-12">
                            <div className="glass-card p-6">
                                <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    Retention Policy
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Logs are retained for 7 years in cold storage (AWS Glacier) as per Federal Healthcare Policy 41 CFR Part 102. Active logs are stored in the secure cluster for 365 days.
                                </p>
                            </div>
                            <div className="glass-card p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-sm mb-1 tracking-tight">External Auditor Access</h3>
                                    <p className="text-[10px] text-slate-500">Generate a time-limited pass for SOC2 auditors.</p>
                                </div>
                                <button className="px-4 py-2 glass-card hover:bg-white/10 text-blue-400 text-[10px] font-bold uppercase transition-all">Grant Access</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function AuditStat({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">{label}</div>
            <div className={`text-3xl font-bold ${color} tracking-tighter`}>{value}</div>
        </div>
    );
}
