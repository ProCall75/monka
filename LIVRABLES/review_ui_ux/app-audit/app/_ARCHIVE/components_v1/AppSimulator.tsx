"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface AppSimulatorProps {
    initialPath?: string;
}

export default function AppSimulator({ initialPath = "/" }: AppSimulatorProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(true);

    // URL of the local mock app
    const MOCK_APP_URL = "http://localhost:3098";

    return (
        <div className="relative w-[320px] h-[680px] bg-black rounded-[45px] shadow-2xl border-[8px] border-gray-900 overflow-hidden mx-auto transform transition-transform hover:scale-[1.01]">
            {/* Device Frame Details */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-b-2xl z-20" />

            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            {/* The Actual Mini-App */}
            <iframe
                ref={iframeRef}
                src={`${MOCK_APP_URL}${initialPath}`}
                className="w-full h-full border-0 bg-white"
                onLoad={() => setLoading(false)}
                title="App Simulation"
                style={{ opacity: loading ? 0 : 1, transition: "opacity 0.4s" }}
            />

            {/* Home Indicator Overlay (Click-through) */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-black/20 rounded-full z-20 pointer-events-none mix-blend-multiply" />
        </div>
    );
}
