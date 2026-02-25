"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ShieldCheck,
    Activity,
    Database,
    Scale,
    History,
    Network,
    Fingerprint
} from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: Activity, label: "Monitoring", href: "/dashboard" },
        { icon: Database, label: "Knowledge Sources", href: "/dashboard/sources" },
        { icon: Scale, label: "Policy Engine", href: "/dashboard/policies" },
        { icon: History, label: "Audit Trace", href: "/dashboard/audit" },
        { icon: Network, label: "Compliance Graph", href: "/dashboard/graph" },
    ];

    return (
        <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col h-screen fixed left-0 top-0 z-20">
            <div className="p-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center animate-glow group-hover:scale-110 transition-transform">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">SecureKnowledge</h1>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <div className="p-3 glass-card text-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>GDPR/HIPAA Secure Session</span>
                </div>
            </div>
        </aside>
    );
}
