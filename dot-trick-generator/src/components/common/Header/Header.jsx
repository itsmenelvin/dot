// src/components/common/Header/Header.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-primary-color text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl">Dot Trick Generator</h1>
        <button
          onClick={toggleTheme}
          className="bg-primary-color hover:bg-button-hover-primary text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
