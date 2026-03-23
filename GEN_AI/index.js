import readline from 'readline/promises';
import dotenv from 'dotenv';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import { sendEmail } from './mail.service.js';
import {tool,createAgent} from 'langchain';
import chalk from 'chalk';
import * as z from "zod";

dotenv.config();

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0
});

const emailTool=tool(
    sendEmail,
    {
        name:"emailTool",
        description:"Use this tool to send email to users",
        schema:z.object({
            to:z.string().describe("Recipient's email address"),
            subject:z.string().describe("Subject of the email"),
            html:z.string().describe("HTML content of the email"),
            text:z.string().optional()
        })

    }
)

const agent=createAgent({
    model,
    tools:[emailTool]
});



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let messages=[];

while (true){
    const question = await rl.question(chalk.green("You:"));
    if (!question.trim()) continue;
    messages.push(new HumanMessage(question));
    const response = await agent.invoke({
        messages
    });
    messages.push(response.messages[response.messages.length-1]);
    console.log(chalk.blue("AI:"), response.messages[response.messages.length-1].content);
}

