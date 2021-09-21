import jwt from "jsonwebtoken";

export function generateToken(payload: any)
{
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY!);
  return token;
}