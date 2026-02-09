import React from 'react';
import { motion } from 'framer-motion';

const KissDay = () => {
    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-fuchsia-200">
                <motion.div
                    className="text-8xl mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    💋
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-fuchsia-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Kiss Day
                </motion.h1>

                <motion.p
                    className="text-fuchsia-800 font-sans text-lg italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    "A kiss is a lovely trick designed by nature so we don't have to speak."
                </motion.p>

                <motion.button
                    className="mt-8 px-6 py-2 bg-fuchsia-500 text-white rounded-full font-semibold shadow-lg hover:bg-fuchsia-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        // Spawn kisses
                        const kiss = document.createElement('div');
                        kiss.innerHTML = '💋';
                        kiss.style.position = 'fixed';
                        kiss.style.left = Math.random() * window.innerWidth + 'px';
                        kiss.style.top = window.innerHeight + 'px';
                        kiss.style.fontSize = (Math.random() * 5 + 8) + 'rem';
                        kiss.style.transition = 'all 2s ease-out';
                        document.body.appendChild(kiss);

                        setTimeout(() => {
                            kiss.style.top = '-100px';
                            kiss.style.opacity = '0';
                        }, 100);

                        setTimeout(() => kiss.remove(), 2000);
                    }}
                >
                    Send a Kiss
                </motion.button>
            </div>
        </div>
    );
};

export default KissDay;
