import { askGemini } from "../ai/gemini.js";
import { saveChat } from "../../database/chat.js";
import { planner } from "../core/planner.js";
export async function send() {

    const input = document.querySelector("#prompt");
    const messages = document.querySelector("#messages");

    const message = input.value.trim();
    


    if (!message) return;

    messages.innerHTML += `
<div class="user">
👤 ${message}
</div>
`;

    await saveChat("user", message);
    input.value = "";
const action = await planner(message);

if (action.handled) {

    messages.innerHTML += `
<div class="ai">
🤖 ${action.reply}
</div>
`;

    await saveChat("ai", action.reply);

    messages.scrollTop = messages.scrollHeight;

    return;
}
    

    const reply = await askGemini(message);

    messages.innerHTML += `
<div class="ai">
🤖 ${reply}
</div>
`;

    await saveChat("ai", reply);

    messages.scrollTop = messages.scrollHeight;

}