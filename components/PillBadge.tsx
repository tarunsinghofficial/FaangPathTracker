"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
    "Track Your Progress 🚀",
    "Ace Your Next Interview 🎯",
    "1000+ Coding Problems 💡",
    "Top FAANG Questions 🏆",
    "Improve. Track. Succeed. ✅"
];

const ROTATION_INTERVAL = 4000; // 4 seconds per message

export function PillBadge() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
                setIsVisible(true);
            }, 200); // Wait for fade out before changing text
        }, ROTATION_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-fit group relative rounded-full border border-black/5 bg-neutral-100 text-sm sm:text-base max-sm:mb-2 transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <p className="mx-auto text-neutral-600/70 dark:text-neutral-400/70 animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite] bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80 inline-flex items-center justify-center px-4 py-1 w-fit">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: isVisible ? 1 : 0,
                            y: isVisible ? 0 : -10
                        }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-[200px] text-center"
                    >
                        ✨ {MESSAGES[currentIndex]}
                    </motion.span>
                </AnimatePresence>
            </p>
        </div>
    );
}