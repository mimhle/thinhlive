import { db } from "./mongodb";

export async function getLives() {
    const collection = await db.collection("lives");
    return await collection.find({ live: true }).toArray();
}

export async function goLive(username) {
    const collection = await db.collection("lives");
    return (await collection.insertOne({
        username,
        createdAt: new Date(),
        live: true,
    })).insertedId.toString();
}

export async function isLive(username) {
    const collection = await db.collection("lives");
    return (await collection.findOne({ username, live: true }))?._id.toString();
}

export async function setLiveData(id, data){
    const collection = await db.collection("lives");
    return await collection.updateOne({_id: id}, {$set: data});
}

export async function setCurrentLiveData(username, data){
    const collection = await db.collection("lives");
    return await collection.updateOne({username, live: true}, {$set: data});
}

export async function getLiveData(id){
    const collection = await db.collection("lives");
    return await collection.findOne({_id: id});
}

export async function getLive(username) {
    const collection = await db.collection("lives");
    return await collection.findOne({ username, live: true });
}