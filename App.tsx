
import React, { useState, useCallback } from 'react';
import { WeatherType, ReflectionResponse } from './types';
import { WEATHER_DATA } from './constants';
import { WeatherVane } from './components/WeatherVane';
import { ReflectionInput } from './components/ReflectionInput';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherType>(WeatherType.HAZY);
  const [reflection, setReflection] = useState<ReflectionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentKey, setContentKey] = useState(0);

  const activeData = WEATHER_DATA[weather];

  const handleWeatherChange = useCallback((newWeather: WeatherType) => {
    setWeather(newWeather);
    setReflection(null);
    setError(null);
    setContentKey(prev => prev + 1);
  }, []);

  const handleReflectionSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await geminiService.getWisdom(weather, text);
      setReflection(response);
    } catch (err: any) {
      console.error(err);
      setError("The field is busy right now. Please wait for the wind to settle.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000">
      <WeatherVane currentWeather={weather} onWeatherChange={handleWeatherChange} />

      <div 
        key={contentKey}
        className="w-full max-w-md bg-white/60 backdrop-blur-md border border-stone-200 p-10 rounded-sm shadow-2xl shadow-stone-200/50 soil-texture animate-fade-up relative overflow-hidden transition-all duration-500"
      >
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-stone-300"></div>

        <div className="mb-10 text-center">
          <p className="serif-body text-xl leading-relaxed text-stone-800 italic">
            {activeData.quote}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-6">— {activeData.source}</p>
        </div>

        <div className="space-y-8">
          {!reflection ? (
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-center">
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-3">
                  {isLoading ? "Consulting the silence..." : activeData.prompt}
                </label>
                <p className="serif-body text-stone-700 text-lg mb-6">
                  {activeData.question}
                </p>
              </div>

              <ReflectionInput 
                placeholder={activeData.placeholder} 
                onSubmit={handleReflectionSubmit} 
                isLoading={isLoading}
              />
              
              {error && (
                <div className="mt-6 text-center animate-fade-up">
                  <p className="text-[11px] text-red-800 font-medium tracking-wide">
                    {error}
                  </p>
                </div>
              )}

              <div className="text-center mt-10">
                <p className="text-[10px] uppercase tracking-tighter text-stone-400 italic">
                  {activeData.secondary}
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up text-center space-y-6">
              <div className="pt-4 border-t border-stone-100">
                <p className="serif-body text-lg text-stone-800 italic leading-relaxed">
                  "{reflection.wisdom}"
                </p>
                <p className="mt-8 text-stone-500 serif-body text-sm leading-relaxed">
                  {reflection.contemplation}
                </p>
              </div>
              <button 
                onClick={() => setReflection(null)}
                className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-800 border-b border-stone-200 hover:border-stone-800 transition-all pt-12 pb-1"
              >
                Return to the Field
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-16 text-[10px] uppercase tracking-[0.4em] text-stone-400">
        Spark &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
