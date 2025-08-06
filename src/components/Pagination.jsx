"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
    loading = false
}) => {
    const pageInputRef = useRef(null);
    const debounceTimer = useRef(null);
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;


    const handlePageChange = (newPage) => {
        const validatedPage = Math.max(1, Math.min(newPage, totalPages));
        if (validatedPage !== currentPage) {
            onPageChange(validatedPage);
        }
    };

    const handlePageInputChange = (e) => {
        const value = e.target.value;
        if (value === '') return;

        const pageNum = parseInt(value);
        if (!isNaN(pageNum)) {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }

            debounceTimer.current = setTimeout(() => {
                handlePageChange(pageNum);
            }, 500);
        }
    };

    const handleItemsPerPageChange = (e) => {
        const newLimit = Number(e.target.value);
        onItemsPerPageChange(newLimit);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                </span> to{' '}
                <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>{' '}
                of <span className="font-medium">{totalItems}</span> results
            </div>

            <div className="flex items-center justify-center flex-wrap gap-4">
                {onItemsPerPageChange && (
                    <div className="flex items-center  gap-2">
                        <label htmlFor="limit" className="text-sm text-gray-600 dark:text-gray-400">
                            Show:
                        </label>
                        <select
                            id="limit"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            disabled={loading}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                )}

                <div className="flex items-center flex-wrap gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span className="text-sm hidden sm:block">Previous</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Page</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            defaultValue={currentPage}
                            onBlur={(e) => {
                                let val = parseInt(e.target.value);
                                if (val > totalPages) {
                                    e.target.value = totalPages;
                                    handlePageChange(totalPages);
                                }
                            }}
                            onChange={handlePageInputChange}
                            className="w-10 text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            ref={pageInputRef}
                            disabled={loading}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">of {totalPages}</span>
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages || loading}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        <span className="text-sm hidden sm:block">Next</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;