"use client";

import React from "react";
import { RefreshCcw } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0c]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin" />
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                </div>
                <div className="text-xs font-mono text-blue-400 uppercase tracking-widest animate-pulse">
                    Initializing Secure Layer...
                </div>
            </div>
        </div>
    );
}
