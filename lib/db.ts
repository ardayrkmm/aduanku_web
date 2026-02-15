import mongoose from "mongoose";

const globalWithMongoose = global as typeof globalThis & {
  _mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (globalWithMongoose._mongoose!.conn) {
    return globalWithMongoose._mongoose!.conn;
  }

  if (!globalWithMongoose._mongoose!.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined in environment");
    globalWithMongoose._mongoose!.promise = mongoose.connect(uri);
  }

  try {
    globalWithMongoose._mongoose!.conn = await globalWithMongoose._mongoose!.promise!;
    return globalWithMongoose._mongoose!.conn;
  } catch (err) {
    globalWithMongoose._mongoose!.promise = null;
    throw err;
  }
}

export default connectToDatabase;
