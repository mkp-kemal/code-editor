import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ 
  language, 
  code, 
  setCode, 
  theme 
}) {
  return (
    <div className="flex-1 rounded-lg overflow-hidden shadow-md">
      <div className="bg-[#34495e] text-white px-4 py-2 font-bold">
        Code<i className="text-[#e74c3c]">*</i>
      </div>
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
  );
}