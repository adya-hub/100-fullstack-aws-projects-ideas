import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "car-maintenance-log-api", timestamp: new Date().toISOString() });
});
