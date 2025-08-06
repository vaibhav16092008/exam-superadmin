"use client";

import { removeToken } from "@/utils/connection";
import { NextURL } from "next/dist/server/web/next-url";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = ({ isOpen, setSidebarOpen }) => {
    const currentPath = usePathname();
    const router = useRouter();
    const [expandedMenus, setExpandedMenus] = useState({});

    const toggleMenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const navItems = [
        {
            name: "Dashboard",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
            path: "/dashboard",
        },
        {
            name: "Exams",
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            path: "/exams",
            submenu: [
                {
                    name: "Create Exam",
                    path: "/exams/create",
                },
                {
                    name: "Exam List",
                    path: "/exams/list",
                },
                {
                    name: "Results",
                    path: "/exams/results",
                }
            ]
        },
        {
            name: "Questions",
            icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            path: "/questions",
            submenu: [
                {
                    name: "Question Bank",
                    path: "/questions/bank",
                },
                {
                    name: "Import Questions",
                    path: "/questions/import",
                }
            ]
        },
        {
            name: "Users",
            icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
            path: "/users",
            submenu: [
                {
                    name: "All Users",
                    path: "/dashboard/users",
                },
                {
                    name: "Pendings",
                    path: "/dashboard/users/approvals",
                },
                {
                    name: "Permissions",
                    path: "/users/permissions",
                }
            ]
        },
        {
            name: "Analytics",
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            path: "/analytics",
        },
        {
            name: "Settings",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
            path: "/settings",
            submenu: [
                {
                    name: "General",
                    path: "/settings/general",
                },
                {
                    name: "Themes",
                    path: "/dashboard/settings/themes",
                },
                {
                    name: "Notifications",
                    path: "/settings/notifications",
                }
            ]
        },
    ];

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    const isSubmenuActive = (submenu) => {
        return submenu.some(item => item.path === currentPath);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-md z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:relative z-50 ${isOpen ? "w-64" : "w-20"} 
                bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
                flex flex-col transition-all duration-300 ease-in-out h-screen 
                ${isOpen ? "left-0" : "-left-20 lg:left-0"}`}
            >
                {/* Close Button for Mobile */}
                {isOpen && (
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}

                {/* Logo */}
                <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 px-4">
                    {isOpen ? (
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            ExamManager
                        </h1>
                    ) : (
                        <div className="w-9 h-9 bg-primary-600 rounded-md flex items-center justify-center shadow-sm">
                            <span className="text-white font-semibold text-sm">EM</span>
                        </div>
                    )}
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = item.path === currentPath ||
                                (item.submenu && isSubmenuActive(item.submenu));
                            const isExpanded = expandedMenus[item.name];

                            return (
                                <li key={item.name}>
                                    <div className="flex flex-col">
                                        {item.submenu ? (
                                            <>
                                                <button
                                                    onClick={() => toggleMenu(item.name)}
                                                    className={`flex items-center justify-between w-full p-2.5 rounded-md group transition-colors duration-200 
                                                    ${isActive
                                                            ? "bg-primary-600 text-white"
                                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80"
                                                        }`}
                                                >
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`h-5 w-5 transition-colors duration-200 
                                                            ${isActive
                                                                    ? "text-white"
                                                                    : "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                                                                }`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={isActive ? 2 : 1.5}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d={item.icon}
                                                            />
                                                        </svg>
                                                        {isOpen && (
                                                            <span
                                                                className={`ml-3 text-sm font-medium transition-all duration-200 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                                                    }`}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {isOpen && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`h-4 w-4 transform transition-transform duration-200 ${isExpanded ? "rotate-90" : ""} ${isActive ? "text-white" : "text-gray-400"}`}
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 5l7 7-7 7"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                                {isExpanded && isOpen && (
                                                    <ul className="ml-8 mt-1 space-y-1">
                                                        {item.submenu.map((subItem) => {
                                                            const isSubActive = subItem.path === currentPath;
                                                            return (
                                                                <li key={subItem.name}>
                                                                    <Link
                                                                        href={subItem.path}
                                                                        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 
                                                                        ${isSubActive
                                                                                ? "bg-primary-100 text-primary-700 dark:bg-gray-700/50 dark:text-primary-400"
                                                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/60"
                                                                            }`}
                                                                    >
                                                                        <span className="truncate">
                                                                            {subItem.name}
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                aria-current={isActive ? "page" : undefined}
                                                className={`flex items-center p-2.5 rounded-md group transition-colors duration-200 
                                                ${isActive
                                                        ? "bg-primary-600 text-white"
                                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80"
                                                    }`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`h-5 w-5 transition-colors duration-200 
                                                    ${isActive
                                                            ? "text-white"
                                                            : "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                                                        }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={isActive ? 2 : 1.5}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d={item.icon}
                                                    />
                                                </svg>
                                                {isOpen && (
                                                    <span
                                                        className={`ml-3 text-sm font-medium transition-all duration-200 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full p-2.5 rounded-md group transition-colors duration-200
                        text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        {isOpen && (
                            <span
                                className={`ml-3 text-sm font-medium transition-all duration-200 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
                                    }`}
                            >
                                Logout
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;