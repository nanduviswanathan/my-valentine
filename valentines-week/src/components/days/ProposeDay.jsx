import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProposeDay = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-200">
                <motion.div
                    className="text-8xl mb-6 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ y: 0 }}
                    animate={{ y: isOpen ? 10 : 0 }}
                >
                    {isOpen ? '💍' : '🎁'}
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-pink-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Propose Day
                </motion.h1>

                <motion.p
                    className="text-pink-700 font-sans text-lg italic mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {isOpen ? "Will you be mine forever?" : "Tap the box to reveal my heart..."}
                </motion.p>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-pink-600"
                    >
                        <p>Use your heart where your words fail.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProposeDay;
