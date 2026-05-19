import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "email-campaign-tool-api", timestamp: new Date().toISOString() });
});
