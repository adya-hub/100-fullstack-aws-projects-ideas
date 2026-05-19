import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "data-pipeline-orchestrator-api", timestamp: new Date().toISOString() });
});
