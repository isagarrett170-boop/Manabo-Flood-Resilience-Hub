import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION, BARANGAY_DATA } from "../constants";

// Access the API key safely from the global process object (polyfilled in index.html)
// @ts-ignore
const apiKey = window.process?.env?.API_KEY || process.env.API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[] = []) => {
  try {
    const model = "gemini-2.5-flash";
    
    // Inject the specific data context into the prompt
    const dataContext = JSON.stringify(BARANGAY_DATA);
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION}\n\nHere is the specific data for all barangays: ${dataContext}`;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: 0.7,
      },
      history: history, // Pass previous chat history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};