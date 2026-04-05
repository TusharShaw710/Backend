import {config} from "dotenv";

config();

type Config = {
    GOOGLE_API_KEY: string;
    MISTRAL_API_KEY: string;
    COHERE_API_KEY: string;
}

const configs: Config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
}

export default configs;
