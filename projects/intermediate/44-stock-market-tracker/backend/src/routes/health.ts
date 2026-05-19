import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "stock-market-tracker-api", timestamp: new Date().toISOString() });
});
