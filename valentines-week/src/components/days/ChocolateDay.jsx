import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- VISUAL ASSETS ---
// Luxurious Gold Gradients
const goldFoil = "conic-gradient(from 45deg, #FFD700, #FDB931, #FFD700, #FDB931, #FFD700)";
const richVelvet = "radial-gradient(circle at 50% 50%, #4A0404, #2A0a0a, #000000)";

// --- PARTICLE SYSTEMS ---
const Sparkle = ({ delay, style }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 90, 180] }}
        transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
        className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[0.5px] z-0"
        style={style}
    />
);

const GoldExplosion = ({ x, y }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 overflow-visible">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#FFD700] rounded-full shadow-[0_0_4px_#FFD700]"
                    initial={{ x, y, opacity: 1, scale: 1 }}
                    animate={{
                        x: x + (Math.random() - 0.5) * 100,
                        y: y + (Math.random() - 0.5) * 100,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            ))}
        </div>
    );
};

const ChocolateDay = () => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [explosions, setExplosions] = useState([]);

    // Chocolates State
    const [chocolates, setChocolates] = useState(
        Array.from({ length: 8 }).map((_, i) => ({ id: i, status: 'whole' }))
    );

    // Adjusted positions for the heart shape
    const positions = [
        { top: '25%', left: '26%' }, // Top Left Lobe
        { top: '25%', left: '74%' }, // Top Right Lobe
        { top: '42%', left: '16%' }, // Mid Left
        { top: '42%', left: '50%' }, // Center
        { top: '42%', left: '84%' }, // Mid Right
        { top: '60%', left: '30%' }, // Lower Left
        { top: '60%', left: '70%' }, // Lower Right
        { top: '78%', left: '50%' }, // Bottom Tip
    ];

    const heartPath = "M 175 315 C 175 315 330 230 330 115 A 80 80 0 0 0 175 65 A 80 80 0 0 0 20 115 C 20 230 175 315 175 315 Z";

    const handleChocolateClick = (id, e) => {
        if (!isBoxOpen) {
            setIsBoxOpen(true);
            return;
        }

        // Get click position for explosion
        const rect = e.currentTarget.getBoundingClientRect();
        const boxRect = e.currentTarget.closest('.heart-box-container').getBoundingClientRect();
        const x = rect.left - boxRect.left + rect.width / 2;
        const y = rect.top - boxRect.top + rect.height / 2;

        setChocolates(prev => prev.map(choco => {
            if (choco.id === id && choco.status === 'whole') {
                return { ...choco, status: 'bitten' };
            }
            return choco;
        }));

        setTimeout(() => {
            // Trigger explosion visual
            setExplosions(prev => [...prev, { id: Date.now(), x, y }]);

            setChocolates(prev => prev.map(choco => {
                if (choco.id === id && choco.status === 'bitten') {
                    return { ...choco, status: 'eaten' };
                }
                return choco;
            }));
        }, 500);
    };

    const allEaten = chocolates.every(c => c.status === 'eaten');

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* --- RICH BACKGROUND --- */}
            <div className="absolute inset-0 bg-[#1a0505] z-0">
                <div className="absolute inset-0 opacity-40" style={{ background: richVelvet }}></div>
                {/* Subtle animated light sweep */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-900/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                {/* Floating Bokeh */}
                {[...Array(20)].map((_, i) => (
                    <Sparkle key={i} delay={Math.random() * 5} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
                ))}
            </div>

            {/* --- TITLE --- */}
            <motion.div
                className="relative z-20 mb-10 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C49102] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
                    Indulgence
                </h1>
                <p className="text-amber-100/60 font-serif tracking-[0.3em] uppercase text-xs md:text-sm">
                    Premium Selection
                </p>
            </motion.div>

            {/* --- THE HEART BOX --- */}
            <div className="heart-box-container relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] z-20 group perspective-1000">

                {/* EXPLOSIONS LAYER */}
                {explosions.map(ex => (
                    <GoldExplosion key={ex.id} x={ex.x} y={ex.y} />
                ))}

                {/* 1. OUTER GLOW */}
                <div className="absolute inset-0 blur-xl bg-amber-900/40 rounded-full scale-110 z-0 animate-pulse-slow"></div>

                {/* 2. BASE TRAY (Gold Heart) */}
                <div className="absolute inset-0 z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-transform duration-700">
                    <svg viewBox="0 0 350 350" className="w-full h-full">
                        <defs>
                            <linearGradient id="gold-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#BF953F" />
                                <stop offset="25%" stopColor="#FCF6BA" />
                                <stop offset="50%" stopColor="#B38728" />
                                <stop offset="75%" stopColor="#FBF5B7" />
                                <stop offset="100%" stopColor="#AA771C" />
                            </linearGradient>
                            <filter id="gold-bevel">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" result="specOut" lightingColor="#white">
                                    <fePointLight x="-5000" y="-10000" z="20000" />
                                </feSpecularLighting>
                                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                            </filter>
                        </defs>

                        {/* Box Body */}
                        <path d={heartPath} fill="url(#gold-shine)" filter="url(#gold-bevel)" stroke="#8A6E2F" strokeWidth="1" />

                        {/* Inner Velvet Liner */}
                        <path d={heartPath} fill="#260e0e" transform="scale(0.94) translate(10.5, 10.5)" stroke="#3E2723" strokeWidth="2" style={{ boxShadow: 'inset 0 0 20px black' }} />
                    </svg>
                </div>

                {/* 3. CHOCOLATES LOOP */}
                <div className="absolute inset-0 z-20">
                    <AnimatePresence mode="wait">
                        {!allEaten ? (
                            <motion.div className="w-full h-full relative" exit={{ opacity: 0 }}>
                                {chocolates.map((choco, i) => (
                                    <div
                                        key={choco.id}
                                        className="absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ top: positions[i].top, left: positions[i].left }}
                                    >
                                        <AnimatePresence>
                                            {choco.status !== 'eaten' && (
                                                <motion.div
                                                    className={`relative w-full h-full flex items-center justify-center ${isBoxOpen ? 'cursor-pointer' : ''}`}
                                                    onClick={(e) => handleChocolateClick(choco.id, e)}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                                                    whileHover={isBoxOpen ? { scale: 1.15, filter: "brightness(1.1)" } : {}}
                                                    whileTap={isBoxOpen ? { scale: 0.95 } : {}}
                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }} // Bouncy pop
                                                >
                                                    {/* Paper Cup */}
                                                    <div className="absolute bottom-0 w-14 h-14 rounded-full shadow-lg"
                                                        style={{
                                                            background: 'repeating-conic-gradient(#3E2723 0deg 10deg, #281512 10deg 20deg)',
                                                            boxShadow: '0 8px 12px -2px rgba(0,0,0,0.6)'
                                                        }}
                                                    />

                                                    {/* Chocolate Ball */}
                                                    {choco.status === 'whole' ? (
                                                        <div className="relative w-12 h-12 rounded-full z-10 shadow-[0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden">
                                                            {/* Gold Foil - Animated Shine */}
                                                            <div className="absolute inset-0 rounded-full" style={{ background: goldFoil }}></div>
                                                            <motion.div
                                                                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/50 to-transparent"
                                                                animate={{ x: ['-100%', '100%'] }}
                                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                            />
                                                            {/* Texture */}
                                                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/crinkle-paper.png')] mix-blend-multiply"></div>
                                                            {/* Sticker */}
                                                            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-8 h-4 bg-white rounded-[50%] flex items-center justify-center border-[0.5px] border-amber-600 shadow-sm z-20">
                                                                <div className="w-1 h-3 border-x border-amber-800 mx-0.5"></div>
                                                                <div className="w-full h-[1px] bg-amber-800 absolute"></div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // BITTEN - High Detail
                                                        <div className="relative w-12 h-12 rounded-full bg-[#1a100e] z-10 overflow-hidden shadow-inner">
                                                            {/* Inner Chocolate */}
                                                            <div className="absolute inset-0 bg-[#3E2723]"></div>
                                                            {/* Wafer Shell */}
                                                            <div className="absolute inset-1 rounded-full border-[3px] border-[#D7CCC8]"></div>
                                                            {/* Hazelnut */}
                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-[#8D6E63] to-[#5D4037] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"></div>
                                                            {/* Bite Mask */}
                                                            <div className="absolute top-[-10%] right-[-10%] w-[55%] h-[55%] bg-transparent rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6)]"
                                                                style={{ clipPath: 'circle(100%)' }}>
                                                                {/* Simulating bitten edge */}
                                                                <div className="absolute top-0 right-0 w-full h-full bg-[#1a0505] rounded-full transform translate-x-2 -translate-y-2"></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            // FINAL LOVE LETTER LAYER
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", duration: 1.5 }}
                            >
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                                    <h3 className="text-3xl font-serif text-[#FFD700] mb-2 drop-shadow-md">My Eternal Sweetness</h3>
                                    <p className="text-amber-100/90 font-serif italic text-lg leading-relaxed mb-4">
                                        "No chocolate in the world compares to correct sweetness of your kiss."
                                    </p>
                                    <div className="text-5xl animate-pulse drop-shadow-[0_0_15px_red] mb-4">❤️</div>
                                    <p className="text-[#FFD700]/60 font-serif text-sm italic">
                                        Come back tomorrow for Teddy Day! 🧸
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 4. THE GLASS LID (Interactive) */}
                <AnimatePresence>
                    {!isBoxOpen && (
                        <motion.div
                            className="absolute inset-0 z-30 cursor-pointer"
                            onClick={() => setIsBoxOpen(true)}
                            initial={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                            exit={{
                                scale: 1.1,
                                opacity: 0,
                                x: 200,
                                y: -50,
                                rotate: 15,
                                filter: "blur(4px)"
                            }}
                            transition={{ duration: 1, ease: "anticipate" }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <svg viewBox="0 0 350 350" className="w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
                                {/* Glass Body */}
                                <path
                                    d={heartPath}
                                    fill="url(#glass-gradient)"
                                    stroke="rgba(255,255,255,0.4)"
                                    strokeWidth="1"
                                    style={{ backdropFilter: 'blur(3px)' }}
                                />
                                <defs>
                                    <linearGradient id="glass-gradient" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                                        <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
                                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                                    </linearGradient>
                                </defs>

                                {/* Reflections - High Gloss */}
                                <path
                                    d="M 175 305 C 175 305 320 220 320 115 A 70 70 0 0 0 175 65 A 70 70 0 0 0 30 115 C 30 220 175 305 175 305"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.6)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    transform="scale(0.95) translate(8.75, 8.75)"
                                    opacity="0.8"
                                />
                                {/* Top Glint */}
                                <path d="M 60 100 Q 100 60 140 80" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" filter="blur(1px)" />
                            </svg>

                            {/* BRAND LABEL (Gold Foil Effect) */}
                            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                                <motion.div
                                    className="w-48 h-32 bg-white rounded-[50%] shadow-xl flex flex-col items-center justify-center border-4 border-[#C49102]"
                                    initial={{ y: 0 }}
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    {/* Inner dashed ring */}
                                    <div className="absolute inset-1 rounded-[50%] border-2 border-dashed border-[#C49102]/60"></div>

                                    <h2 className="text-[#3E2723] font-serif font-black text-2xl tracking-tight relative z-10 drop-shadow-sm">
                                        FERRERO
                                    </h2>
                                    <h3 className="text-[#5D4037] font-serif text-lg tracking-widest uppercase scale-y-75 relative z-10 -mt-1 font-bold">
                                        ROCHER
                                    </h3>

                                    {/* Gold Icons */}
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600"></div>)}
                                    </div>
                                    <div className="flex gap-1 -mt-1">
                                        {[1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600"></div>)}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Tap Indicator */}
                            <motion.div
                                className="absolute bottom-20 w-full text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <span className="bg-black/50 text-white px-4 py-2 rounded-full text-xs font-serif tracking-widest backdrop-blur-sm border border-white/20">
                                    TAP TO OPEN
                                </span>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* FOOTER */}
            <motion.div
                className="mt-16 text-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <p className="text-[#FFD700]/60 text-xs font-serif tracking-[0.2em]">
                    CRAFTED FOR YOU
                </p>
            </motion.div>
        </div>
    );
};

export default ChocolateDay;
