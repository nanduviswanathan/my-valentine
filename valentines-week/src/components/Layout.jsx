import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useValentineDate } from '../hooks/useValentineDate';
import Navigation from './Navigation';

const Layout = ({ children, theme }) => {
    // theme prop can carry background colors/gradients
    const gradient = theme?.gradient || 'from-pink-100 to-rose-200';
    const currentDate = useValentineDate();


    return (
        <div className={clsx("min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 bg-gradient-to-br", gradient)}>
            {/* Background Particles/Floating Hearts can go here */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-300/30"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight + 100,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: 0,
                        }}
                        animate={{
                            y: -100,
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 20,
                            ease: "linear",
                        }}
                    >
                        ♥
                    </motion.div>
                ))}
            </div>

            <Navigation currentDate={currentDate} />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-md p-6 md:p-8"
            >
                {children}
            </motion.main>
        </div>
    );
};

export default Layout;
