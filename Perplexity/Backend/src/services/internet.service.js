import {tavily} from "@tavily/core";

export async function searchWeb({query}){
    const response = await tavily.search({
        query: query,
        max_results: 5
    });
    console.log("Web search results:", response);
    return response;
}