import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "enterprise-data-lake-api", timestamp: new Date().toISOString() });
});
