import { db } from "./mongodb";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
    if (!username || !password) {
        return false;
    }

    const collection = await db.collection("users");
    password = await bcrypt.hash(password, 10);
    if (await collection.findOne({ username })) {
        return false
    }
    await collection.insertOne({ username, password });
    return true;
}

export async function verifyUser(username, password) {
    const collection = await db.collection("users");
    const hash = (await collection.findOne({ username }))["password"];
    if (!hash) {
        return false;
    }
    return await bcrypt.compare(password, hash);
}

export async function getUser(username) {
    const collection = await db.collection("users");
    return await collection.findOne({ username });
}

export async function getUsers() {
    const collection = await db.collection("users");
    return await collection.find().toArray();
}