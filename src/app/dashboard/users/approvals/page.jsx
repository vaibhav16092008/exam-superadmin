"use client";
import React, { useState, useEffect } from 'react';
import { CheckIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getCall, putCall } from '@/utils/apiCall';
import Table from '@/components/Table';
import toast from 'react-hot-toast';

const AdminApprovalPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0
    });

    const fetchPendingAdmins = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getCall(`users/admins/pending?limit=${pagination.limit}&page=${pagination.page}`);

            if (!response.status === 200) {
                toast.error("Failed to fetch pending admins")
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

    const handleApprove = async (user) => {
        console.log(user);
        const payload = { "isApproved": true }
        try {
            const response = await putCall(`users/admins/${user?._id || user?.id}/approval`, payload)
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data.message);
                fetchPendingAdmins();
            } else {
                toast.error(response.data.message);

            }

        } catch (err) {
            console.error('Error approving admin:', err);
            setError(err.message);
        }
    };

    const handleReject = async (user) => {
        const payload = { "isApproved": false }
        try {
            const response = await putCall(`users/admins/${user?._id || user?.id}/approval`, payload)

            if (!response.status === 200) {
                toast.error('Failed to reject admin');
            } else {
                toast.success('Admin Rejection Successful!');
                fetchPendingAdmins();
            }

        } catch (err) {
            console.error('Error approving admin:', err);
            setError(err.message);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleLimitChange = (newLimit) => {
        setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    };

    const columns = [
        {
            key: 'name',
            title: 'Name',
            render: (user) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-medium">
                        {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium">{user.name}</div>
                    </div>
                </div>
            ),
            renderText: (user) => user.name
        },
        {
            key: 'email',
            title: 'Email'
        },
        {
            key: 'status',
            title: 'Status',
            render: () => (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    Pending
                </span>
            ),
            renderText: () => "Pending"
        }
    ];

    const rowActions = [
        {
            icon: <CheckIcon className="h-5 w-5" />,
            title: 'Approve',
            handler: handleApprove,
            className: 'text-green-600 hover:text-green-900 dark:hover:text-green-300 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50'
        },
        {
            icon: <XMarkIcon className="h-5 w-5" />,
            title: 'Reject',
            handler: handleReject,
            className: 'text-red-600 hover:text-red-900 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50'
        }
    ];

    const emptyState = {
        icon: <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />,
        title: "No pending approvals",
        description: "All admin requests have been processed."
    };

    return (
        <Table
            title="Pending Admin Approvals"
            data={users}
            columns={columns}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onRefresh={fetchPendingAdmins}
            emptyState={emptyState}
            rowActions={rowActions}
            rowKey="_id"
        />
    );
};

export default AdminApprovalPage;