import React, { useState } from 'react';
import Header from './components/common/Header/Header';
import Hero from './components/common/Hero/Hero';
import EmailInputSection from './components/EmailInputSection/EmailInputSection';
import Features from './components/common/Features/Features';
import PaginatedResults from './components/PaginatedResults/PaginatedResults';
import Footer from './components/common/Footer/Footer';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';

const App = () => {
  const [generationData, setGenerationData] = useState(null);

  const handleGenerate = ({ prefix, provider, total }) => {
    setGenerationData({ prefix, provider, total });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Hero />
          <EmailInputSection onGenerate={handleGenerate} />
          <Features />
          {generationData && (
            <PaginatedResults
              prefix={generationData.prefix}
              provider={generationData.provider}
              total={generationData.total}
            />
          )}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
