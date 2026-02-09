import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ currentDate }) => {
    const targetDate = new Date('2026-02-07T00:00:00'); // Rose Day start

    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <div className="text-center space-y-8">
            <motion.h1
                className="text-4xl md:text-6xl font-serif text-rose-600 font-bold"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                Valentine's Week <br /> is coming...
            </motion.h1>

            <div className="grid grid-cols-4 gap-4 text-rose-800">
                {Object.keys(timeLeft).map((interval) => (
                    <div key={interval} className="flex flex-col items-center p-4 bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-rose-100">
                        <span className="text-3xl font-bold font-mono">
                            {timeLeft[interval] || '0'}
                        </span>
                        <span className="capitalize text-sm text-rose-600">{interval}</span>
                    </div>
                ))}
            </div>

            <p className="text-rose-500 italic">Get ready for something special.</p>
        </div>
    );
};

export default Countdown;
