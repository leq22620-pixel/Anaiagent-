import CONFIG from "../config.js";

export async function askGemini(message) {

    try {

        const response = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message
            })

        });

        if (!response.ok) {
            throw new Error("Lỗi kết nối AI");
        }

        const data = await response.json();

        return data.reply;

    } catch (error) {

        console.error(error);

        return "❌ Không thể kết nối AI.";

    }

}