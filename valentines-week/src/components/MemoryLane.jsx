import React from 'react';
import { motion } from 'framer-motion';

const MemoryLane = () => {
    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-rose-200">
                <motion.h1
                    className="text-4xl font-serif text-rose-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Love Beyond 14th Feb
                </motion.h1>

                <motion.p
                    className="text-rose-800 font-sans text-lg italic mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    "Valentine's Week may be over, but my love for you grows every single day."
                </motion.p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    {/* Placeholders for memories/photos */}
                    {[1, 2, 3, 4].map((item) => (
                        <motion.div
                            key={item}
                            className="bg-rose-100 h-24 rounded-lg flex items-center justify-center text-rose-300 text-2xl"
                            whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                        >
                            📸
                        </motion.div>
                    ))}
                </div>
                <p className="mt-4 text-xs text-rose-500">
                    (Add our photos here later!)
                </p>
            </div>
        </div>
    );
};

export default MemoryLane;
