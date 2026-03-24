import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage,AIMessage} from "@langchain/core/messages";
import {SystemMessage} from "@langchain/core/messages";
import dotenv from 'dotenv';

dotenv.config();

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_AI_API_KEY
});

async function getResponse(messages) {
  try {
    const geminiResponse = await geminiModel.invoke(messages.map(msg=>{
      if(msg.role==="user"){
        return new HumanMessage(msg.content);
      }else{
        return new AIMessage(msg.content);
      }
    }));
    return geminiResponse.content;
  }catch(err){
    console.error('Error invoking Gemini model:', err.message);
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