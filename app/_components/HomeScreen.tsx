"use client"

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const HomeScreen = () => {
  const [numContainers, setNumContainers] = useState(0);
  const [containerInputs, setContainerInputs] = useState([]);

  const handleGenerateInputs = () => {
    if (numContainers > 0) {
      const inputs = Array.from({ length: numContainers }, () => '');
      setContainerInputs(inputs);
      setNumContainers(0);
    } else {
      alert("Please enter a positive number.");
    }
  };

  const handleResetInputs = () => {
    setContainerInputs([]);
    setNumContainers(0);
  };

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setNumContainers(value);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Container Input Generator</h1>

      <Input 
        type='number' 
        placeholder='Enter the number of containers you have...' 
        value={numContainers}
        onChange={handleInputChange}
        className="mb-4 w-1/2 sm:w-1/3 md:w-1/4 h-10"
        min={1}
      />

      <button
        onClick={handleGenerateInputs}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mb-6"
      >
        Generate Inputs
      </button>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {containerInputs.map((_, index) => (
          <Textarea
            key={index}
            placeholder={`Container ${index + 1} input`}
            className="w-full h-32"
          />
        ))}
      </div>

      {containerInputs.length > 0 && (
        <button
          onClick={handleResetInputs}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Reset Inputs
        </button>
      )}
    </div>
  );
};

export default HomeScreen;
