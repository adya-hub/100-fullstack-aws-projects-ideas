import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "enterprise-contract-lifecycle-api", timestamp: new Date().toISOString() });
});
