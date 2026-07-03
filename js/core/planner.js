import { getMemory } from "../../database/memory.js";

export async function planner(message) {

    const text = message.toLowerCase();

    if (text === "tôi tên gì") {

        const name = await getMemory("name");

        if (name) {
            return {
                handled: true,
                reply: `Bạn tên là ${name}.`
            };
        }

        return {
            handled: true,
            reply: "Mình chưa biết tên của bạn."
        };

    }

    return {
        handled: false
    };

}