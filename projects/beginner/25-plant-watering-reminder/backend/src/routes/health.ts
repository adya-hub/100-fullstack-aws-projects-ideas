import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "plant-watering-reminder-api", timestamp: new Date().toISOString() });
});
