import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import LoadFileButton from './components/LoadFileButton';
import './App.css';
import LanguageSelector from './components/LanguageSelector';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import SaveButton from './components/SaveButton';
import RunButton from './components/RunButton';
import CodeEditor from './components/CodeEditor';
import InputEditor from './components/InputEditor';
import OutputEditor from './components/OutputEditor';


const JUDGE0_API = import.meta.env.VITE_API_BASE;

const languages = {
  javascript: { id: 63, label: 'JavaScript', template: `console.log("Hello, world!");` },
  python: { id: 71, label: 'Python', template: `print("Hello, world!")` },
  cpp: { id: 54, label: 'C++', template: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, world!";\n  return 0;\n}` },
};

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

  const downloadFile = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fileExtension = language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : 'js';
    a.href = url;
    a.download = `my-code.${fileExtension}`;
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="h-screen w-screen flex flex-col bg-[#2c3e50]">
      <Header />

      {/* Controls Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#2c3e50] p-3.5">
        <div className="flex flex-1 justify-between gap-4 p-2">
          <div className="flex flex-col gap-2">
            <LanguageSelector
              language={language}
              onLanguageChange={({ language, code }) => {
                setLanguage(language);
                setCode(code);
              }}
            />
          </div>

          <ThemeToggle
            theme={theme}
            onThemeChange={setTheme}
          />
        </div>

        <RunButton
          loading={loading}
          onClick={runCode}
        />

        <SaveButton
          loading={loading}
          onClick={downloadFile}
        />

        <LoadFileButton
          onLoad={({ code, language }) => {
            setLanguage(language);
            setCode(code);
          }}
        />
      </div>


      {/* Editors + Output */}
      <div className="flex flex-1 overflow-hidden gap-4 p-4">
        <CodeEditor
          language={language}
          code={code}
          setCode={setCode}
          theme={theme}
        />

        <InputEditor
          stdin={stdin}
          setStdin={setStdin}
          theme={theme}
        />

        <OutputEditor
          output={output}
          setOutput={setOutput}
          theme={theme}
        />
      </div>

    </div>
  );
}
