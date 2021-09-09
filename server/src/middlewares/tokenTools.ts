import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MySqlConnection } from "../database";
import Encrypt from "../Encrypt";
import User from "../models/User";

export function authoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.token) return res.status(403).send("Access denied.");
    
    const decoded = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY || "secret");
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.error(error)
    res.status(400).send("Invalid token");
  }
}

export function generateToken(payload: any)
{
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY || "secret", {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  return token;
}