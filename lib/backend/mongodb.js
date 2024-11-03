import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
export let clientPromise;
export let db;

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local');
}

client = new MongoClient(uri, options);
clientPromise = client.connect();
db = client.db(process.env.DB);
