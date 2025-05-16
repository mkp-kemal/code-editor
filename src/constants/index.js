export const THEMES = [
  { 
    value: 'vs-dark', 
    label: 'Dark', 
    icon: 'https://img.icons8.com/fluency/48/moon-symbol.png',
    className: 'bg-[#1e1e1e] text-white' 
  },
  { 
    value: 'light', 
    label: 'Light', 
    icon: 'https://img.icons8.com/fluency/48/sun.png',
    className: 'bg-gray-50 text-gray-800'
  },
  { 
    value: 'hc-black', 
    label: 'High Contrast', 
    icon: 'https://img.icons8.com/fluency/48/contrast.png',
    className: 'bg-black text-white'
  }
];

export const LANGUAGES = {
  javascript: { 
    id: 63, 
    label: 'JavaScript', 
    template: `console.log("Hello, world!");`,
    extension: 'js'
  },
  python: { 
    id: 71, 
    label: 'Python', 
    template: `print("Hello, world!")`,
    extension: 'py'
  },
  cpp: { 
    id: 54, 
    label: 'C++', 
    template: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!";\n  return 0;\n}`,
    extension: 'cpp'
  }
};

export const DEFAULT_THEME = 'vs-dark';
export const DEFAULT_LANGUAGE = 'javascript';