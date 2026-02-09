import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ValentineDay = () => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [yesPressed, setYesPressed] = useState(false);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPosition({ x, y });
    };

    return (
        <div className="relative text-center z-10 w-full max-w-lg mx-auto">
            {!yesPressed ? (
                <div className="relative z-10 bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border-2 border-red-200">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-8xl mb-6 relative"
                    >
                        ❤️
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-4xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            💖
                        </motion.div>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-serif text-red-600 mb-6 font-bold leading-tight">
                        Will you be my Valentine?
                    </h1>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 relative h-32 md:h-20">
                        <motion.button
                            className="px-8 py-3 bg-red-600 text-white rounded-full text-xl font-bold shadow-lg hover:bg-red-700 transition-colors z-20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setYesPressed(true)}
                        >
                            YES! 😍
                        </motion.button>

                        <motion.button
                            className="px-8 py-3 bg-gray-300 text-gray-600 rounded-full text-xl font-bold"
                            animate={noBtnPosition}
                            onHoverStart={moveNoButton}
                            onClick={moveNoButton} // For mobile tap
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            No 😢
                        </motion.button>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-4 border-red-400"
                >
                    <h1 className="text-5xl md:text-6xl font-serif text-red-600 font-bold mb-4">
                        YAYYY! 🎉
                    </h1>
                    <p className="text-2xl text-red-800 font-medium">
                        I knew you'd say yes! ❤️
                    </p>
                    <div className="text-9xl mt-8 animate-bounce">
                        💑
                    </div>
                    <p className="mt-6 text-red-500 italic">
                        (There was never a choice, honestly 😉)
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ValentineDay;
