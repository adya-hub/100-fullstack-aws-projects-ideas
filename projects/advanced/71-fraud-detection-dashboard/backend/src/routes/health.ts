import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "fraud-detection-dashboard-api", timestamp: new Date().toISOString() });
});
