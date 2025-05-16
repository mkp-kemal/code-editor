import React from 'react';

export default function OutputEditor({ 
  output, 
  setOutput, 
  theme 
}) {
  const outputStyles = {
    light: 'bg-gray-50 text-gray-800',
    dark: 'bg-[#1e1e1e] text-white',
  };

  return (
    <div className={`basis-[35%] rounded-lg shadow-md flex flex-col ${
      theme === 'light' ? outputStyles.light : outputStyles.dark
    }`}>
      <div className="bg-[#34495e] text-white px-4 py-2 font-bold flex justify-between items-center rounded-t-lg">
        <span>Output</span>
        <button
          onClick={() => setOutput('')}
          className="px-2 py-1 bg-transparent text-white border border-white rounded text-sm hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Clear output"
        >
          Clear
        </button>
      </div>
      <pre className="whitespace-pre-wrap m-0 font-mono p-4 overflow-y-auto flex-1">
        {output || 'Output will appear here...'}
      </pre>
    </div>
  );
}