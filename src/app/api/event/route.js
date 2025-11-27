import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";  // <-- MongoDB connection

// GET → Fetch all events
export async function GET() {
    const client = await clientPromise;
    const db = client.db("productVault");

    const events = await db.collection("events").find().toArray();
    return NextResponse.json(events);
}

// POST → Create new event
export async function POST(req) {
    try {
        const body = await req.json();  // parse JSON from client

        const client = await clientPromise;
        const db = client.db("productVault");

        const result = await db.collection("events").insertOne(body);

        return NextResponse.json({
            message: "Event Created",
            insertedId: result.insertedId
        }, { status: 201 });
    } catch (error) {
        console.error("POST /api/event error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
