import React, { useState } from 'react';

const URLInput = ({ onSubmit, disabled, error, active }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 ${
      active ? 'ring-2 ring-primary-500' : ''
    }`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Enter Website URL
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Paste the URL of the website you'd like to summarize
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url-input" className="sr-only">Website URL</label>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={disabled}
            aria-describedby={error ? "url-error" : undefined}
            required
          />
        </div>

        {error && (
          <div id="url-error" className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={disabled || !url.trim()}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label="Summarize website content"
        >
          {disabled ? 'Processing...' : 'Summarize Website'}
        </button>
      </form>
    </div>
  );
};

export default URLInput;
