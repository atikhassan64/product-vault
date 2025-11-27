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

