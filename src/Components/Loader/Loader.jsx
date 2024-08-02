import React from 'react';

const Loader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600">Loading data...</p>
    </div>
);

export default Loader;
