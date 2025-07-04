import React, { useState } from 'react';

const DebugPanel = ({ apiCalls }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (apiCalls.length === 0) return null;

  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isExpanded}
        aria-controls="debug-content"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            API Debug Log ({apiCalls.length} calls)
          </h3>
          <svg 
            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div id="debug-content" className="p-6 space-y-4">
          {apiCalls.map((call) => (
            <div key={call.id} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {call.method} {call.endpoint}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(call.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              {call.data && (
                <div className="mb-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Request:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(call.data, null, 2)}
                  </pre>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Response:</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(call.response, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
