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

// User sign-up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const role = "user";
    const user_id = creatUserId(username);

    const checkEmailQuery = "SELECT * FROM Users WHERE user_email = ?";
    const [existingUser] = await db.query(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO Users (user_id, user_name, user_email, password, role) VALUES (?, ?, ?, ?, ?)";
    await db.query(insertUserQuery, [
      user_id,
      username,
      email,
      hashedPassword,
      role,
    ]);

    return res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
});

// User/Admin sign-in
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userCheckQuery = "SELECT * FROM Users WHERE user_email = ?";
    const [results] = await db.query(userCheckQuery, [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const authToken = jwt.sign(
      { id: user.user_id, role: user.role, email: user.user_email },
      process.env.SECRET_KEY
    );

    return res
      .status(200)
      .json({ message: "Login Successfull", authToken: authToken });
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
});

module.exports = router;
