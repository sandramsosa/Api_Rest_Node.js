import jwt from "jsonwebtoken";
import "dotenv/config";
// console.log("🔐 JWT_SECRET_KEY =", process.env.JWT_SECRET_KEY);

const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (userData) => {
  const user = {
    id: userData.id,
    email: userData.email
  };
  const expiration = {expiresIn: '1h'};
  return jwt.sign(user, secret_key, expiration);
};