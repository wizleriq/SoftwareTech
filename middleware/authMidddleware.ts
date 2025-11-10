// import { Request, Response, NextFunction } from "express"
// import jwt from "jsonwebtoken"

// const SECRET_KEY = "Key"

// export interface AuthRequest extends Request {
//     user?: {id: number; email: string};
// }

// export const verifyToken =  (req: AuthRequest, res: Response, next: NextFunction) => {
//     const authHeader =req.headers.authorization;

//     if (!authHeader)
//         return res.status(401).json({message: "Unauthorized"})

//     const token = authHeader.split(" ")[1];
//     try {
//         const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({message: "Invalid Token"})
//     }
// }


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// const SECRET_KEY = "Key";
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
