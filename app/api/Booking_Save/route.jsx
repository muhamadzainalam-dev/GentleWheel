import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "GentleWheel_DB";
const collection = "GentleWheel_Booking_COL";

async function getDB() {
  const conn = await client.connect();
  return conn.db(dbName);
}

// GET all bookings
export async function GET() {
  const db = await getDB();
  const data = await db.collection(collection).find({}).toArray();
  return NextResponse.json(data);
}

// POST new booking
export async function POST(req) {
  const db = await getDB();
  const body = await req.json();

  const result = await db.collection(collection).insertOne(body);

  return NextResponse.json(result);
}

// PATCH update booking status
export async function PATCH(req) {
  const db = await getDB();
  const body = await req.json();

  const result = await db
    .collection(collection)
    .updateOne(
      { _id: new ObjectId(body.bookingId) },
      { $set: { "bookingDetails.status": body.status } },
    );

  return NextResponse.json(result);
}
