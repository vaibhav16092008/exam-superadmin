"use client";
import React, { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { getCall } from '@/utils/apiCall';
import Pagination from '@/components/Pagination';

const AdminApprovalPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 1,
        total: 0
    });

    const fetchPendingAdmins = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getCall(`users/admins/pending?limit=${pagination.limit}&page=${pagination.page}`);

            if (!response.status === 200) {
                throw new Error('Failed to fetch pending admins');
            }

            const data = response?.data;
            setUsers(data?.admins);
            setPagination(prev => ({
                ...prev,
                total: data?.total
            }));
        } catch (err) {
            console.error('Error fetching pending admins:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingAdmins();
    }, [pagination.page, pagination.limit]);

    const handleApprove = async (userId) => {
        try {
            const response = await fetch(`/api/users/approve-admin/${userId}`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to approve admin');
            }

            fetchPendingAdmins();
        } catch (err) {
            console.error('Error approving admin:', err);
            setError(err.message);
        }
    };

    const handleReject = async (userId) => {
        try {
            const response = await fetch(`/api/users/reject-admin/${userId}`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to reject admin');
            }

            fetchPendingAdmins();
        } catch (err) {
            console.error('Error rejecting admin:', err);
            setError(err.message);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleLimitChange = (newLimit) => {
        setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold">Pending Admin Approvals</h2>

                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchPendingAdmins}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="text-sm">Refresh</span>
                    </button>
                </div>
            </div>

            {error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4 text-red-700 dark:text-red-300">
                    <p>Error: {error}</p>
                    <button
                        onClick={fetchPendingAdmins}
                        className="mt-2 text-sm text-red-700 dark:text-red-300 hover:underline"
                    >
                        Try again
                    </button>
                </div>
            ) : loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : users.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                    <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No pending approvals</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">All admin requests have been processed.</p>
                </div>
            ) : (
                <>
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-medium">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium">{user.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                                                    Pending
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleApprove(user._id)}
                                                        disabled={loading}
                                                        className="text-green-600 hover:text-green-900 dark:hover:text-green-300 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 p-2 rounded-md transition-colors disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(user._id)}
                                                        disabled={loading}
                                                        className="text-red-600 hover:text-red-900 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 p-2 rounded-md transition-colors disabled:opacity-50"
                                                        title="Reject"
                                                    >
                                                        <XMarkIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        currentPage={pagination.page}
                        totalItems={pagination.total}
                        itemsPerPage={pagination.limit}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleLimitChange}
                        loading={loading}
                    />
                </>
            )}
        </div>
    );
};

export default AdminApprovalPage;