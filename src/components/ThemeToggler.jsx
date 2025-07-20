'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggler = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log(systemDark);
        console.log(savedTheme);

        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setDarkMode(!darkMode);

        setTimeout(() => {
            if (!darkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                console.log(localStorage.getItem('theme'));


            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                console.log(localStorage.getItem('theme'));
            }
            setIsAnimating(false);
        }, 200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Background transition effect */}
            <AnimatePresence>
                {darkMode && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 30, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full bg-gray-900 origin-center"
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                onClick={toggleTheme}
                className={`p-3 rounded-full cursor-pointer shadow-lg ${darkMode
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                    }`}
                aria-label="Toggle dark mode"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={false}
                animate={{
                    rotate: darkMode ? 360 : 0,
                    transition: { duration: 0.5 }
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={darkMode ? 'sun' : 'moon'}
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {darkMode ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ThemeToggler;