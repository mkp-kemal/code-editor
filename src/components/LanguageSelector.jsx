import React from 'react';

const languages = {
    javascript: { id: 63, label: 'JavaScript', template: `console.log("Hello, world!");` },
    python: { id: 71, label: 'Python', template: `print("Hello, world!")` },
    cpp: { id: 54, label: 'C++', template: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!";\n  return 0;\n}` },
};

const getLanguageIcon = (langKey) => {
    switch (langKey) {
        case 'javascript':
            return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
        case 'python':
            return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
        case 'cpp':
            return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg';
        default:
            return '';
    }
};

export default function LanguageSelector({ language, onLanguageChange }) {
    const handleLanguageChange = (e) => {
        const selectedLang = e.target.value;
        onLanguageChange({
            language: selectedLang,
            code: languages[selectedLang].template
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-wrap">
                {Object.entries(languages).map(([key, lang]) => (
                    <label
                        key={key}
                        className={`
          flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer
          transition-all duration-200
          ${language === key ?
                                'bg-[#34495e] text-white border-2 border-[#2ecc71]' :
                                'bg-[#ecf0f1] text-[#2c3e50] border border-gray-300'}
        `}
                    >
                        <input
                            type="radio"
                            name="language"
                            value={key}
                            checked={language === key}
                            onChange={handleLanguageChange}
                            className="hidden"
                        />
                        <img
                            src={getLanguageIcon(key)}
                            alt={lang.label}
                            className="w-5 h-5"
                        />
                        {/* Uncomment if you want to show the language label */}
                        {/* <span>{lang.label}</span> */}
                    </label>
                ))}
            </div>
        </div>
    );
}