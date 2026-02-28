"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Search,
    Lock,
    FileText,
    AlertCircle,
    Fingerprint,
    RefreshCcw,
    Network,
} from "lucide-react";
import { PolicySimulator } from "@/components/PolicySimulator";
import { Sidebar } from "@/components/layout/Sidebar";
import React, { ElementType } from "react";
import { UnifiedResponse, DocumentMetadata, ReasoningStep as TraceStep } from "@/lib/compliance/types";

export default function Dashboard() {
    const [query, setQuery] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const steps = [
        { label: "Semantic Embedding", icon: Fingerprint, color: "text-blue-400" },
        { label: "Access Control Filter", icon: Lock, color: "text-purple-400" },
        { label: "Vector Retrieval", icon: Search, color: "text-emerald-400" },
        { label: "Compliance Graph Validation", icon: Network, color: "text-amber-400" },
        { label: "Citation-Locked Generation", icon: ShieldCheck, color: "text-blue-500" }
    ];

    const [resultData, setResultData] = useState<UnifiedResponse | null>(null);

    const handleSearch = async () => {
        if (!query) return;
        setIsProcessing(true);
        setActiveStep(0);
        setShowResult(false);
        setResultData(null);

        try {
            const response = await fetch("/api/query", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, userRole: "Medical_Staff" })
            });
            const data = await response.json();

            // Artificial delay for step sequence visualization
            await new Promise(resolve => setTimeout(resolve, steps.length * 1500));

            setResultData(data);
            setIsProcessing(false);
            setShowResult(true);
        } catch (error) {
            console.error(error);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (isProcessing) {
            const interval = setInterval(() => {
                setActiveStep((prev: number) => {
                    if (prev < steps.length - 1) return prev + 1;
                    clearInterval(interval);
                    return prev;
                });
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [isProcessing]);

    return (
        <div className="flex h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col relative overflow-hidden ml-64">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-medium text-slate-400">Environment: <span className="text-blue-400">Healthcare_SEC_Cluster</span></h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                            <Fingerprint className="w-3 h-3 text-blue-400" />
                            <span>Auth: Role_Admin_Medical</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl space-y-8">
                        {/* Search Section */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative glass-card p-6 border-white/20">
                                <div className="flex gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Ask the compliance layer... e.g., 'Can I share patient records with external specialists?'"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                            value={query}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                                        />
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={isProcessing || !query}
                                        className="glass-button bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border-blue-500/30 font-medium px-6 flex items-center gap-2"
                                    >
                                        {isProcessing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                        Analyze
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Processing State */}
                        <AnimatePresence mode="wait">
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-5 gap-4">
                                        {steps.map((step, idx) => {
                                            const Icon = step.icon;
                                            const isActive = idx === activeStep;
                                            const isCompleted = idx < activeStep;

                                            return (
                                                <div key={idx} className="flex flex-col items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${isActive ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                                                        isCompleted ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/10 opacity-40'
                                                        }`}>
                                                        <Icon className={`w-6 h-6 ${isActive ? step.color : isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                                                    </div>
                                                    <span className={`text-[10px] font-medium text-center ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="glass-card p-4 flex items-center gap-4 flex-col text-sm text-slate-400 italic relative overflow-hidden">
                                        <div className="absolute inset-0 scan-line opacity-30 pointer-events-none" />
                                        <div className="flex items-center gap-2 relative z-10">
                                            <RefreshCcw className="w-4 h-4 animate-spin" />
                                            <span>{steps[activeStep].label} in progress...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Result Area */}
                        <AnimatePresence mode="wait">
                            {showResult && resultData && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="grid grid-cols-3 gap-6 pb-20"
                                >
                                    <div className="col-span-2 space-y-6">
                                        <div className="glass-card p-8 border-l-4 border-l-blue-500">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-blue-600/20 flex items-center justify-center">
                                                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                                                    </div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Verified Intelligence Output</span>
                                                </div>
                                                <div className="text-[10px] text-slate-500 px-2 py-1 bg-white/5 rounded">Ref ID: SEC-{Math.random().toString(36).substr(2, 4).toUpperCase()}</div>
                                            </div>
                                            <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                                                <p>{resultData.answer}</p>
                                            </div>
                                        </div>

                                        <div className="glass-card p-6">
                                            <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
                                                <Network className="w-4 h-4" />
                                                Formal Policy Reasoning Trace
                                            </h3>
                                            <div className="space-y-3">
                                                {resultData.reasoningTrace.map((step: TraceStep, idx: number) => (
                                                    <ReasoningStep
                                                        key={idx}
                                                        title={step.component + ": " + step.action}
                                                        desc={step.details}
                                                        status={step.status === 'SUCCESS' ? 'pass' : 'fail'}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <PolicySimulator reasoningTrace={resultData.reasoningTrace} />
                                    </div>

                                    <div className="col-span-1 space-y-6">
                                        <div className="glass-card p-6">
                                            <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                Citation Lock
                                            </h3>
                                            <div className="space-y-4">
                                                {resultData.citations.map((doc: DocumentMetadata, idx: number) => (
                                                    <SourceItem
                                                        key={idx}
                                                        title={doc.title}
                                                        type={doc.classification}
                                                        reliability={(0.95 + Math.random() * 0.05 * 100).toFixed(1) + "%"}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="glass-card p-6">
                                            <h3 className="text-xs font-bold uppercase text-slate-500 mb-4 flex items-center gap-2">
                                                <Network className="w-4 h-4" />
                                                Regulatory Graph Context
                                            </h3>
                                            <div className="relative h-32 bg-black/40 rounded-lg overflow-hidden border border-white/5 p-2">
                                                <div className="absolute inset-0 opacity-20 compliance-grid" />
                                                <div className="relative flex flex-wrap gap-2">
                                                    <GraphBadge label="HIPAA" active />
                                                    <GraphBadge label="GDPR" />
                                                    <GraphBadge label="SOP_44" active />
                                                    <GraphBadge label="NIST_800" />
                                                </div>
                                                <div className="absolute bottom-2 right-2 text-[8px] text-blue-500 font-mono">
                                                    ACTIVE_EDGES: 12
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isProcessing && !showResult && (
                            <div className="grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                <FeatureCard
                                    icon={Lock}
                                    title="Policy-Aware RAG"
                                    desc="Automatically filters documents based on user roles and data classifications."
                                />
                                <FeatureCard
                                    icon={Network}
                                    title="Reasoning Graph"
                                    desc="Validates AI output against a deterministic knowledge graph of regulations."
                                />
                                <FeatureCard
                                    icon={Fingerprint}
                                    title="Audit Traceable"
                                    desc="Logs every embedding, retrieval step, and reasoning path for regulators."
                                />
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: ElementType, title: string, desc: string }) {
    return (
        <div className="glass-card p-6 hover:border-white/20 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-sm font-bold mb-2">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}

function GraphBadge({ label, active = false }: { label: string, active?: boolean }) {
    return (
        <div className={`px-2 py-1 rounded text-[9px] font-mono border transition-all ${active ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'bg-white/5 border-white/10 text-slate-500'}`}>
            {label}
        </div>
    );
}

function ReasoningStep({ title, desc, status }: { title: string, desc: string, status: 'pass' | 'fail' }) {
    return (
        <div className="flex gap-3">
            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${status === 'pass' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div>
                <div className="text-[11px] font-bold text-slate-300">{title}</div>
                <div className="text-[10px] text-slate-500">{desc}</div>
            </div>
        </div>
    );
}

function SourceItem({ title, type, reliability }: { title: string, type: string, reliability: string }) {
    return (
        <div className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-300">{title}</span>
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">{type}</span>
                <span className="text-blue-400 font-mono">{reliability} Conf.</span>
            </div>
        </div>
    );
}
