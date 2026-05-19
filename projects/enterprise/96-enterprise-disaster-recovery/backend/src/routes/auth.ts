import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(body.password, 12);
    const token = jwt.sign(
      { sub: body.email, name: body.name },
      process.env.JWT_SECRET ?? "dev-secret",
      { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" },
    );
    res.status(201).json({ token, user: { email: body.email, name: body.name } });
  } catch (e) {
    next(e);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = registerSchema.pick({ email: true, password: true }).parse(req.body);
    const token = jwt.sign(
      { sub: body.email },
      process.env.JWT_SECRET ?? "dev-secret",
      { expiresIn: "7d" },
    );
    res.json({ token });
  } catch (e) {
    next(e);
  }
});
