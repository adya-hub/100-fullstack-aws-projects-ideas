import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth";
import { apiRouter } from "./routes/api";
import { errorHandler } from "./middleware/error-handler";
import { logger } from "./lib/logger";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/api/v1", apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  logger.info({ port }, "API server listening");
});
