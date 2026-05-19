import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "gift-wishlist-app-api", timestamp: new Date().toISOString() });
});
