import React, { useState, useEffect } from 'react';

const themes = [
  { value: 'vs-dark', label: 'Dark', icon: 'https://img.icons8.com/fluency/48/moon-symbol.png' },
  { value: 'light', label: 'Light', icon: 'https://img.icons8.com/fluency/48/sun.png' },
  { value: 'hc-black', label: 'High Contrast', icon: 'https://img.icons8.com/fluency/48/contrast.png' }
];

export default function ThemeToggle({ theme, onThemeChange }) {
  const [displayedTheme, setDisplayedTheme] = useState(theme);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (theme !== displayedTheme) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedTheme(theme);
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [theme]);

  const getNextTheme = () => {
    const currentIndex = themes.findIndex(t => t.value === theme);
    return themes[(currentIndex + 1) % themes.length].value;
  };

  const handleClick = () => {
    onThemeChange(getNextTheme());
  };

  const currentTheme = themes.find(t => t.value === displayedTheme) || themes[0];

  return (
    <button
      onClick={handleClick}
      className="flex items-center p-2 rounded-full border-2 border-gray-300 bg-gray-100 cursor-pointer transition-all duration-300 shadow-md hover:bg-gray-200"
      aria-label="Toggle theme"
    >
      <img
        key={displayedTheme}
        src={currentTheme.icon}
        alt={currentTheme.label}
        className={`w-6 h-6 transition-all duration-300 ease-in-out ${
          animating ? 'scale-50 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
    </button>
  );
}