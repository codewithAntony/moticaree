// const express = require("express");
// const bcrypt = require("bcrypt");
// const mysql = require("mysql2/promise");

// const router = express.Router();

// // MySQL connection pool
// const db = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "garage_service",
// });

// // ======================
// // REGISTER ROUTE
// // ======================
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     // Check if user exists
//     const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [
//       email,
//     ]);
//     if (existing.length > 0) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     await db.query(
//       "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({ msg: "User registered successfully" });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
