import type { Request, Response, NextFunction } from "express";



export async function initialMiddleware(req: Request, res: Response, next: NextFunction) {
  // Your middleware logic here
  next();
}