import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Clear any server-side session data if needed
    // For now, we'll just return a success response
    // The actual logout will be handled by NextAuth on the client side
    
    return NextResponse.json({ 
      message: "Logout successful" 
    }, { status: 200 });

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ 
      message: "Internal server error" 
    }, { status: 500 });
  }
}