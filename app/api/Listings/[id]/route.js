// app/api/Listings/[id]/route.js
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://cloudnotebookadmin:cloudnotebookadmin123@cloudnotebook.mvosxeg.mongodb.net/?retryWrites=true&w=majority&appName=CloudNoteBook";
const MONGODB_DB = "Car_Listings";
const COLLECTION_NAME = "Listings_Data";

async function connectToDB() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);
  return db;
}

export async function DELETE(request, { params }) {
  try {
    const db = await connectToDB();
    const { id } = params;

    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
