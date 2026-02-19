
import React, { useState } from 'react';

interface ReflectionInputProps {
  placeholder: string;
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const ReflectionInput: React.FC<ReflectionInputProps> = ({ placeholder, onSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group mt-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-stone-200 py-3 px-8 text-center serif-body text-xl text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-500 transition-colors disabled:opacity-50"
      />
      <button 
        type="submit"
        disabled={isLoading || !value.trim()}
        className={`absolute right-0 top-3 transition-colors ${
          isLoading ? 'text-stone-200' : 'text-stone-300 hover:text-stone-600'
        }`}
      >
        {isLoading ? (
           <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        )}
      </button>
    </form>
  );
};
