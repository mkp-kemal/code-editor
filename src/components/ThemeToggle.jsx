import React, { useState, useEffect } from 'react';
import { THEMES, DEFAULT_THEME } from '../constants';

const getNextTheme = (currentTheme) => {
    const currentIndex = THEMES.findIndex(t => t.value === currentTheme);
    return THEMES[(currentIndex + 1) % THEMES.length].value;
};

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
    }, [theme, displayedTheme]);

    const handleClick = () => {
        const nextTheme = getNextTheme(theme);
        onThemeChange(nextTheme);
    };

    const currentTheme = THEMES.find(t => t.value === displayedTheme) || DEFAULT_THEME;

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
                className={`w-6 h-6 transition-all duration-300 ease-in-out ${animating ? 'scale-50 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
                    }`}
            />
        </button>
    );
}
