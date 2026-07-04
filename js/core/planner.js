import { getMemory, saveMemory } from "../../database/memory.js";
import { saveTask, getTasks } from "../../database/task.js";

function reply(text) {
    return {
        handled: true,
        reply: text
    };
}

async function remember(key, value, message) {
    await saveMemory(key, value);
    return reply(message);
}

function normalize(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\?/g, "")
        .replace(/\./g, "");
}

export async function planner(message) {

    const text = normalize(message);

    // =====================
    // HỎI THÔNG TIN (đặt trước)
    // =====================

    if (text === "tôi tên gì") {

        const name = await getMemory("name");
        console.log("Tên đọc được:", name);

        return reply(
            name
                ? `Bạn tên là ${name}.`
                : "Mình chưa biết tên của bạn."
        );
    }

    if (text === "tôi làm nghề gì") {

        const job = await getMemory("job");

        return reply(
            job
                ? `Bạn là ${job}.`
                : "Mình chưa biết nghề nghiệp của bạn."
        );
    }

    if (text === "tôi sống ở đâu") {

        const city = await getMemory("city");

        return reply(
            city
                ? `Bạn đang sống ở ${city}.`
                : "Mình chưa biết bạn sống ở đâu."
        );
    }

    if (text === "tôi thích gì") {

        const favorite = await getMemory("favorite");

        return reply(
            favorite
                ? `Bạn thích ${favorite}.`
                : "Mình chưa biết sở thích của bạn."
        );
    }

    // =====================
    // LƯU THÔNG TIN
    // =====================

    if (text.startsWith("tôi tên là ")) {

        const name = message.substring(11).trim();

        console.log("Lưu tên:", name);

        return await remember(
            "name",
            name,
            `Được rồi, mình sẽ nhớ tên bạn là ${name}.`
        );
    }

    if (text.startsWith("tôi là ")) {

        const job = message.substring(7).trim();

        return await remember(
            "job",
            job,
            `Được rồi, mình sẽ nhớ nghề nghiệp của bạn là ${job}.`
        );
    }

    if (
        text.startsWith("tôi sống ở ") &&
        text !== "tôi sống ở đâu"
    ) {

        const city = message.substring(10).trim();

        return await remember(
            "city",
            city,
            `Được rồi, mình sẽ nhớ bạn sống ở ${city}.`
        );
    }

    if (
        text.startsWith("tôi thích ") &&
        text !== "tôi thích gì"
    ) {

        const favorite = message.substring(10).trim();

        return await remember(
            "favorite",
            favorite,
            `Được rồi, mình sẽ nhớ bạn thích ${favorite}.`
        );
    }

    // =====================
    // CÔNG VIỆC
    // =====================

    if (text.startsWith("thêm việc ")) {

        const task = message.substring(9).trim();

        await saveTask(task);

        return reply(`Đã thêm công việc: ${task}`);
    }

    if (text === "công việc của tôi") {

        const tasks = await getTasks();

        if (tasks.length === 0) {
            return reply("Bạn chưa có công việc nào.");
        }

        const list = tasks
            .map((task, index) => `${index + 1}. ${task.text}`)
            .join("\n");

        return reply(`Danh sách công việc:\n${list}`);
    }

    return {
        handled: false
    };
}