import React from 'react';
import Editor from '@monaco-editor/react';

export default function InputEditor({ 
  stdin, 
  setStdin, 
  theme 
}) {
  return (
    <div className="basis-[30%] rounded-lg overflow-hidden shadow-md flex flex-col">
      <div className="bg-[#34495e] text-white px-4 py-2 font-bold">
        Input
      </div>
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
  );
}