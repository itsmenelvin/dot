// src/components/EmailInputSection.jsx
import React, { useState, useEffect } from 'react';

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

    if (emailCount > 536870912) {
      setError('The number of variations exceeds the limit of 536870912. Please reduce the length of the prefix.');
      return;
    }

    setError('');
    onGenerate({ prefix, provider: 'gmail.com', total: emailCount });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="mb-4">
        <label htmlFor="email-prefix" className="block text-sm font-medium text-gray-700 dark:text-gray-300 visually-hidden">
          Email Prefix
        </label>
        <div className="flex">
          <input
            id="email-prefix"
            type="text"
            placeholder="Enter email prefix"
            value={prefix}
            onChange={handlePrefixChange}
            className={`flex-1 px-4 py-2 border ${
              !isPrefixValid && prefix.length >= 6 ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200`}
            aria-label="Email prefix"
            maxLength={30} // Enforce max length
          />
          <span className="inline-flex items-center px-3 bg-gray-200 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-md text-gray-700 dark:text-gray-300">
            @gmail.com
          </span>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">Email Count: {emailCount.toLocaleString()}</span>
        <button
          onClick={handleGenerate}
          disabled={!isPrefixValid || emailCount === 0}
          className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
            isPrefixValid && emailCount !== 0
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              : 'bg-indigo-300 cursor-not-allowed'
          } transition-colors duration-300`}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default EmailInputSection;
