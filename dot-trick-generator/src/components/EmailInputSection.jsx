// src/components/EmailInputSection.jsx
import React, { useState, useEffect } from 'react';
import './EmailInputSection.css';
import StreamSaver from 'streamsaver'; // Import StreamSaver
import { WritableStream } from 'web-streams-polyfill/ponyfill'; // Polyfill for broader browser support

const EmailInputSection = ({ onGenerate }) => {
  const [prefix, setPrefix] = useState('');
  const [provider, setProvider] = useState('gmail.com');
  const [emailCount, setEmailCount] = useState(1);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state

  // Calculate the number of possible variations based on possible dot insertions
  const calculateEmailCount = (input) => {
    const length = input.length;
    if (length === 0) return 0;
    return Math.pow(2, length - 1);
  };

  useEffect(() => {
    const count = calculateEmailCount(prefix);
    setEmailCount(count);
  }, [prefix]);

  // Validate email prefix
  const isValidPrefix = (str) => {
    const regex = /^[a-zA-Z0-9._+-]+$/;
    return regex.test(str);
  };

  const handleGenerate = async () => {
    if (!isValidPrefix(prefix)) {
      setError('Invalid email prefix. Only letters, numbers, dots, underscores, pluses, and hyphens are allowed.');
      return;
    }

    if (emailCount > 30000000) {
      setError('The number of variations exceeds the limit of 30,000,000. Please reduce the length of the prefix.');
      return;
    }

    setError('');
    setIsGenerating(true);
    setProgress(0);

    try {
      // Initialize the writable stream
      const fileStream = StreamSaver.createWriteStream('email_variations.csv');
      const writer = fileStream.getWriter();
      const encoder = new TextEncoder();

      // Write the header
      await writer.write(encoder.encode('Email\n'));

      // Total variations for progress calculation
      const totalVariations = emailCount;
      let generated = 0;

      // Generator function to create email variations
      const generateVariations = function* (str, provider) {
        const length = str.length;
        const total = Math.pow(2, length - 1);
        for (let i = 0; i < total; i++) {
            let email = str[0];
            for (let j = 1; j < length; j++) {
                if ((i & (1 << (j - 1))) !== 0) {
                    email += '.';
                }
                email += str[j];
            }
            yield `${email}@${provider}`;
        }
      };
    

      const generator = generateVariations(prefix, provider);

      for (const email of generator) {
        const chunk = `${email}\n`;
        await writer.write(encoder.encode(chunk));
        generated++;

        // Update progress every 100,000 emails
        if (generated % 100000 === 0) {
          setProgress(((generated / totalVariations) * 100).toFixed(2));
          // Yield control to keep UI responsive
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      // Final progress update
      setProgress(100);
      await writer.close();
      setIsGenerating(false);
      alert('Email variations have been generated and downloaded successfully!');
    } catch (err) {
      console.error('Error generating emails:', err);
      setError('An error occurred while generating emails.');
      setIsGenerating(false);
    }
  };

  // Generate all possible variations by inserting dots between characters
  const generateVariations = (str) => {
    const variations = [];

    const helper = (current, index) => {
      if (index === str.length) {
        variations.push(current);
        return;
      }

      // Always include the current character without a dot
      helper(current + str[index], index + 1);

      // If not the last character, include the current character followed by a dot
      if (index < str.length - 1) {
        helper(current + str[index] + '.', index + 1);
      }
    };

    helper('', 0);
    return variations;
  };

  return (
    <div className="email-input-section">
      <div className="input-group">
        <div className="input-wrapper">
          <label htmlFor="email-prefix" className="visually-hidden">Email Prefix</label>
          <input
            id="email-prefix"
            type="text"
            placeholder="Enter email prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="email-input"
            aria-label="Email prefix"
            maxLength={50} // Limit input length to prevent excessive variations
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email-provider" className="visually-hidden">Email Provider</label>
          <select
            id="email-provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="provider-select"
            aria-label="Email provider"
          >
            <option value="gmail.com">gmail.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="hotmail.com">hotmail.com</option>
            <option value="icloud.com">icloud.com</option>
            {/* Add more providers as needed */}
          </select>
        </div>
      </div>
      <div className="email-count">Email Count: {emailCount}</div>
      {error && <div className="error-message">{error}</div>}
      {isGenerating && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress}%</span>
        </div>
      )}
      <button onClick={handleGenerate} className="generate-button" disabled={isGenerating}>
        {isGenerating ? `Generating... (${progress}%)` : 'Generate'}
      </button>
    </div>
  );
};

export default EmailInputSection;
