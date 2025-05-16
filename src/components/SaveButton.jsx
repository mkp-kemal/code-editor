import React from 'react';

export default function SaveButton({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        px-5 py-2 text-white font-bold rounded
        transition-colors duration-200 min-w-[120px]
        ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
      `}
      aria-label={loading ? 'Saving...' : 'Save file'}
    >
      {loading ? 'Saving...' : 'Save'}
    </button>
  );
}