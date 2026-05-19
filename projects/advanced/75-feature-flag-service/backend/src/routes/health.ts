import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "feature-flag-service-api", timestamp: new Date().toISOString() });
});
