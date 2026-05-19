import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "todo-app-with-teams-api", timestamp: new Date().toISOString() });
});
