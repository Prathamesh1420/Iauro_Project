const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const admin = require("./Routes/Admin");
const user = require("./Routes/User");
const product = require("./Routes/Product");

app.use(express.json());
app.use(cors());

app.use("/admin", admin);
app.use("/user", user);
app.use("/product", product);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
