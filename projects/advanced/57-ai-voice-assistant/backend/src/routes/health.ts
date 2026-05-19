import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "ai-voice-assistant-api", timestamp: new Date().toISOString() });
});
