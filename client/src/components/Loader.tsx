// src/components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin h-16 w-16 border-4 border-t-4 border-blue-500 rounded-full"></div>
  </div>
);

export default Loader;
