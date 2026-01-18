import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getProducts, addProduct } from "@/lib/products";

// GET - Fetch all products or user-specific products
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    const products = getProducts(userEmail);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(req) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const productData = await req.json();
    
    const newProduct = addProduct({
      ...productData,
      userEmail: session.user.email
    });

    return NextResponse.json({ 
      message: "Product created successfully", 
      product: newProduct 
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}