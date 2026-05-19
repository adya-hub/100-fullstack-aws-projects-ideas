import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "kubernetes-dashboard-api", timestamp: new Date().toISOString() });
});
