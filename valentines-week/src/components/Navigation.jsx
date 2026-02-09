import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VALENTINE_WEEK } from '../dates';
import { Menu, X, Lock, ChevronRight } from 'lucide-react';

const Navigation = ({ currentDate }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Normalize time for comparison
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    // Logic to persist the "Max Unlocked Date" across navigation
    // This allows users to visit past days (viewing Rose Day) without locking themselves out of the future (Chocolate Day)
    const params = new URLSearchParams(window.location.search);
    const paramMaxStr = params.get('maxDate');
    const paramMaxDate = paramMaxStr ? new Date(paramMaxStr) : null;

    // The "real" boundary is either the current simulated day (currentDate) OR the previously known max date, whichever is later.
    const effectiveBoundaryDate = (paramMaxDate && paramMaxDate > today) ? paramMaxDate : today;

    const boundaryDateString = effectiveBoundaryDate.toISOString().split('T')[0];

    return (
        <>
            {/* FAB (Floating Action Button) */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 p-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-lg text-white hover:bg-white/30 transition-all"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
            >
                <Menu size={24} />
            </motion.button>

            {/* Navigation Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="nav-backdrop"
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            key="nav-drawer"
                            className="fixed right-0 top-0 bottom-0 w-80 bg-white/95 shadow-2xl z-50 flex flex-col overflow-hidden"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {/* Header */}
                            <div className="p-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white flex justify-between items-center shadow-md">
                                <h2 className="text-xl font-serif font-bold">Our Journey</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {VALENTINE_WEEK.map((day) => {
                                    const dayDate = new Date(day.date);
                                    dayDate.setHours(0, 0, 0, 0);

                                    const isUnlocked = dayDate <= effectiveBoundaryDate;
                                    const isActive = dayDate.getTime() === today.getTime();

                                    return (
                                        <div key={day.id} className="relative">
                                            {isUnlocked ? (
                                                <a
                                                    href={`?date=${day.date}&maxDate=${boundaryDateString}`}
                                                    className={`block p-4 rounded-xl border transition-all ${isActive
                                                        ? 'bg-rose-50 border-rose-200 shadow-sm'
                                                        : 'bg-white border-gray-100 hover:border-rose-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <div className={`text-sm font-semibold mb-0.5 ${isActive ? 'text-rose-600' : 'text-gray-800'}`}>
                                                                {day.title}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{day.date}</div>
                                                        </div>
                                                        {isActive && <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />}
                                                        {!isActive && <ChevronRight size={16} className="text-gray-300" />}
                                                    </div>
                                                </a>
                                            ) : (
                                                <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex justify-between items-center opacity-70 cursor-not-allowed grayscale">
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-500">{day.title}</div>
                                                        <div className="text-xs text-gray-400">Coming Soon</div>
                                                    </div>
                                                    <Lock size={16} className="text-gray-400" />
                                                </div>
                                            )}

                                            {/* Connector Line (visual decoration) */}
                                            {day.id !== 'valentine-day' && (
                                                <div className="absolute left-6 bottom-0 w-[2px] h-3 bg-gray-100 translate-y-full -z-10" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400 font-serif italic">"Every day with you is a celebration."</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
