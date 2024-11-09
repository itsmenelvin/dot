// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import EmailInputSection from './components/EmailInputSection';
import PaginatedResults from './components/PaginatedResults';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => {
  const [generationData, setGenerationData] = useState(null);

  const handleGenerate = ({ prefix, provider, total }) => {
    setGenerationData({ prefix, provider, total });
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Header />
        <Introduction />
        <EmailInputSection onGenerate={handleGenerate} />
        {generationData && (
          <PaginatedResults
            prefix={generationData.prefix}
            provider={generationData.provider}
            total={generationData.total}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
