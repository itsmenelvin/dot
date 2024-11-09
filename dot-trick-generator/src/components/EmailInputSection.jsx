// src/components/EmailInputSection.jsx
import React, { useState, useEffect } from 'react';
import './EmailInputSection.css';

const EmailInputSection = ({ onGenerate }) => {
  const [prefix, setPrefix] = useState('');
  const [emailCount, setEmailCount] = useState(0);
  const [error, setError] = useState('');
  const [isPrefixValid, setIsPrefixValid] = useState(false);

  // Calculate the number of possible variations based on possible dot insertions
  const calculateEmailCount = (input) => {
    const length = input.length;
    if (length < 6 || length > 30) return 0; // Enforce Gmail length constraints
    return Math.pow(2, length - 1);
  };

  useEffect(() => {
    const count = calculateEmailCount(prefix);
    setEmailCount(count);
  }, [prefix]);

  // Validate email prefix
  const validatePrefix = (str) => {
    const regex = /^[a-zA-Z0-9.]{6,30}$/; // Letters, numbers, periods, 6-30 chars
    return regex.test(str);
  };

  const handlePrefixChange = (e) => {
    const value = e.target.value;
    // Optionally, prevent invalid characters from being entered
    // const sanitizedValue = value.replace(/[^a-zA-Z0-9.]/g, '');
    // setPrefix(sanitizedValue);

    setPrefix(value);
    const isValid = validatePrefix(value);
    setIsPrefixValid(isValid);
    if (!isValid && value.length >= 6) {
      setError('Only letters, numbers, and periods are allowed. Length: 6-30 characters.');
    } else {
      setError('');
    }
  };

  const handleGenerate = () => {
    if (!isPrefixValid) {
      setError('Please correct the errors before generating.');
      return;
    }

    if (emailCount > 30000000) {
      setError('The number of variations exceeds the limit of 30,000,000. Please reduce the length of the prefix.');
      return;
    }

    setError('');
    onGenerate({ prefix, provider: 'gmail.com', total: emailCount });
  };

  return (
    <div className="email-input-section">
      <div className="input-group">
        <div className="input-wrapper">
          <label htmlFor="email-prefix" className="visually-hidden">Email Prefix</label>
          <div className="prefix-input-container">
            <input
              id="email-prefix"
              type="text"
              placeholder="Enter email prefix"
              value={prefix}
              onChange={handlePrefixChange}
              className={`email-input ${!isPrefixValid && prefix.length >= 6 ? 'invalid' : ''}`}
              aria-label="Email prefix"
              maxLength={30} // Enforce max length
            />
            <span className="email-suffix">@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="email-count">Email Count: {emailCount.toLocaleString()}</div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleGenerate} className="generate-button" disabled={!isPrefixValid || emailCount === 0}>
        Generate
      </button>
    </div>
  );
};

export default EmailInputSection;
