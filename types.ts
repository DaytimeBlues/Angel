
export enum WeatherType {
  CLEAR = 'clear',
  STORM = 'storm',
  HAZY = 'hazy',
  SNOW = 'snow'
}

export interface WeatherContent {
  quote: string;
  source: string;
  prompt: string;
  question: string;
  placeholder: string;
  secondary: string;
  emoji: string;
  label: string;
}

export interface ReflectionResponse {
  wisdom: string;
  contemplation: string;
}
