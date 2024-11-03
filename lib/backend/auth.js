import { db } from "./mongodb";
import bcrypt from "bcrypt";
import { randomString } from "../frontend/utils";

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
    if (!username || !password) {
        return false;
    }

    const collection = await db.collection("users");
    const hash = (await collection.findOne({ username }))?.["password"];
    if (!hash) {
        return false;
    }
    return await bcrypt.compare(password, hash);
}

export async function getUser(username) {
    const collection = await db.collection("users");
    return await collection.findOne({ username }, {projection: {_id: 0, password: 0}});
}

export async function setUser(username, data) {
    const collection = await db.collection("users");
    return await collection.updateOne({username}, {$set: data});
}

export async function getUsers() {
    const collection = await db.collection("users");
    return await collection.find().toArray();
}

export async function generateSession(username) {
    if (!username) {
        return false;
    }

    const collection = await db.collection("sessions");
    const sessionId = randomString(64);
    await collection.insertOne({ username, session_id: sessionId, timestamp: new Date() });
    return sessionId;
}

export async function verifySession(username, sessionId) {
    if (!username || !sessionId) {
        return false;
    }

    const collection = await db.collection("sessions");
    return !!(await collection.findOne({ username, session_id: sessionId }));
}

export async function deleteSession(username, sessionId) {
    const collection = await db.collection("sessions");
    return await collection.deleteOne({ username, session_id: sessionId });
}