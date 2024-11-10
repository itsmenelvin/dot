import React, { useState } from 'react';
import Header from './components/common/Header/Header';
import Introduction from './components/common/Introduction/Introduction';
import EmailInputSection from './components/EmailInputSection/EmailInputSection';
import PaginatedResults from './components/PaginatedResults/PaginatedResults';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

const App = () => {
  const [generationData, setGenerationData] = useState(null);

  const handleGenerate = ({ prefix, provider, total }) => {
    setGenerationData({ prefix, provider, total });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Introduction />
          <EmailInputSection onGenerate={handleGenerate} />
          {generationData && (
            <PaginatedResults
              prefix={generationData.prefix}
              provider={generationData.provider}
              total={generationData.total}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
