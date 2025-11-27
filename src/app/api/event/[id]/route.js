import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;


        const client = await clientPromise;
        const db = client.db("productVault");

        const result = await db.collection("events").deleteOne({
            _id: new ObjectId(id), // MongoDB ObjectId
        });

        return NextResponse.json({ deletedCount: result.deletedCount });
    } catch (error) {
        console.error("DELETE /api/event error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(req, { params }) {
    const resolvedParams = params; // ← FIXED
    const { id } = resolvedParams;

    if (!id || !ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("productVault");

        const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error) {
        console.error("GET /api/event/[id] error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


