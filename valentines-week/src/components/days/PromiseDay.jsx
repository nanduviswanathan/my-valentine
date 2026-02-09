import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PromiseDay = () => {
    const promises = [
        "I promise to always listen.",
        "I promise to support your dreams.",
        "I promise to share the last slice of pizza.",
        "I promise to make you smile every day.",
        "I promise to love you more than yesterday."
    ];

    const [currentPromise, setCurrentPromise] = useState(0);

    return (
        <div className="relative text-center z-10">
            <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-200">
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

                <motion.div
                    className="h-24 flex items-center justify-center"
                    key={currentPromise}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <p className="text-blue-800 font-sans text-xl italic font-medium">
                        "{promises[currentPromise]}"
                    </p>
                </motion.div>

                <button
                    onClick={() => setCurrentPromise((prev) => (prev + 1) % promises.length)}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                    Next Promise
                </button>
            </div>
        </div>
    );
};

export default PromiseDay;
