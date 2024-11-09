// src/components/Header.jsx
import React, { useContext } from 'react';
import './Header.css';
import { ThemeContext } from './context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1>Dot Trick Generator</h1>
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header;
