
import { WeatherType, WeatherContent } from './types';

export const WEATHER_DATA: Record<WeatherType, WeatherContent> = {
  [WeatherType.CLEAR]: {
    emoji: '☀️',
    label: 'Clear Skies',
    quote: '"The most important time is now. The most important person is the one you are with. The most important affair is to do them good."',
    source: 'Leo Tolstoy, Three Questions',
    prompt: 'The sun is high. The field is clear.',
    question: 'What is the most important affair for this moment?',
    placeholder: 'State your intention...',
    secondary: 'Proceed with steady hands.'
  },
  [WeatherType.STORM]: {
    emoji: '⛈️',
    label: 'Gathering Storm',
    quote: '"In difficult circumstances, always to act on one\'s first impression."',
    source: 'Leo Tolstoy, Diaries',
    prompt: 'High winds. Do not look too far ahead.',
    question: 'What is the immediate emergency?',
    placeholder: 'Drop the anchor here...',
    secondary: 'The storm will pass. Hold fast.'
  },
  [WeatherType.HAZY]: {
    emoji: '🌫️',
    label: 'Hazy Overcast',
    quote: '"The strongest of all warriors are these two — Time and Patience."',
    source: 'Leo Tolstoy, War and Peace',
    prompt: 'The field is resting. Visibility is low.',
    question: 'What is the one single thing visible right in front of you?',
    placeholder: 'Just one small step...',
    secondary: 'Or, do nothing and wait for the fog to clear.'
  },
  [WeatherType.SNOW]: {
    emoji: '❄️',
    label: 'Deep Winter',
    quote: '"Pure and complete sorrow is as impossible as pure and complete joy."',
    source: 'Leo Tolstoy, War and Peace',
    prompt: 'Winter silence. The ground is frozen.',
    question: 'What warmth can you kindle inside?',
    placeholder: 'A small kindness to yourself...',
    secondary: 'Rest is also labor.'
  }
};
