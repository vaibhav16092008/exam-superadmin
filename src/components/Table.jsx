"use client";
import React, { useRef } from 'react';
import { CheckIcon, XMarkIcon, ClockIcon, ArrowPathIcon, PrinterIcon, DocumentDuplicateIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/Pagination';
import toast from 'react-hot-toast';

const Table = ({
    title,
    data,
    columns,
    loading,
    error,
    pagination,
    onPageChange,
    onLimitChange,
    onRefresh,
    emptyState,
    rowActions,
    rowKey = "id"
}) => {
    const tableRef = useRef(null);

    data.map((item) => console.log(item));

    // Function to handle printing the table
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const tableHtml = tableRef.current.outerHTML;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Print ${title}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .no-print { display: none; }
                        @page { size: auto; margin: 5mm; }
                    </style>
                </head>
                <body>
                    <h2>${title}</h2>
                    ${tableHtml}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 200);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    // Function to copy table data to clipboard
    const handleCopyToClipboard = () => {
        // Get visible column headers
        const headers = columns.map(col => col.title).join('\t');

        // Get visible data rows
        const rows = data.map(item =>
            columns.map(col =>
                col.render ? (col.renderText ? col.renderText(item) : '') : item[col.key]

            ).join('\t')
        ).join('\n');

        const textToCopy = `${headers}\n${rows}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => toast.success('Table data copied to clipboard!'))
            .catch(err => toast.error('Table data failed to copy'));
    };

    // Function to export to CSV
    const handleExportToCSV = () => {
        // Prepare CSV header
        const headers = columns.map(col => `"${col.title}"`).join(',');

        // Prepare CSV rows
        const rows = data.map(item =>
            columns.map(col =>
                col.render
                    ? (col.renderText ? `"${col.renderText(item)}"` : '""')
                    : `"${item[col.key] !== undefined ? item[col.key] : ''}"`
            ).join(',')
        );

        // Combine header and rows
        const csvContent = [headers, ...rows].join('\n');

        // Create Blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-xl font-semibold">{title}</h2>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Export Toolbar */}
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={handlePrint}
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title="Print"
                        >
                            <PrinterIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={handleCopyToClipboard}
                            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title="Copy to Clipboard"
                        >
                            <DocumentDuplicateIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                            onClick={handleExportToCSV}
                            className="p-2  rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title="Export to Excel"
                        >
                            <DocumentArrowDownIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </button>
                    </div>

                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="text-sm">Refresh</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4 text-red-700 dark:text-red-300">
                    <p>Error: {error}</p>
                    {onRefresh && (
                        <button
                            onClick={onRefresh}
                            className="mt-2 text-sm text-red-700 dark:text-red-300 hover:underline"
                        >
                            Try again
                        </button>
                    )}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            )}

            {/* Empty State */}
            {!loading && data.length === 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                    {emptyState?.icon || <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />}
                    <h3 className="mt-2 text-lg font-medium">
                        {emptyState?.title || "No data available"}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        {emptyState?.description || "There are no records to display."}
                    </p>
                </div>
            )}

            {/* Data Table */}
            {!loading && data.length > 0 && (
                <>
                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto" ref={tableRef}>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        {columns.map((column) => (
                                            <th
                                                key={column.key}
                                                scope="col"
                                                className={`px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${column.align || 'text-left'}`}
                                            >
                                                {column.title}
                                            </th>
                                        ))}
                                        {rowActions && (
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {data.map((item) => (
                                        <tr key={item[rowKey]}>
                                            {columns.map((column) => (
                                                <td
                                                    key={`${item[rowKey]}-${column.key}`}
                                                    className={`px-6 py-4 whitespace-nowrap ${column.align || 'text-left'}`}
                                                >
                                                    {column.render ? column.render(item) : item[column.key]}
                                                </td>
                                            ))}

                                            {rowActions && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end space-x-2">
                                                        {rowActions.map((action, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => action.handler(item)}
                                                                disabled={loading}
                                                                className={`${action.className || 'text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/30 dark:hover:bg-gray-900/50'} p-2 rounded-md transition-colors disabled:opacity-50`}
                                                                title={action.title}
                                                            >
                                                                {action.icon}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination && (
                        <Pagination
                            currentPage={pagination.page}
                            totalItems={pagination.total}
                            itemsPerPage={pagination.limit}
                            onPageChange={onPageChange}
                            onItemsPerPageChange={onLimitChange}
                            loading={loading}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Table;