
import { GoogleGenAI, Type } from "@google/genai";
import { WeatherType, ReflectionResponse } from "../types";

const MAX_RETRIES = 3;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getWisdom(weather: WeatherType, userReflection: string): Promise<ReflectionResponse> {
    const prompt = `
      Act as a wise, gentle field guide with the soul of Leo Tolstoy. 
      The current 'weather of the field' is ${weather}.
      The user has shared this reflection: "${userReflection}".
      
      Provide a response in JSON format with exactly two keys:
      1. "wisdom": A short, profound, Tolstoy-esque acknowledgement of their reflection (max 20 words).
      2. "contemplation": A gentle follow-up question or thought that encourages further inner work based on the ${weather} theme (max 20 words).
      
      Maintain a tone that is serious yet compassionate, minimalist, and philosophical.
    `;

    let lastError: any;
    
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await this.ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                wisdom: { type: Type.STRING },
                contemplation: { type: Type.STRING },
              },
              required: ["wisdom", "contemplation"],
            },
          },
        });

        const text = response.text;
        if (!text) throw new Error("Empty response from model");
        
        return JSON.parse(text) as ReflectionResponse;
      } catch (error: any) {
        lastError = error;
        // If it's a 429 (Rate Limit) or 5xx, wait and retry
        const isTransient = error?.status === 429 || error?.status >= 500 || !error?.status;
        if (isTransient && i < MAX_RETRIES - 1) {
          const backoff = Math.pow(2, i) * 1000;
          await this.delay(backoff);
          continue;
        }
        break;
      }
    }

    console.error("Gemini Final Error after retries:", lastError);
    throw lastError;
  }
}

export const geminiService = new GeminiService();
