// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import EmailInputSection from './components/EmailInputSection';
import PaginatedResults from './components/PaginatedResults';
import ExportButton from './components/ExportButton';
import CopyButton from './components/CopyButton'; 
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const App = () => {
  const [generatedEmails, setGeneratedEmails] = useState([]);

  return (
    <ErrorBoundary>
      <div className="app">
        <Header />
        <Introduction />
        <EmailInputSection onGenerate={setGeneratedEmails} />
        <PaginatedResults emails={generatedEmails} />
        <div className="action-buttons">
          <ExportButton emails={generatedEmails} />
          <CopyButton emails={generatedEmails} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;