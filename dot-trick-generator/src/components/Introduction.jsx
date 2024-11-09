// src/components/Introduction.jsx
import React from 'react';

const Introduction = () => (
  <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Generate Gmail Email Variations</h2>
    <p className="text-gray-600 dark:text-gray-300">
      Easily create multiple Gmail email variations by inserting or removing dots in your email prefix. Ensure your prefix is between <strong>6 to 30 characters</strong> long and contains only <strong>letters, numbers, and periods</strong>.
    </p>
  </section>
);

export default Introduction;
