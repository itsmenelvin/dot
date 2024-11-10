// src/components/EmailInputSection/EmailInputSection.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EmailInputSection.css';
import { validatePrefix, calculateEmailCount } from '../../utils/emailUtils';

const EmailInputSection = ({ onGenerate }) => {
  const [prefix, setPrefix] = useState('');
  const [provider, setProvider] = useState('gmail.com');
  const [error, setError] = useState('');

  const handlePrefixChange = (e) => {
    const value = e.target.value;
    setPrefix(value);
    if (!validatePrefix(value)) {
      setError('Prefix must be 6-30 characters long and contain only letters, numbers, and periods.');
    } else {
      setError('');
    }
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
  };

  const handleGenerate = () => {
    if (!validatePrefix(prefix)) {
      setError('Prefix must be 6-30 characters long and contain only letters, numbers, and periods.');
      return;
    }
    const total = calculateEmailCount(prefix);
    onGenerate({ prefix, provider, total });
  };

  return (
    <div className="email-input-section">
      <div className="input-group">
        <div className="input-wrapper">
          <label htmlFor="email-prefix" className="visually-hidden">Email Prefix</label>
          <input
            type="text"
            id="email-prefix"
            value={prefix}
            onChange={handlePrefixChange}
            className={`email-input ${error ? 'invalid' : ''}`}
            placeholder="Enter email prefix"
            aria-invalid={!!error}
            aria-describedby="error-message"
          />
          <span className="email-suffix">@{provider}</span>
        </div>
        <button
          onClick={handleGenerate}
          className="generate-button"
          disabled={!!error || !prefix}
          aria-disabled={!!error || !prefix}
        >
          Generate
        </button>
      </div>
      {error && <div id="error-message" className="error-message">{error}</div>}
      {prefix && !error && (
        <div className="email-count">
          {calculateEmailCount(prefix).toLocaleString()} email variations will be generated.
        </div>
      )}
    </div>
  );
};

EmailInputSection.propTypes = {
  onGenerate: PropTypes.func.isRequired,
};

export default EmailInputSection;
