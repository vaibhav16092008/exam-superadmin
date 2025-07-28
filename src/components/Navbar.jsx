'use client';

import { useUser } from "@/contexts/UserContext";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useUser();
    const name = user?.name.split(" ").map(word => word[0].toUpperCase()).join("");


    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 transition-colors duration-300">
            <div className="flex items-center justify-between px-6 py-3">
                {/* Left Side - Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-white focus:outline-none transition-colors duration-300"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Right Side - User Controls */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white relative transition-colors duration-300">
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
                    </button>

                    <div className="relative">
                        <button className="flex items-center space-x-2 focus:outline-none group">
                            <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <span className="text-white font-medium">{name}</span>
                            </div>
                            <span className="text-gray-700 dark:text-white text-sm font-medium hidden md:inline-block transition-colors duration-300">
                                Super Admin
                            </span>
                            <svg
                                className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;