import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "event-booking-system-api", timestamp: new Date().toISOString() });
});
