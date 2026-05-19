import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "nft-marketplace-lite-api", timestamp: new Date().toISOString() });
});
