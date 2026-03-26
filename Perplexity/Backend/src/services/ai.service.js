import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage,AIMessage} from "@langchain/core/messages";
import {SystemMessage} from "@langchain/core/messages";
import dotenv from 'dotenv';
import { searchWeb } from "./internet.service.js";
import { tool,createAgent } from "langchain";
import * as z from "zod";

dotenv.config();

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_AI_API_KEY
});

const webSearchTool = tool(
  searchWeb,
  {
    name: "web-search",
    description: "Use this tool to search the web for up-to-date information. Input should be a search query string.",
    schema: z.object({
      query: z.string().describe("The search query string")
    })
  }
);

const agent=createAgent({
  model:geminiModel,
  tools:[webSearchTool],
  agentOptions:{
    agentType:"zero-shot-react-description"
  }
});

async function getResponse(messages) {
  try {
    const formattedMessages = messages.map(msg => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else {
        return new AIMessage(msg.content);
      }
    });

    const geminiResponse = await geminiModel.invoke(formattedMessages);
    return geminiResponse.content;
  }catch(err){
    console.error('Error invoking Gemini model:', err);
    throw new Error('Failed to get AI response: ' + err.message);
  }
}

async function getChatTitle(message) {
  try {
    const mistralResponse = await mistralModel.invoke([
      new SystemMessage("You are a helpful assistant that generates concise and descriptive titles for user queries."),
      new HumanMessage(`Generate a concise title for the following user query is 2-4 words: "${message}"`)
    ]);

    return mistralResponse.content;
    
  } catch (error) {
    console.error('Error invoking ChatTitle model:', error.message);
  }
  
}

export { getResponse,getChatTitle };