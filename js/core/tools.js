import { askGemini } from "../ai/gemini.js";
import { getProfile } from "../../database/profile.js";

export async function useTool(tool, data = {}) {

    switch (tool) {

        case "profile":

            return await getProfile();

        case "ai":

            return await askGemini(data.message);

        default:

            return null;

    }

}