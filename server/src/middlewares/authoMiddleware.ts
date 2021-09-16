import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authoMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    var bearerToken = req.headers.authorization;
    const token = bearerToken?.split("Bearer ");
    if (!token![1]) return res.status(403).send("Access denied.");
    
    const decoded = jwt.verify(token![1], process.env.JWTPRIVATEKEY!);
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).send("Invalid token");
  }
}