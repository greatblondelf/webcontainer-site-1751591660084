import React from 'react';

const ProcessingStep = ({ url, onCancel }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="spinner mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Processing Website
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Analyzing content from: 
        </p>
        <p className="text-primary-600 dark:text-primary-400 font-medium break-all">
          {url}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          <span className="text-gray-700 dark:text-gray-300">Fetching webpage content...</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-500 dark:text-gray-400">Generating summary...</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-500 dark:text-gray-400">Preparing results...</span>
        </div>
      </div>

      <button
        onClick={onCancel}
        className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Cancel processing"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProcessingStep;
