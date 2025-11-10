User Authentication App

A backend application for user authentication built with Node.js, Express, PostgreSQL, and JWT. This project allows users to register, login, and manage their accounts securely.

**Features**

User registration with hashed passwords using bcrypt

User login with JWT authentication

Update user information (username, email, password)

Retrieve all registered users

Secure endpoints using JWT middleware

Built using PostgreSQL as the database

**Technologies Used**

Node.js & Express – Server-side framework

PostgreSQL – Database

pg – PostgreSQL client for Node.js

bcryptjs – Password hashing

jsonwebtoken – Authentication via JWT

dotenv – Environment variable management

Nodemon – Automatic server restart during development

Docker – Optional: run PostgreSQL in a container

**Endpoints**
POST	/auth/register	Register a new user
POST	/auth/login	Login a user
PATCH	/auth/update/:id	Update a user's information
GET	/auth/users	Get all users
