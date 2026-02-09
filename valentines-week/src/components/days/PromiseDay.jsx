import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PromiseDay = () => {
    const promises = [
        "I promise to always listen.",
        "I promise to support your dreams.",
        "I promise to share the last slice of pizza.",
        "I promise to make you smile every day.",
        "I promise to love you more than yesterday."
    ];

    const [currentPromise, setCurrentPromise] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleNext = () => {
        if (currentPromise < promises.length - 1) {
            setCurrentPromise(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    return (
        <div className="relative text-center z-10 w-full max-w-md mx-auto">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-200 transaction-all duration-500">
                <motion.div
                    className="text-8xl mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    🤞
                </motion.div>

                <motion.h1
                    className="text-4xl font-serif text-blue-900 mb-4 drop-shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Happy Promise Day
                </motion.h1>

                <div className="min-h-[120px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {!isFinished ? (
                            <motion.div
                                key={currentPromise}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="w-full"
                            >
                                <p className="text-blue-800 font-serif text-2xl italic font-medium leading-relaxed">
                                    "{promises[currentPromise]}"
                                </p>
                                <p className="text-blue-400 text-xs mt-4 font-sans tracking-widest uppercase">
                                    Promise {currentPromise + 1} of {promises.length}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="finished"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full"
                            >
                                <p className="text-blue-900 font-bold text-xl mb-2">
                                    And above all...
                                </p>
                                <p className="text-blue-700 font-serif text-lg italic mb-6">
                                    "I promise to be yours, forever and always."
                                </p>
                                <div className="w-16 h-1 bg-blue-200 mx-auto rounded-full mb-6"></div>
                                <motion.p
                                    className="text-blue-800/60 font-serif text-sm italic"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Come back tomorrow for Hug Day! 🤗
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!isFinished && (
                    <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition-colors"
                    >
                        {currentPromise === promises.length - 1 ? "Start Forever" : "Next Promise"}
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default PromiseDay;
