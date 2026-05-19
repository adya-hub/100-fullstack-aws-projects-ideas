import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "social-media-app-api", timestamp: new Date().toISOString() });
});
