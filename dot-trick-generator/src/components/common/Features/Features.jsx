// src/components/common/Features/Features.jsx
import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaSyncAlt } from 'react-icons/fa';

const Features = () => (
  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="flex items-start">
      <FaCheckCircle className="text-secondary-color text-3xl mr-4" />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Multiple Accounts with One Email</h3>
        <p className="text-gray-600 dark:text-gray-300">Perfect for those who need multiple logins but prefer to use a single Gmail address.</p>
      </div>
    </div>
    <div className="flex items-start">
      <FaShieldAlt className="text-secondary-color text-3xl mr-4" />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Efficient Generation</h3>
        <p className="text-gray-600 dark:text-gray-300">Quickly create thousands of email variations tailored to your needs.</p>
      </div>
    </div>
    <div className="flex items-start">
      <FaSyncAlt className="text-secondary-color text-3xl mr-4" />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Secure Processing</h3>
        <p className="text-gray-600 dark:text-gray-300">Your data is processed securely, with no storage of sensitive information.</p>
      </div>
    </div>
  </section>
);

export default Features;
