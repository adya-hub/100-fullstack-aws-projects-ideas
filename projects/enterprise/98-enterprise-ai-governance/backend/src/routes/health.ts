import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "enterprise-ai-governance-api", timestamp: new Date().toISOString() });
});
