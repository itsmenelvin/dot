// src/components/common/Hero/Hero.jsx
import React from 'react';

const Hero = () => (
  <section className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-lg shadow-card p-4 mb-4">
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Simplify Your Gmail Email Management</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify">
      Generate multiple email variations by adding dots within your email prefix. This tool helps you use one Gmail address for multiple accounts while staying organized!
      </p>
    </div>
  </section>
);

export default Hero;
