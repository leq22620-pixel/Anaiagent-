import { getMemory, saveMemory } from "./memory.js";

const KEYS = [
    "name",
    "job",
    "city",
    "favorite",
    "goal",
    "birthday",
    "email"
];

export async function getProfile() {

    const profile = {};

    for (const key of KEYS) {

        profile[key] = await getMemory(key);

    }

    return profile;

}

export async function updateProfile(key, value) {

    if (!KEYS.includes(key)) return;

    await saveMemory(key, value);

}