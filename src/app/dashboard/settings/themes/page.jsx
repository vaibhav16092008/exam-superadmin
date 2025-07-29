"use client";
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const ThemeChanger = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [theme, setTheme] = useState();
    const router = useRouter();


    const changeTheme = (selectedTheme) => {
        document.documentElement.classList.add(selectedTheme);
        // localStorage.setItem('theme', selectedTheme);
        setTheme(selectedTheme);
    };

    const themes = [
        { name: 'Sky', value: 'theme-sky', color: 'sky' },
        { name: 'Violet', value: 'theme-violet', color: 'violet' },
        { name: 'Blue', value: 'theme-blue', color: 'blue' },
        { name: 'Rose', value: 'theme-rose', color: 'rose' }
    ];

    return (
        <>
            {/* Floating toggle button */}
            {/* <button
                onClick={() => setIsOpen(true)}
                className="fixed right-6 bottom-6 z-50 p-3 rounded-full shadow-lg bg-gray-100 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-700 text-primary-400 hover:text-primary-300 transition-all duration-300"
                aria-label="Change theme"
            >dddddddddddddddddddddddddddddddd
                <Cog6ToothIcon className="h-6 w-6" />
            </button> */}

            {/* Sidebar overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Theme sidebar */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700s shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 ">Theme Settings</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer dark:hover:text-red-500 p-1 rounded-full focus:outline-none"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">COLOR THEME</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setTheme(t.value)}
                                    className={`bg-${t.color}-600  p-4 rounded-lg border-2  hover:border-primary-400 dark:hover:border-primary-300 transition-all duration-200 flex flex-col items-center`}
                                >
                                    {/* {t.value === 'dark' ? (
                                        <MoonIcon className="h-6 w-6 mb-2" />
                                    ) : t.value === 'light' ? (
                                        <SunIcon className="h-6 w-6 mb-2" />
                                    ) : (
                                        <div className="h-6 w-6 mb-2 flex items-center justify-center">
                                            <div className={`h-4 w-4 rounded-full ${t.value === 'emerald' ? 'bg-primary-400' : 'bg-slate-400'}`} />
                                        </div>
                                    )} */}
                                    <span>{t.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 dark:border-gray-800">
                    <button
                        onClick={() => {
                            changeTheme(theme);
                            setIsOpen(false);
                            router.push('/dashboard')
                        }}
                        className="w-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                    >
                        Apply Settings
                    </button>
                </div>
            </div>
        </>
    );
};

export default ThemeChanger;