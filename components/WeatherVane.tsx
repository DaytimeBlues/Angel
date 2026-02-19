
import React from 'react';
import { WeatherType } from '../types';
import { WEATHER_DATA } from '../constants';

interface WeatherVaneProps {
  currentWeather: WeatherType;
  onWeatherChange: (weather: WeatherType) => void;
}

export const WeatherVane: React.FC<WeatherVaneProps> = ({ currentWeather, onWeatherChange }) => {
  return (
    <div className="w-full max-w-lg mb-12 text-center relative z-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-8 font-medium">
        State of the Field
      </p>
      
      <div className="flex justify-center items-center gap-6 sm:gap-12 h-24">
        {(Object.keys(WEATHER_DATA) as WeatherType[]).map((type) => {
          const isActive = currentWeather === type;
          const data = WEATHER_DATA[type];
          
          return (
            <button
              key={type}
              onClick={() => onWeatherChange(type)}
              className={`relative flex flex-col items-center gap-2 transition-all duration-500 ${
                isActive ? 'scale-125 opacity-100' : 'scale-100 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
              }`}
            >
              <span className={`transition-all duration-500 ${isActive ? 'text-5xl drop-shadow-lg' : 'text-4xl'}`}>
                {data.emoji}
              </span>
              {isActive && (
                <span className="absolute -bottom-10 w-24 text-[10px] font-serif italic text-stone-600 animate-fade-up">
                  {data.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
