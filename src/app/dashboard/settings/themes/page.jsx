"use client";
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const ThemeChanger = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const router = useRouter();

    const changeTheme = (theme) => {
        // Remove all theme classes first
        document.documentElement.classList.remove(...themes.map((t) => t.value));

        if (theme) {
            document.documentElement.classList.add(theme);
        }
        setSelectedTheme(theme);
    };

    const themes = [
        { name: 'Sky', value: 'theme-sky', color: 'bg-sky-500' },
        { name: 'Violet', value: 'theme-violet', color: 'bg-violet-500' },
        { name: 'Blue', value: 'theme-blue', color: 'bg-blue-500' },
        { name: 'Rose', value: 'theme-rose', color: 'bg-rose-500' },
        { name: 'Green', value: 'theme-green', color: 'bg-green-500' },
        { name: 'Lime', value: 'theme-lime', color: 'bg-lime-500' },
        { name: 'Pink', value: 'theme-pink', color: 'bg-pink-500' },
        { name: 'Teal', value: 'theme-teal', color: 'bg-teal-500' },
        { name: 'Brown', value: 'theme-brown', color: 'bg-[#b88c66]' },
        { name: 'Fuchsia', value: 'theme-fuchsia', color: 'bg-fuchsia-500' },
        { name: 'Indigo', value: 'theme-indigo', color: 'bg-indigo-500' },
        { name: 'Red', value: 'theme-red', color: 'bg-red-500' },
        { name: 'Stone', value: 'theme-stone', color: 'bg-stone-500' },
        { name: 'Yellow', value: 'theme-yellow', color: 'bg-yellow-500' },
        { name: 'Slate', value: 'theme-slate', color: 'bg-slate-500' },
        { name: 'Navy', value: 'theme-navy', color: 'bg-[#2662d9]' },
        { name: 'Amber', value: 'theme-amber', color: 'bg-amber-500' },
        { name: 'Grape', value: 'theme-grape', color: 'bg-[#b140ea]' },
        { name: 'Sand', value: 'theme-sand', color: 'bg-[#D4B668]' },
        { name: 'Maroon', value: 'theme-maroon', color: 'bg-[#be394f]' },
        { name: 'Forest', value: 'theme-forest', color: 'bg-[#76b27a]' },
        { name: 'Charcoal', value: 'theme-charcoal', color: 'bg-[#85898d]' },
    ];

    return (
        <>
            {/* Floating toggle button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed right-6 bottom-6 z-40 p-3 rounded-full shadow-lg bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 transition-all duration-300 group"
                aria-label="Change theme"
            >
                <Cog6ToothIcon className="h-6 w-6 group-hover:rotate-45 transition-transform duration-300" />
            </button>

            {/* Sidebar overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-2xl  z-50 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Theme sidebar */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Theme Settings</h2>
                    <button
                        onClick={() => { setIsOpen(false); router.push('/dashboard') }}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        aria-label="Close theme settings"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-120px)]">
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 uppercase tracking-wider">Color Theme</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => setSelectedTheme(t.value)}
                                    className={`p-3 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2
                                        ${selectedTheme === t.value
                                            ? 'border-primary-400 rounded-full dark:border-primary-400 '
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
                                    `}
                                >
                                    <div className={`h-8 w-8 rounded-full ${t.color} ${selectedTheme === t.value ? 'scale-130' : 'scale-100'} shadow-inner`} />
                                    {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{t.name}</span> */}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0  left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <button
                        onClick={() => {
                            changeTheme(selectedTheme);
                            setIsOpen(false);
                            router.push('/dashboard');
                        }}
                        disabled={!selectedTheme}
                        className={`w-full py-2 px-4 rounded-md transition-colors duration-300
                            ${selectedTheme
                                ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'}
                        `}
                    >
                        Apply Settings
                    </button>
                </div>
            </div>
        </>
    );
};

export default ThemeChanger;