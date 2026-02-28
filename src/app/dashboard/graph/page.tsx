"use client";

import React, { ElementType } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import {
    Network,
    ShieldCheck,
    Cpu,
    Settings,
    Maximize2,
    Zap,
    Globe,
    Database,
    Lock
} from "lucide-react";

export default function GraphPage() {
    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col relative overflow-hidden ml-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Compliance Knowledge Graph</h2>
                    <div className="flex gap-4">
                        <button className="glass-card p-2 hover:bg-white/5 border-white/10">
                            <Settings className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="glass-card p-2 hover:bg-white/5 border-white/10">
                            <Maximize2 className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-hidden relative">
                    {/* Main Visualizer Area */}
                    <div className="absolute inset-0 bg-[#060608] flex items-center justify-center p-8 overflow-hidden">
                        <div className="absolute inset-0 compliance-grid opacity-20 pointer-events-none" />

                        {/* Dynamic Central Hub */}
                        <div className="relative group cursor-crosshair">
                            <div className="absolute inset-[-100px] bg-blue-600/10 blur-[80px] rounded-full animate-pulse group-hover:bg-blue-600/20 transition-all duration-1000" />

                            {/* Simulated Nodes/Connections */}
                            <svg className="w-[800px] h-[600px] relative z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                                <defs>
                                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Random Lines for Decoration */}
                                <line x1="400" y1="300" x2="200" y2="150" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 2" />
                                <line x1="400" y1="300" x2="600" y2="150" stroke="url(#lineGrad)" strokeWidth="1" />
                                <line x1="400" y1="300" x2="600" y2="450" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="10 5" />
                                <line x1="400" y1="300" x2="200" y2="450" stroke="url(#lineGrad)" strokeWidth="1" />
                                <line x1="200" y1="150" x2="600" y2="150" stroke="url(#lineGrad)" strokeWidth="0.5" />
                            </svg>

                            {/* Nodes as Floating Divs */}
                            <Node x="400" y="300" icon={ShieldCheck} label="Regulatory_Core" color="bg-blue-600 shadow-blue-500/50" active />
                            <Node x="200" y="150" icon={Globe} label="HIPAA_F_Cluster" color="bg-purple-600/40 border-purple-500/50" />
                            <Node x="600" y="150" icon={Database} label="GDPR_EU_Nodes" color="bg-emerald-600/40 border-emerald-500/50" />
                            <Node x="600" y="450" icon={Lock} label="Local_Policy_SET" color="bg-amber-600/40 border-amber-500/50" />
                            <Node x="200" y="450" icon={Cpu} label="Audit_Logs_Cold" color="bg-slate-600/40 border-slate-500/50" />
                        </div>

                        {/* UI Overlays */}
                        <div className="absolute top-8 left-8 space-y-4 max-w-xs">
                            <div className="glass-card p-4 backdrop-blur-xl">
                                <h3 className="text-xs font-bold uppercase text-blue-400 mb-2">Graph Stats</h3>
                                <div className="space-y-2 text-[10px]">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Total Nodes</span>
                                        <span className="font-mono">142</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Active Edges</span>
                                        <span className="font-mono">892</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Conflict Depth</span>
                                        <span className="font-mono">4</span>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card p-4">
                                <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Legend</h3>
                                <div className="space-y-2">
                                    <LegendItem color="bg-blue-500" label="Regulatory Standard" />
                                    <LegendItem color="bg-purple-500" label="Data Locality" />
                                    <LegendItem color="bg-amber-500" label="Access Policy" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 right-8 max-w-sm">
                            <div className="glass-card p-6 bg-blue-600/10 border-blue-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="font-bold text-sm">GNN Reasoning Engine</h3>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-blue-500 pl-3">
                                    &quot;Verifying graph consistency... Cluster 4 identifies a potential conflict between local SOP-9 and HIPAA Privacy Rule (Subpart E). Remediation: Apply strictest constraint.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Node({ x, y, icon: Icon, label, color, active = false }: { x: string, y: string, icon: ElementType, label: string, color: string, active?: boolean }) {
    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group transition-all duration-500"
            style={{ left: `${x}px`, top: `${y}px` }}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${color} ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 group-hover:text-blue-400 whitespace-nowrap">{label}</span>
        </div>
    );
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[9px] text-slate-400">{label}</span>
        </div>
    );
}
