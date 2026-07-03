import { updateProfile } from "../../database/profile.js";

export async function remember(key, value) {

    await updateProfile(key, value);

}

export async function rememberName(name) {

    await remember("name", name);

}

export async function rememberJob(job) {

    await remember("job", job);

}

export async function rememberCity(city) {

    await remember("city", city);

}