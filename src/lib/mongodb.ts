import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'fixit_recovery';

const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
};

let client: MongoClient | null = null;
let db: any = null;

export default async function getDatabase() {
  if (db) {
    return db;
  }
  
  try {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}
