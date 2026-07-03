export function detectIntent(message) {

    const text = message.toLowerCase();

    if (text.includes("tên")) {
        return "profile";
    }

    if (
        text.includes("lịch") ||
        text.includes("công việc") ||
        text.includes("nhắc")
    ) {
        return "task";
    }

    return "ai";

}