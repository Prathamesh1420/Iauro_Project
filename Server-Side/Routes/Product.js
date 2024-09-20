const express = require("express");
const router = express.Router();
const db = require("../Database/Mysql");
const auth = require("../Middleware/AdminAuth");
require("dotenv").config();

const creatProductId = (name) => {
  const initials = name.substring(0, 4).toUpperCase();
  const random = Math.floor(1000 + Math.random() * 9000);
  return initials + random;
};

// Setting a product
router.post("/setproducts", async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;
    const prod_id = creatProductId(name);
    const productInsertQuery =
      "INSERT INTO Products (product_id ,user_id, product_name, product_desc, product_price, is_approved) VALUES (?, ?, ?, ?, ?, ?)";
    await db.query(productInsertQuery, [
      prod_id,
      userId,
      name,
      description,
      price,
      false,
    ]);
    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    return res.status(500).send(`Error inserting product: ${error.message}`);
  }
});

// Getting approved products
router.get("/getproducts", async (req, res) => {
  try {
    const checkQuery = "SELECT * FROM Products WHERE is_approved = ?";
    const [results] = await db.query(checkQuery, [true]);
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send(`Error fetching products: ${error.message}`);
  }
});

// Admin update product
router.put("/updateproducts", auth, async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const { name, description, price, is_approved } = req.body;

    const productUpdateQuery =
      "UPDATE Products SET product_name = ?, product_desc = ?, product_price = ?, is_approved = ? WHERE product_id = ?";
    await db.query(productUpdateQuery, [
      name,
      description,
      price,
      is_approved,
      id,
    ]);

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).send(`Error updating product: ${error.message}`);
  }
});

// Admin delete product
router.delete("/deleteproducts", auth, async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const productDeleteQuery = "DELETE FROM Products WHERE product_id = ?";
    await db.query(productDeleteQuery, [id]);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).send(`Error deleting product: ${error.message}`);
  }
});

// Admin update user
router.put("/updateusers", auth, async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { username, email } = req.body;

    const userUpdateQuery =
      "UPDATE Users SET user_name = ?, user_email = ? WHERE user_id = ?";
    await db.query(userUpdateQuery, [username, email, id]);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).send(`Error updating user: ${error.message}`);
  }
});

// Admin delete user
router.delete("/deleteusers", auth, async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userDeleteQuery = "DELETE FROM Users WHERE user_id = ?";
    await db.query(userDeleteQuery, [id]);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send(`Error deleting user: ${error.message}`);
  }
});

module.exports = router;
