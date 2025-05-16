import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';


const JUDGE0_API = import.meta.env.VITE_API_BASE;

const languages = {
  javascript: { id: 63, label: 'JavaScript', template: `console.log("Hello, world!");` },
  python: { id: 71, label: 'Python', template: `print("Hello, world!")` },
  cpp: { id: 54, label: 'C++', template: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!";\n  return 0;\n}` },
};

const themes = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'hc-black', label: 'High Contrast' }
];

export default function App() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(languages['javascript'].template);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const [stdin, setStdin] = useState('');

  const runCode = async () => {
    setLoading(true);
    setOutput('Running...');

    const encodeBase64 = (str) => btoa(unescape(encodeURIComponent(str)));
    const decodeBase64 = (str) => {
      if (!str) return null;
      try {
        return decodeURIComponent(escape(atob(str)));
      } catch {
        return '(Invalid Base64)';
      }
    };

    try {
      const response = await axios.post(
        `${JUDGE0_API}/submissions?base64_encoded=true&wait=true`,
        {
          language_id: languages[language].id,
          source_code: encodeBase64(code),
          stdin: encodeBase64(stdin),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': import.meta.env.VITE_ACCESS_KEY,
          }
        }
      );

      const result = response.data;
      const outputText = decodeBase64(result.stdout)
        || decodeBase64(result.stderr)
        || decodeBase64(result.compile_output)
        || 'No output.';

      setOutput(outputText);
    } catch (err) {
      console.error(err);
      setOutput('Error running code.');
    }

    setLoading(false);
  };



  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(languages[selectedLang].template);
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

  const getNextTheme = (current) => {
    const index = themes.findIndex(t => t.value === current);
    return themes[(index + 1) % themes.length].value;
  };

  const getThemeIcon = (themeKey) => {
    switch (themeKey) {
      case 'vs-dark':
        return 'https://img.icons8.com/fluency/48/moon-symbol.png'; // Dark
      case 'light':
        return 'https://img.icons8.com/fluency/48/sun.png'; // Light
      case 'hc-black':
        return 'https://img.icons8.com/fluency/contrast'; // HC
      default:
        return '';
    }
  };

  // const getThemeLabel = (themeKey) => {
  //   const t = themes.find(th => th.value === themeKey);
  //   return t ? t.label : '';
  // };

  const [displayedTheme, setDisplayedTheme] = useState(theme);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (theme !== displayedTheme) {
      setAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayedTheme(theme);
        setAnimating(false);
      }, 300); // durasi animasi

      return () => clearTimeout(timeout);
    }
  }, [theme]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#2c3e50'
    }}>
      <header style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0 }}>Sabit Community Code Editor</h1>
      </header>

      {/* Controls Section */}
      <div style={{
        backgroundColor: '#2c3e50',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        // borderBottom: '1px solid #ddd'
      }}>

        <div style={{ display: 'flex', gap: '1rem', padding: '0.5rem', flex: 1, justifyContent: 'space-between' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {Object.entries(languages).map(([key, lang]) => (
                <label key={key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: language === key ? '#34495e' : '#ecf0f1',
                  color: language === key ? 'white' : '#2c3e50',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  border: language === key ? '2px solid #2ecc71' : '1px solid #ccc',
                  transition: 'all 0.2s'
                }}>
                  <input
                    type="radio"
                    name="language"
                    value={key}
                    checked={language === key}
                    onChange={handleLanguageChange}
                    style={{ display: 'none' }}
                  />
                  <img
                    src={getLanguageIcon(key)}
                    alt={lang.label}
                    style={{ width: '20px', height: '20px' }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
            <button
              onClick={() => setTheme(getNextTheme(theme))}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '30px',
                border: '2px solid #ccc',
                backgroundColor: '#ecf0f1',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              <img
                key={displayedTheme}
                src={getThemeIcon(displayedTheme)}
                alt={displayedTheme}
                style={{
                  width: '24px',
                  height: '24px',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: animating ? 'scale(0.5) rotate(180deg)' : 'scale(1) rotate(0deg)',
                  opacity: animating ? 0 : 1
                }}
              />
            </button>
          </div>
        </div>

        {/* Hilangkan textarea stdin */}
        <button
          onClick={runCode}
          disabled={loading}
          style={{
            padding: '8px 20px',
            backgroundColor: loading ? '#95a5a6' : '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s',
            minWidth: '120px'
          }}
        >
          {loading ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Editors + Output */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        gap: '1rem',
        padding: '1rem',
      }}>
        {/* Kode Editor */}
        <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ backgroundColor: '#34495e', color: 'white', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Code<i style={{ color: '#e74c3c' }}>*</i></div>
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={setCode}
            theme={theme}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
            }}
          />
        </div>

        {/* Input Editor */}
        <div style={{ flexBasis: '30%', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#34495e', color: 'white', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Input</div>
          <Editor
            height="100%"
            language="text"
            value={stdin}
            onChange={(value) => setStdin(value || '')}
            theme={theme}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'off',
              readOnly: false,
              folding: false,
            }}
          />

        </div>

        {/* Output */}
        <div style={{
          flexBasis: '35%',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
          color: theme === 'light' ? '#333' : 'white',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            backgroundColor: '#34495e',
            color: 'white',
            padding: '0.5rem 1rem',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
            Output
            <button
              onClick={() => setOutput('')}
              style={{
                padding: '3px 8px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>
          <pre style={{
            whiteSpace: 'pre-wrap',
            margin: 0,
            fontFamily: 'monospace',
            padding: '1rem',
            overflowY: 'auto',
            flex: 1,
          }}>
            {output || 'Output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
