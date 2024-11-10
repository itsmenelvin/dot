// src/components/common/Footer/Footer.jsx
import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 py-6 mt-auto">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-600 dark:text-gray-300">&copy; 2024 Dot Trick Generator. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="https://github.com/itsmenelvin" aria-label="GitHub" className="text-gray-600 dark:text-gray-300 hover:text-primary-color transition-colors">
          <FaGithub size={24} />
        </a>
        <a href="https://x.com/0x9d38" aria-label="Twitter" className="text-gray-600 dark:text-gray-300 hover:text-primary-color transition-colors">
          <FaTwitter size={24} />
        </a>
        <a href="#" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-300 hover:text-primary-color transition-colors">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
