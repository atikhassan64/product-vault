import { NextResponse } from "next/server";
import { users } from "@/lib/users";

// This is for debugging only - remove in production
export async function GET(req) {
  try {
    // Return users without passwords for debugging
    const safeUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }));

    return NextResponse.json(safeUsers, { status: 200 });
  } catch (error) {
    console.error("Debug users error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}