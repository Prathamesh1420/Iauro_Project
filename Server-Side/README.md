Description
This project is a web application built with Express.js and MySQL for managing user accounts, products, and admin functionalities. It allows users to sign up, sign in, and manage products, while admins can perform operations like updating or deleting users and products.

Features
User Registration: Users can sign up and create accounts.
User Authentication: Secure login system using JWT tokens.
Product Management: Users can add products, and admins can approve, update, or delete products.
Admin Controls: Admin can manage user accounts, including the ability to delete or update user information.
Technologies Used
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for Node.js.
MySQL: Relational database for storing user and product data.
JWT: For secure authentication.
bcrypt: For password hashing.
CORS: To enable cross-origin requests.

API Endpoints
User Endpoints

POST /user/signup: Create a new user account.
POST /user/signin: Log in a user.
Product Endpoints

POST /product/setproducts: Add a new product.
GET /product/getproducts: Retrieve approved products.
PUT /product/updateproducts?id=<product_id>: Update product details.
DELETE /product/deleteproducts?id=<product_id>: Delete a product.
Admin Endpoints

PUT /admin/updateusers?id=<user_id>: Update user information.
DELETE /admin/deleteusers?id=<user_id>: Delete a user account.
Usage
Use tools like Postman to test the API endpoints.
Include the JWT token in the Authorization header for protected routes.
