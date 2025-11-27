// import { NextResponse } from "next/server";

// // Temporary in-memory database (demo purposes)
// let users = [];

// export async function POST(req) {
//   const { name, email, password } = await req.json();

//   // Check if user already exists
//   const exist = users.find((u) => u.email === email);
//   if (exist) {
//     return NextResponse.json({ message: "User already exists" }, { status: 400 });
//   }

//   // Save new user
//   users.push({ name, email, password });

//   return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
// }


// app/api/auth/register/route.js
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("productVault");

    // Already exists check
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.collection("users").insertOne({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}

