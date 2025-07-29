"use client";
import React from 'react';

const DashboardPage = () => {
    const stats = [
        { title: "Total Exams", value: "24", change: "+12%", icon: "📊" },
        { title: "Active Users", value: "1,234", change: "+5%", icon: "👥" },
        { title: "Questions", value: "5,678", change: "+8%", icon: "❓" },
        { title: "Pass Rate", value: "82%", change: "+3%", icon: "🎯" },
        { title: "Avg. Score", value: "76%", change: "-2%", icon: "📈" },
        { title: "Pending Reviews", value: "14", change: "+4", icon: "⏳" }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {stat.title}
                                </p>
                                <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.change} from last month
                                </p>
                            </div>
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400 text-xl">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Recent Activity
                </h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-4">
                                <span className="text-gray-600 dark:text-gray-300">🔔</span>
                            </div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                    New exam created by Admin
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;