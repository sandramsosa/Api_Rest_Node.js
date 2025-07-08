// import jwt from "jsonwebtoken";
// import "dotenv/config";

// const secret_key = process.env.JWT_SECRET_KEY;

// export const authentication = (req, res, next) => {
//   const token = req.headers['authorization'].split(" ")[1];

//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, secret_key, (err) =>{
//     if (err) return res.sendStatus(403);
//     next();
//   });   
// }
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
      throw new Error("JWT_SECRET_KEY no está definido en .env");
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}
