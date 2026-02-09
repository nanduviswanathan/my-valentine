import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Falling Petal Particle
const Petal = ({ delay }) => {
    const randomLeft = Math.random() * 100;
    const randomDuration = Math.random() * 5 + 5;

    return (
        <motion.div
            className="absolute top-[-20px] text-xl z-0 pointer-events-none opacity-60"
            style={{ left: `${randomLeft}%` }}
            animate={{
                y: [0, window.innerHeight],
                x: [0, Math.sin(randomLeft) * 50],
                rotate: [0, 360],
                opacity: [0, 0.8, 0]
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
        >
            🌸
        </motion.div>
    );
};

const RoseDay = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sentRoses, setSentRoses] = useState(0);

    const handleSendRose = (e) => {
        e.stopPropagation();
        setSentRoses(prev => prev + 1);

        const heart = document.createElement('div');
        heart.innerHTML = '🌹';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '80%';
        heart.style.fontSize = '3rem';
        heart.style.zIndex = '100';
        heart.style.pointerEvents = 'none';

        const randomX = (Math.random() - 0.5) * 400;

        heart.animate([
            { transform: 'translate(-50%, 0) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${randomX}px), -100vh) scale(0)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        });

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    };

    return (
        <div className="relative text-center z-10 w-full max-w-lg mx-auto min-h-[60vh] flex flex-col items-center justify-center">

            {/* Falling Petals Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <Petal key={i} delay={Math.random() * 10} />
                ))}
            </div>

            {/* Glassmorphism Card (Propose Day Style) */}
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl border border-rose-200 transition-all duration-500 hover:shadow-2xl">

                <motion.div
                    className="cursor-pointer mb-6"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* The Rose Animation Container */}
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!isOpen ? (
                                /* Closed Bud Icon Stage */
                                <motion.div
                                    key="bud"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-8xl drop-shadow-md"
                                >
                                    🌹
                                </motion.div>
                            ) : (
                                /* Bloomed SVG Rose Animation */
                                <motion.div
                                    key="bloom"
                                    className="relative w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible drop-shadow-lg">
                                        <defs>
                                            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#e11d48" />
                                                <stop offset="50%" stopColor="#be123c" />
                                                <stop offset="100%" stopColor="#881337" />
                                            </linearGradient>
                                        </defs>

                                        {/* Stem - Growing Up */}
                                        <motion.path
                                            d="M 250 450 Q 240 350 250 300"
                                            fill="none"
                                            stroke="#166534"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />

                                        {/* Leaves - Popping Out */}
                                        <motion.path
                                            d="M 250 380 Q 200 370 180 340 Q 210 350 250 370"
                                            fill="#22c55e"
                                            stroke="#15803d"
                                            strokeWidth="4"
                                            initial={{ scale: 0, rotate: -30 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                                            style={{ originX: "250px", originY: "380px" }}
                                        />
                                        <motion.path
                                            d="M 250 350 Q 300 340 320 310 Q 290 320 250 340"
                                            fill="#22c55e"
                                            stroke="#15803d"
                                            strokeWidth="4"
                                            initial={{ scale: 0, rotate: 30 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                            style={{ originX: "250px", originY: "350px" }}
                                        />

                                        {/* ROSE PETALS - Bouncy Pop Scaling */}
                                        <g transform="translate(250, 200)">
                                            {/* Outer Petals */}
                                            <motion.path
                                                d="M 0 0 C -50 50 -100 -50 0 -100 C 100 -50 50 50 0 0"
                                                fill="url(#roseGradient)"
                                                stroke="#9f1239"
                                                strokeWidth="3"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6, type: "spring", stiffness: 150, damping: 12 }}
                                            />
                                            {/* Middle Layer */}
                                            <motion.path
                                                d="M -20 -20 C -60 10 -30 60 20 20 C 60 -10 30 -60 -20 -20"
                                                fill="#fb7185"
                                                stroke="#881337"
                                                strokeWidth="2"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.7, type: "spring", stiffness: 180, damping: 12 }}
                                            />
                                            {/* Inner Core */}
                                            <motion.path
                                                d="M 0 0 C -10 10 -20 -10 0 -20 C 20 -10 10 10 0 0"
                                                fill="#fda4af"
                                                stroke="#881337"
                                                strokeWidth="2"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
                                            />
                                        </g>
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-rose-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Rose Day
                </motion.h1>

                <motion.p
                    className="text-rose-700 font-sans text-lg italic mb-6 min-h-[3rem]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={isOpen ? "open-text" : "closed-text"}
                >
                    {isOpen ? "A single rose communicates what words cannot." : "Tap the rose to let it bloom..."}
                </motion.p>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <motion.button
                            onClick={handleSendRose}
                            whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-rose-500 text-white rounded-full font-bold shadow-md flex items-center gap-2 hover:bg-rose-600 transition-colors"
                        >
                            <span className="text-lg">🌹</span> Send a Rose {sentRoses > 0 && `(${sentRoses})`}
                        </motion.button>

                        {sentRoses > 0 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-rose-800/60 font-serif text-sm italic"
                            >
                                Come back tomorrow for Propose Day! 💍
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default RoseDay;
