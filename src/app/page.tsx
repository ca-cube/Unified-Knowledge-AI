"use client";

import React, { ElementType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    ChevronRight,
    Lock,
    Network,
    Activity,
    Zap,
    Globe,
    Cpu
} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#060608] text-slate-200 overflow-x-hidden">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 compliance-grid opacity-20" />
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">SecureKnowledge AI</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-blue-400 transition-colors">Architecture</a>
                    <a href="#compliance" className="hover:text-blue-400 transition-colors">Compliance</a>
                    <a href="#enterprise" className="hover:text-blue-400 transition-colors">Enterprise</a>
                </div>
                <Link
                    href="/dashboard"
                    className="glass-button bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/20"
                >
                    Launch Console
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap className="w-3 h-3" />
                        Compliance-Grade Secure Intelligence
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-tight">
                        The Governance Layer <br /> for Enterprise AI.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Move beyond generic copilots. SecureKnowledge AI implements a deterministic policy engine and regulatory knowledge graph to ensure every AI response is verified, auditable, and secure.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            Start Secure Query
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 glass-card hover:bg-white/10 font-bold rounded-xl transition-all border-white/10 text-white">
                            View Audit Specs
                        </button>
                    </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="mt-24 relative p-4 glass-card border-white/10 max-w-5xl mx-auto"
                >
                    <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/20 blur-3xl animate-pulse" />
                    <div className="aspect-video rounded-lg overflow-hidden relative bg-black/40 border border-white/5 p-4 flex items-center justify-center group">
                        <div className="absolute inset-0 compliance-grid opacity-10" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <Cpu className="w-16 h-16 text-blue-500/50 group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                            </div>
                            <div className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em] animate-pulse">
                                Policy_Graph_Core: ONLINE
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats / Features Grid */}
            <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid md:grid-cols-3 gap-12">
                    <FeatureItem
                        icon={Lock}
                        title="Policy-Aware RAG"
                        desc="Instead of just retrieving, we filter through 140+ attribute-based access control (ABAC) rules before the model even sees the data."
                    />
                    <FeatureItem
                        icon={Network}
                        title="Graph Verification"
                        desc="Our GNN logic validates AI reasoning paths against a deterministic knowledge graph of HIPAA, GDPR, and NIST regulations."
                    />
                    <FeatureItem
                        icon={Activity}
                        title="Full Audit Trace"
                        desc="Every generation is anchored to verifiable source citations with a complete record of policy clearing for regulatory compliance."
                    />
                </div>
            </section>

            {/* Value prop section */}
            <section className="relative z-10 py-32 px-6 bg-blue-600/5 border-y border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Designed for Regulated Verticals</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            From Healthcare PHI to Fintech compliance, SecureKnowledge AI adapts its governance layer to the specific regulatory landscape of your industry.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Deterministic Hallucination Blocking",
                                "Role-Based Retrieval Clearance",
                                "Automated Regulatory Conflict Detection",
                                "SOC2 & HIPAA Compliant Auditing"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                                        <ShieldCheck className="w-3 h-3 text-blue-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-8 text-center aspect-square flex flex-col items-center justify-center">
                            <div className="text-4xl font-bold text-blue-400 mb-2">99%</div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Trace Accuracy</div>
                        </div>
                        <div className="glass-card p-8 text-center aspect-square flex flex-col items-center justify-center mt-8">
                            <div className="text-4xl font-bold text-purple-400 mb-2">142</div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Policy Nodes</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <footer className="relative z-10 py-20 px-6 max-w-7xl mx-auto text-center">
                <div className="glass-card p-12 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                    <h2 className="text-3xl font-bold mb-6">Ready to secure your knowledge?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                        Experience the difference between a chat bot and a compliance-grade intelligence layer.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/40"
                    >
                        Go to Admin Console
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                    <div>© 2026 SecureKnowledge AI • Built for CA 30 Day Challenge</div>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-blue-400">Security Specs</Link>
                        <Link href="#" className="hover:text-blue-400">Policy Graph API</Link>
                        <Link href="#" className="hover:text-blue-400">Audit Labs</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureItem({ icon: Icon, title, desc }: { icon: ElementType, title: string, desc: string }) {
    return (
        <div className="group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/10 group-hover:border-blue-500/50 transition-all">
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <h3 className="text-lg font-bold mb-4">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
