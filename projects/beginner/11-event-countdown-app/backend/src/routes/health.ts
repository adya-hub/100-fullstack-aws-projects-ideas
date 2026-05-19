import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "event-countdown-app-api", timestamp: new Date().toISOString() });
});
