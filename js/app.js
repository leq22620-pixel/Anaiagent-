import kernel from "./core/kernel.js";
import { send } from "./pages/assistant.js";
import { loadChat } from "./database/chat.js";

window.addEventListener("load", async () => {

    await kernel.boot();

    console.log(kernel.info());

    const messages = document.getElementById("messages");

    const history = await loadChat();

    history.forEach(item => {

        messages.innerHTML += `
<div class="${item.role}">
${item.role === "user" ? "👤" : "🤖"} ${item.text}
</div>
`;

    });

    messages.scrollTop = messages.scrollHeight;

    document
        .getElementById("send")
        .addEventListener("click", send);

    document
        .getElementById("prompt")
        .addEventListener("keydown", (e) => {

            if (e.key === "Enter") {
                send();
            }

        });

});