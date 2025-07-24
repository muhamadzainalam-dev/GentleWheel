import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// MongoDB Configuration
const MONGODB_URI =
  "mongodb+srv://cloudnotebookadmin:cloudnotebookadmin123@cloudnotebook.mvosxeg.mongodb.net/?retryWrites=true&w=majority&appName=CloudNoteBook";
const MONGODB_DB = "Booking";
const COLLECTION_NAME = "Booking_Data";

// Reusable DB Connection Function
async function connectToDatabase() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db(MONGODB_DB);
}

// GET All Booking Data
export async function GET() {
  try {
    const db = await connectToDatabase();
    const bookings = await db.collection(COLLECTION_NAME).find({}).toArray();
    return NextResponse.json(bookings);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST All Booking Data
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
      { error: "Failed to save booking" },
      { status: 500 }
    );
  }
}

// UPDATE Status
export async function PATCH(req) {
  try {
    const db = await connectToDatabase();
    const body = await req.json();

    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "bookingId and status are required" },
        { status: 400 }
      );
    }

    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(bookingId) },
        { $set: { "bookingDetails.status": status } }
      );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, modifiedCount: result.modifiedCount },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 }
    );
  }
}
