// authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../database/data'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users');
    res.json(result.rows); // send JSON array of users
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userQuery.rows.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = userQuery.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const userId = Number(req.params.id); // user id in route params

  try {
    const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userQuery.rows.length === 0)
      return res.status(404).json({ message: 'User not found' });

    const user = userQuery.rows[0];

    const updatedUsername = username || user.username;
    const updatedEmail = email || user.email;
    const updatedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    const updatedUser = await pool.query(
      'UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *',
      [updatedUsername, updatedEmail, updatedPassword, userId]
    );

    res.json({ message: 'User updated successfully', user: updatedUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



















// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { AuthRequest }  from "../middleware/authMidddleware";
// import { User } from "../models/userModels";


// const SECRET_KEY = "Key";

// // Register
// export const registerUser = async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });

//   await newUser.save();
//   res.status(201).json({ message: "User registered successfully" });
// };

// // Login
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//   res.status(200).json({ message: "Login successful", token });
// };

// // Update
// export const updateUser = async (req: AuthRequest, res: Response) => {
//   const { username, email, password } = req.body;
//   const userId = req.user?.id;

//   if (!userId) return res.status(401).json({ message: "Unauthorized" });

//   const user = await User.findById(userId);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   if (username) user.username = username;
//   if (email) user.email = email;
//   if (password) user.password = await bcrypt.hash(password, 10);

//   await user.save();

//   res.status(200).json({
//     message: "User updated successfully",
//     updatedUser: { username: user.username, email: user.email }
//   });
// };



// import express, { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { AuthRequest } from '../middleware/authMidddleware';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
// }

// let users: User[] = [];

// const SECRET_KEY = 'Key';

// // Register Code
// // app.post('/register', async (req: Request, res: Response) => {
// export const registerUser = async(req: Request, res: Response) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const userExists = users.find(user => user.email === email);
//   if (userExists) return res.status(400).json({ message: 'User already exists' });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = { id: Date.now(), username, email, password: hashedPassword };
//   users.push(newUser);

//   res.status(201).json({ message: 'User Created Successfully' });
// };

// // Login Code
// export const loginUser = async (req: Request, res: Response) => {
//   const {email, password} = req.body;

//   if (!email || !password) {
//     return res.status(400).json({message: 'Email and Password are required'});
//   }

//   const user = users.find(user => user.email === email);
//   if (!user) return res.status(401).json({message: 'Invalid Credentials'});

//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) return res.status(401).json({message: "Invalid password"})

//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {expiresIn: '1h'})

//   res.status(200).json({message: 'Login Successful', token: token})
// }

// // Update Code
// export const updateUser = async (req: AuthRequest, res: Response) => {
//   const { username, email, password} = req.body;
//   const userId = req.user?.id;

//   if (userId) {
//     return res.status(401).json({message: 'Unauthorized'})
//   }
  
//   const user = users.find(user => user.id === userId);
//   if (!user) return res.status(401).json({message: 'User not found'});

//   if (username) user.username = username;
//   if (email) user.email = email;
//   if (password) user.password = await bcrypt.hash(password, 10)

//   res.json({
//     message: 'User Created Successfully',
//     updateUser: {username: user.username, email: user.email}
//   })}