"use client";

import { motion } from "framer-motion";

interface Step {
    label: string;
    active?: boolean;
}

interface ScreenFlowProps {
    steps: Step[];
    currentStep?: number;
}

export default function ScreenFlow({ steps, currentStep = 0 }: ScreenFlowProps) {
    return (
        <div className="w-full overflow-x-auto py-4 px-2">
            <div className="flex items-center justify-center gap-0 min-w-fit mx-auto">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                        <motion.div
                            className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer select-none transition-all"
                            style={{
                                background:
                                    i === currentStep
                                        ? "linear-gradient(135deg, var(--monka-primary), var(--monka-primary-light))"
                                        : i < currentStep
                                            ? "var(--monka-primary-light)"
                                            : "var(--bg-glass-strong)",
                                color:
                                    i <= currentStep ? "white" : "var(--text-secondary)",
                                border:
                                    i === currentStep
                                        ? "none"
                                        : "1px solid var(--glass-border)",
                                boxShadow:
                                    i === currentStep ? "var(--shadow-md)" : "none",
                                fontSize: "0.8rem",
                                fontWeight: i === currentStep ? 600 : 500,
                                whiteSpace: "nowrap",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                    background:
                                        i === currentStep
                                            ? "rgba(255,255,255,0.25)"
                                            : i < currentStep
                                                ? "rgba(255,255,255,0.3)"
                                                : "var(--monka-primary-light)",
                                    color: i <= currentStep ? "white" : "white",
                                    fontSize: "0.65rem",
                                }}
                            >
                                {i < currentStep ? "✓" : i + 1}
                            </span>
                            {step.label}
                        </motion.div>

                        {/* Arrow between steps */}
                        {i < steps.length - 1 && (
                            <svg
                                width="24"
                                height="12"
                                viewBox="0 0 24 12"
                                fill="none"
                                className="flex-shrink-0 mx-1"
                            >
                                <path
                                    d="M0 6H20M20 6L15 1M20 6L15 11"
                                    stroke={
                                        i < currentStep
                                            ? "var(--monka-primary)"
                                            : "var(--text-tertiary)"
                                    }
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
