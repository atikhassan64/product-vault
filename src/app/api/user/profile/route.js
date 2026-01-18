import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getUserByEmail, updateUser } from "@/lib/users";

export async function GET(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find user in our database
    const user = getUserByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });

  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    // Find and update user
    const user = getUserByEmail(session.user.email);
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = updateUser(user.id, { name });

    if (updatedUser) {
      // Return updated user data without password
      const { password, ...userWithoutPassword } = updatedUser;
      return NextResponse.json({ 
        message: "Profile updated successfully", 
        user: userWithoutPassword 
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }

  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}