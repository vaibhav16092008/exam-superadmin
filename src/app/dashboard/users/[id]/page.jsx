"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ClockIcon, EnvelopeIcon, UserCircleIcon, ShieldCheckIcon, BuildingLibraryIcon, CalendarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import { getCall } from '@/utils/apiCall';

const UserDetails = () => {
    const { id } = useParams();

    // Sample data - replace with your actual data fetching logic
    const userData = {
        "_id": "6877a6ba1f0572e3bce5faf8",
        "name": "Institute Admin",
        "email": "admin@gmail.com",
        "role": "admin",
        "instituteId": {
            "_id": "687899882311b4cb57c7351b",
            "name": "Starlight International School"
        },
        "classId": null,
        "isApproved": true,
        "createdAt": "2025-07-16T13:18:50.718Z",
        "updatedAt": "2025-07-17T06:34:48.563Z",
        "approvedBy": {
            "_id": "6877a44a3a2eb215441e7674",
            "name": "Vaibhav Kumar",
            "email": "vaibhav16092008@gmail.com"
        }
    };

    const getUserById = async () => {
        try {
            const response = await getCall(`/users/${id}`);
            console.log(response);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getUserById()
    }, [id])

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-3 rounded-full">
                                <UserCircleIcon className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{userData.name}</h1>
                                <p className="text-blue-100">{userData.role.toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-full flex items-center">
                            <ShieldCheckIcon className="h-5 w-5 mr-2" />
                            <span>{userData.isApproved ? 'Approved' : 'Pending'}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                                <UserCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Basic Information
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="font-medium">{userData.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                    <p className="font-medium flex items-center">
                                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                                        {userData.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">User Role</p>
                                    <p className="font-medium">{userData.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Institute Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                                <BuildingLibraryIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Institute Information
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Institute Name</p>
                                    <p className="font-medium">{userData.instituteId?.name || 'Not assigned'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Approved By</p>
                                    <p className="font-medium">
                                        {userData.approvedBy ? `${userData.approvedBy.name} (${userData.approvedBy.email})` : 'Not approved yet'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Timeline
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
                                    <p className="font-medium flex items-center">
                                        <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                        {formatDate(userData.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p className="font-medium flex items-center">
                                        <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                                        {formatDate(userData.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                                <CheckBadgeIcon className="h-5 w-5 mr-2 text-blue-500" />
                                Account Status
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Verification Status</p>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${userData.isApproved
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        }`}>
                                        {userData.isApproved ? 'Verified' : 'Pending Verification'}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Class Assignment</p>
                                    <p className="font-medium">
                                        {userData.classId ? `Assigned to class ${userData.classId}` : 'Not assigned to any class'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        Edit Profile
                    </button>
                    <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;