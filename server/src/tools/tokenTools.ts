import jwt from "jsonwebtoken";

export function generateToken(payload: any)
{
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY!, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  return token;
}