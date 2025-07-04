import React, { useState } from 'react';
import URLInput from './components/URLInput';
import ProcessingStep from './components/ProcessingStep';
import SummaryOutput from './components/SummaryOutput';
import DarkModeToggle from './components/DarkModeToggle';
import DebugPanel from './components/DebugPanel';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [apiCalls, setApiCalls] = useState([]);
  const [createdObjects, setCreatedObjects] = useState([]);
  const [rawResults, setRawResults] = useState(null);

  const API_BASE = 'https://builder.impromptu-labs.com/api_tools';
  const API_HEADERS = {
    'Authorization': 'Bearer 3bp8ayqplm4mcmf54ae',
    'Content-Type': 'application/json'
  };

  const logApiCall = (method, endpoint, data, response) => {
    const call = {
      timestamp: new Date().toISOString(),
      method,
      endpoint,
      data,
      response,
      id: Date.now()
    };
    setApiCalls(prev => [...prev, call]);
  };

  const handleUrlSubmit = async (inputUrl) => {
    if (!inputUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setUrl(inputUrl);
    setCurrentStep(2);
    setLoading(true);
    setError('');
    setSummary('');
    setApiCalls([]);
    setCreatedObjects([]);

    try {
      // Step 1: Ingest the URL content
      const ingestData = {
        created_object_name: 'webpage_content',
        data_type: 'urls',
        input_data: [inputUrl]
      };

      const ingestResponse = await fetch(`${API_BASE}/input_data`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(ingestData)
      });

      const ingestResult = await ingestResponse.json();
      logApiCall('POST', '/input_data', ingestData, ingestResult);

      if (!ingestResponse.ok) {
        throw new Error(ingestResult.detail || 'Failed to fetch webpage content');
      }

      setCreatedObjects(prev => [...prev, 'webpage_content']);

      // Step 2: Generate summary
      const summaryData = {
        created_object_names: ['webpage_summary'],
        prompt_string: 'Provide a brief 2-3 sentence summary of the main content and key points from this webpage: {webpage_content}',
        inputs: [{
          input_object_name: 'webpage_content',
          mode: 'combine_events'
        }]
      };

      const summaryResponse = await fetch(`${API_BASE}/apply_prompt`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(summaryData)
      });

      const summaryResult = await summaryResponse.json();
      logApiCall('POST', '/apply_prompt', summaryData, summaryResult);

      if (!summaryResponse.ok) {
        throw new Error(summaryResult.detail || 'Failed to generate summary');
      }

      setCreatedObjects(prev => [...prev, 'webpage_summary']);

      // Step 3: Retrieve the summary
      const resultResponse = await fetch(`${API_BASE}/return_data/webpage_summary`, {
        method: 'GET',
        headers: API_HEADERS
      });

      const resultData = await resultResponse.json();
      logApiCall('GET', '/return_data/webpage_summary', null, resultData);

      if (!resultResponse.ok) {
        throw new Error(resultData.detail || 'Failed to retrieve summary');
      }

      setSummary(resultData.text_value);
      setRawResults(resultData);
      setCurrentStep(3);

    } catch (err) {
      setError(err.message || 'An error occurred while processing the URL');
      setCurrentStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setUrl('');
    setSummary('');
    setError('');
    setLoading(false);
    setRawResults(null);
  };

  const deleteObjects = async () => {
    for (const objectName of createdObjects) {
      try {
        const response = await fetch(`${API_BASE}/objects/${objectName}`, {
          method: 'DELETE',
          headers: API_HEADERS
        });
        const result = await response.json();
        logApiCall('DELETE', `/objects/${objectName}`, null, result);
      } catch (err) {
        console.error(`Failed to delete ${objectName}:`, err);
      }
    }
    setCreatedObjects([]);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Website Summarizer
            </h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      currentStep >= step ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1: URL Input */}
              <div className={`${currentStep === 1 ? 'lg:col-span-3' : ''}`}>
                <URLInput 
                  onSubmit={handleUrlSubmit}
                  disabled={loading}
                  error={error}
                  active={currentStep === 1}
                />
              </div>

              {/* Step 2: Processing */}
              {currentStep === 2 && (
                <div className="lg:col-span-3">
                  <ProcessingStep 
                    url={url}
                    onCancel={handleReset}
                  />
                </div>
              )}

              {/* Step 3: Summary Output */}
              {currentStep === 3 && (
                <div className="lg:col-span-3">
                  <SummaryOutput 
                    summary={summary}
                    url={url}
                    onReset={handleReset}
                    rawResults={rawResults}
                    onDeleteObjects={deleteObjects}
                    createdObjects={createdObjects}
                  />
                </div>
              )}
            </div>

            {/* Debug Panel */}
            <DebugPanel apiCalls={apiCalls} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
