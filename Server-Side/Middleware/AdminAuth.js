const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Please send token! Unauthorized user");
  }

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);

    if (data.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (error) {
    return res.status(401).send(`Error: Invalid token`);
  }

  next();
};

module.exports = adminAuth;
