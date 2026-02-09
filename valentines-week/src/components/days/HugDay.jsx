import React from 'react';
import { motion } from 'framer-motion';

const HugDay = () => {
    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-teal-200">
                <motion.div
                    className="text-8xl mb-6 relative inline-block"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                    🤗
                    <motion.span
                        className="absolute inset-0 text-teal-300 opacity-30 blur-xl"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    >
                        🤗
                    </motion.span>
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-teal-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Hug Day
                </motion.h1>

                <motion.p
                    className="text-teal-800 font-sans text-lg italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    "Sometimes a hug is all you need to make everything better."
                </motion.p>

                <motion.div
                    className="mt-6 p-4 bg-teal-100 rounded-lg text-teal-700 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Wrap your arms around yourself<br />(and pretend it's me!)
                </motion.div>

                <motion.p
                    className="text-teal-800/60 font-serif text-sm italic mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Come back tomorrow for Kiss Day! 💋
                </motion.p>
            </div>
        </div>
    );
};

export default HugDay;
