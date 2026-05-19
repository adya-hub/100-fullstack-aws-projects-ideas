import { Router } from "express";
import { requireAuth } from "../middleware/auth";

export const apiRouter = Router();

apiRouter.use(requireAuth);

apiRouter.get("/dashboard", (_req, res) => {
  res.json({
    project: "Appointment Scheduling SaaS",
    metrics: {
      activeUsers: 1284,
      revenue: 48230,
      growth: 12.4,
    },
  });
});
