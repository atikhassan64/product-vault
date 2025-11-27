import { NextResponse } from "next/server";

// Temporary in-memory database (demo purposes)
let users = [];

export async function POST(req) {
  const { name, email, password } = await req.json();

  // Check if user already exists
  const exist = users.find((u) => u.email === email);
  if (exist) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // Save new user
  users.push({ name, email, password });

  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
