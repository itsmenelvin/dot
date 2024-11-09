// src/components/workers/emailGenerator.worker.js
/* eslint-disable no-restricted-globals */
self.onmessage = function (e) {
  const { prefix, provider } = e.data;
  const length = prefix.length;
  const totalVariations = Math.pow(2, length - 1);
  let generated = 0;

  const generateEmails = () => {
    for (let i = 0; i < totalVariations; i++) {
      let email = prefix[0];
      for (let j = 1; j < length; j++) {
        if ((i & (1 << (j - 1))) !== 0) {
          email += '.';
        }
        email += prefix[j];
      }
      const emailWithProvider = `${email}@${provider}\n`;
      self.postMessage({ type: 'chunk', chunk: emailWithProvider });
      generated++;

      // Send progress updates every 100,000 emails
      if (generated % 100000 === 0) {
        self.postMessage({ type: 'progress', progress: ((generated / totalVariations) * 100).toFixed(2) });
      }
    }
    self.postMessage({ type: 'complete' });
  };

  generateEmails();
};
