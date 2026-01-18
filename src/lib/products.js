// Shared product data store (in-memory for demo)
// In production, this would be replaced with a database

export let products = [
  {
    id: "1",
    _id: "1", // For compatibility with existing components
    title: "Premium Wireless Headphones",
    shortDescription: "High-quality wireless headphones with noise cancellation",
    fullDescription: "Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers and professionals.",
    price: "$299.99",
    eventType: "High",
    thumbnailImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
    date: "2024-01-15",
    userEmail: "demo@example.com",
    createdAt: "2024-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    _id: "2",
    title: "Smart Fitness Watch",
    shortDescription: "Advanced fitness tracking with heart rate monitoring",
    fullDescription: "Track your fitness goals with this advanced smartwatch featuring GPS, heart rate monitoring, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    price: "$199.99",
    eventType: "Medium",
    thumbnailImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
    date: "2024-01-20",
    userEmail: "demo@example.com",
    createdAt: "2024-01-02T00:00:00.000Z"
  },
  {
    id: "3",
    _id: "3",
    title: "Portable Bluetooth Speaker",
    shortDescription: "Waterproof speaker with 360-degree sound",
    fullDescription: "Enjoy music anywhere with this portable Bluetooth speaker featuring 360-degree sound, waterproof design, and 12-hour battery life. Perfect for outdoor adventures.",
    price: "$89.99",
    eventType: "Low",
    thumbnailImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=300&fit=crop",
    date: "2024-01-25",
    userEmail: "demo@example.com",
    createdAt: "2024-01-03T00:00:00.000Z"
  }
];

export function addProduct(product) {
  const newProduct = {
    id: Date.now().toString(),
    _id: Date.now().toString(),
    ...product,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  return newProduct;
}

export function getProducts(userEmail = null) {
  if (userEmail) {
    return products.filter(product => product.userEmail === userEmail);
  }
  return products;
}

export function getProductById(id) {
  return products.find(product => product.id === id || product._id === id);
}

export function updateProduct(id, updateData) {
  const index = products.findIndex(product => product.id === id || product._id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return products[index];
  }
  return null;
}

export function deleteProduct(id) {
  const index = products.findIndex(product => product.id === id || product._id === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    return deleted[0];
  }
  return null;
}