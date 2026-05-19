import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { healthRouter } from "./routes/health";
import { authRouter } from "./routes/auth";
import { expensesRouter } from "./routes/expenses";
import { errorHandler } from "./middleware/error-handler";
import { requireAuth } from "./middleware/auth";
import { initDb } from "./db/pool";
import { logger } from "./lib/logger";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/api/v1/expenses", requireAuth, expensesRouter);

app.use(errorHandler);

initDb()
  .then(() => {
    app.listen(port, () => logger.info({ port }, "Expense Tracker API ready"));
  })
  .catch((err) => {
    logger.error(err, "Database initialization failed");
    process.exit(1);
  });
