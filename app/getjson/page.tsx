"use client"

import React from 'react';

export default function GetJsonButton() {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/getjson');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received JSON:', data);
    } catch (error) {
      console.error('Error fetching JSON:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Fetch JSON
    </button>
  );
}