import { Router } from "express";
export const healthRouter = Router();
healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", service: "file-storage-system-api", timestamp: new Date().toISOString() });
});
