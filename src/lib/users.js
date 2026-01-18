// Shared user data store (in-memory for demo)
// In production, this would be replaced with a database

export let users = [
  // Add a demo user for testing
  {
    id: "demo-user",
    name: "Demo User",
    email: "demo@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G", // password: "demo123"
    createdAt: "2024-01-01T00:00:00.000Z"
  }
];

export function addUser(user) {
  const newUser = {
    id: Date.now().toString(),
    ...user,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  return newUser;
}

export function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function getUserById(id) {
  return users.find(user => user.id === id);
}

export function updateUser(id, updateData) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return users[index];
  }
  return null;
}

export function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const deleted = users.splice(index, 1);
    return deleted[0];
  }
  return null;
}