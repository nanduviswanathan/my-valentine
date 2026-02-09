import React from 'react';
import { motion } from 'framer-motion';

const TeddyDay = () => {
    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-orange-200">
                <motion.div
                    className="text-8xl mb-6"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    🧸
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-orange-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Teddy Day
                </motion.h1>

                <motion.p
                    className="text-orange-800 font-sans text-lg italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    "Sending you a big warm bear hug!"
                </motion.p>

                <motion.div
                    className="mt-6 flex justify-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {['🐻', '🐼', '🐨'].map((bear, i) => (
                        <motion.span
                            key={i}
                            className="text-3xl cursor-pointer"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                            {bear}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.p
                    className="text-orange-800/60 font-serif text-sm italic mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Come back tomorrow for Promise Day! 🤞
                </motion.p>
            </div>
        </div>
    );
};

export default TeddyDay;
