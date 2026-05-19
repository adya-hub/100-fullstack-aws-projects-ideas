import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "search-engine-platform-api", timestamp: new Date().toISOString() });
});
