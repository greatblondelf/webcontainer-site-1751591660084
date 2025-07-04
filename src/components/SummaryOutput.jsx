import React, { useState } from 'react';

const SummaryOutput = ({ summary, url, onReset, rawResults, onDeleteObjects, createdObjects }) => {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Website Summary
          </h2>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Source URL:</label>
            <p className="text-primary-600 dark:text-primary-400 break-all">{url}</p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              aria-describedby="summary-description"
            >
              <span id="summary-description" className="sr-only">AI-generated summary of the webpage content</span>
              {summary}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={onReset}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Summarize another website"
        >
          Summarize Another URL
        </button>
        
        <button
          onClick={() => setShowRaw(!showRaw)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Show raw API results"
        >
          {showRaw ? 'Hide' : 'Show'} Raw Results
        </button>
        
        {createdObjects.length > 0 && (
          <button
            onClick={onDeleteObjects}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Delete created API objects"
          >
            Delete Objects ({createdObjects.length})
          </button>
        )}
      </div>

      {/* Raw Results */}
      {showRaw && rawResults && (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Raw API Results</h3>
          <pre className="bg-gray-900 dark:bg-gray-700 text-green-400 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(rawResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SummaryOutput;
