import {HumanMessage} from "@langchain/core/messages";
import models from "./models.service.js";
import {createAgent,providerStrategy} from "langchain";
import { StateSchema,MessagesValue,ReducedValue,StateGraph,START,END,type GraphNode} from "@langchain/langgraph";
import {z} from "zod";


const {mistralModel,cohereModel,geminiModel}=models;

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
    }).default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),
        {
            reducer: (current, next) => {
                return next
            }
        }
    )
});

const solutionNode:GraphNode<typeof State>=async (state:typeof State)=>{

    const [mistral_solution,cohere_solution]=await Promise.all([
        mistralModel.invoke(state.messages[0].content),
        cohereModel.invoke(state.messages[0].content)
    ]);

    return {
        solution_1:mistral_solution.text,
        solution_2:cohere_solution.text
    }
}

const judgeNode: GraphNode<typeof State> = async (state:typeof State) => {
    const { solution_1, solution_2 } = state;

    const judgeAgent = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(
            z.object({
                solution_1_score: z.number().min(0).max(10).default(0),
                solution_2_score: z.number().min(0).max(10).default(0),
            })
        )
    });

    const response = await judgeAgent.invoke({
        messages: [
            new HumanMessage(
                `You are a judge tasked with evaluating two solutions to the following problem: ${state.messages[0].content}. 
                    Solution 1 is: ${solution_1}. 
                    Solution 2 is: ${solution_2}. 
                    Return JSON: {"solution_1_score": number, "solution_2_score": number}`
            )
        ]
    });

    console.log("Judge response:", response);
    console.log("Structured:", response.structuredResponse);

    return {
        judge_recommendation: response.structuredResponse
    };
};


const graph=new StateGraph(State)
    .addNode("solution_node",solutionNode)
    .addNode("judge_node",judgeNode)
    .addEdge(START,"solution_node")
    .addEdge("solution_node","judge_node")
    .addEdge("judge_node",END)
    .compile();

async function useGraph(userMessage:string){
    const result=await graph.invoke({
        messages:[new HumanMessage(userMessage)]
    });

    console.log(result);
    return result.messages;
};

export default useGraph;

