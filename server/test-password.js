const bcrypt = require("bcrypt");

async function testPassword() {
  const password = "password123";

  // Test the hash we're using in SQL
  const sqlHash =
    "$2b$10$r3EE.uOoE6o.8XG6bYq.5.RbKcKJY7RkYQmK6QY9X5QdK5QY5QY5u";
  const isMatch = await bcrypt.compare(password, sqlHash);
  console.log("Password 'password123' matches SQL hash:", isMatch);

  // Generate a new hash to verify
  const newHash = await bcrypt.hash(password, 10);
  console.log("New hash for 'password123':", newHash);

  // Test the new hash
  const isMatchNew = await bcrypt.compare(password, newHash);
  console.log("Password matches new hash:", isMatchNew);
}

testPassword();
