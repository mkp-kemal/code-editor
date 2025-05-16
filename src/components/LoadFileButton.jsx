import React from 'react';

export default function LoadFileButton({ onLoad }) {
  const handleFileChange = (event) => {
    console.log(event);
    
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      
      // Determine language from file extension
      let language = 'javascript';
      const extension = file.name.split('.').pop().toLowerCase();
      
      if (extension === 'py') {
        language = 'python';
      } else if (extension === 'cpp' || extension === 'c++' || extension === 'cc') {
        language = 'cpp';
      } else if (extension === 'js' || extension === 'javascript') {
        language = 'javascript';
      }
      
      // Call the parent callback with the loaded content and detected language
      onLoad({ code: content, language });
    };
    
    reader.readAsText(file);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="file"
        id="file-upload"
        accept=".js,.py,.cpp,.c++,.cc,.javascript"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label
        htmlFor="file-upload"
        style={{
          padding: '8px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s',
          minWidth: '120px',
          display: 'inline-block',
          textAlign: 'center'
        }}
      >
        Load File
      </label>
    </div>
  );
}