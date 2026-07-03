import CONFIG from "../config.js";
import { getProfile } from "../../database/profile.js";

export async function askGemini(message) {

    try {

        const profile = await getProfile();

        const prompt = `
Thông tin người dùng:

Tên: ${profile.name || "Chưa biết"}
Nghề: ${profile.job || "Chưa biết"}
Nơi ở: ${profile.city || "Chưa biết"}
Sở thích: ${profile.favorite || "Chưa biết"}
Mục tiêu: ${profile.goal || "Chưa biết"}

Hãy sử dụng các thông tin trên nếu chúng liên quan đến câu hỏi.

Người dùng hỏi:
${message}
`;

        const response = await fetch(CONFIG.API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: prompt
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