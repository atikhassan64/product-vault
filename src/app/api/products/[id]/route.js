import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getProductById, deleteProduct, updateProduct } from "@/lib/products";

// GET - Fetch single product by ID
export async function GET(req, { params }) {
  try {
    const { id } = await params; // Await params in Next.js 15
    
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE - Delete product by ID
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Await params in Next.js 15
    
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check if user owns this product
    if (product.userEmail !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Delete product
    const deletedProduct = deleteProduct(id);

    if (deletedProduct) {
      return NextResponse.json({ 
        message: "Product deleted successfully",
        deletedCount: 1 
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// PUT - Update product by ID
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // Await params in Next.js 15
    const updateData = await req.json();
    
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check if user owns this product
    if (product.userEmail !== session.user.email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Update product
    const updatedProduct = updateProduct(id, updateData);

    if (updatedProduct) {
      return NextResponse.json({ 
        message: "Product updated successfully",
        product: updatedProduct
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}