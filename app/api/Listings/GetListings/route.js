import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://cloudnotebookadmin:cloudnotebookadmin123@cloudnotebook.mvosxeg.mongodb.net/?retryWrites=true&w=majority&appName=CloudNoteBook";
const MONGODB_DB = "Car_Listings";
const COLLECTION_NAME = "Listings_Data";

async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);
  return db;
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const listings = await db.collection(COLLECTION_NAME).find({}).toArray();
    return NextResponse.json(listings);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const db = await connectToDatabase();
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    const result = await db.collection(COLLECTION_NAME).insertOne(body);

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: "Failed to save listing" },
      { status: 500 }
    );
  }
}
