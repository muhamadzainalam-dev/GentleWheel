import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "GentleWheel_DB";
const collection = "GentleWheel_COL";

// GET all cars
export async function GET() {
  const conn = await client.connect();
  const db = conn.db(dbName);

  const data = await db.collection(collection).find({}).toArray();

  return NextResponse.json(data);
}

// POST new car
export async function POST(req) {
  const conn = await client.connect();
  const db = conn.db(dbName);

  const body = await req.json();

  const result = await db.collection(collection).insertOne(body);

  return NextResponse.json(result);
}
