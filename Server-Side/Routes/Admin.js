const express = require("express");
const router = express.Router();
const db = require("../Database/Mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const creatUserId = (name) => {
  const initials = name.substring(0, 4).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return initials + random;
};

//admin signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "admin";
    const user_id = creatUserId(username);

    const checkQuery = "SELECT * FROM Users WHERE role = ?";
    const [results] = await db.query(checkQuery, [role]);

    if (results.length > 0) {
      return res.status(400).json({ message: "Admin account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertAdminQuery =
      "INSERT INTO Users (user_id, user_name, user_email, password, role) VALUES (?, ?, ?, ?, ?)";
    await db.query(insertAdminQuery, [
      user_id,
      username,
      email,
      hashedPassword,
      role,
    ]);

    return res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
});

module.exports = router;
