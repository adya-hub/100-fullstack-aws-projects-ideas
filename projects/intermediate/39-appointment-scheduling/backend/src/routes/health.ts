import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "appointment-scheduling-api", timestamp: new Date().toISOString() });
});
