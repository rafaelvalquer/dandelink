import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { ensureUploadsDir, uploadsRoot } from "./config/uploads.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import healthRoutes from "./routes/health.routes.js";
import myPageRoutes from "./routes/myPage.routes.js";

function isDevLoopbackOrigin(origin) {
  try {
    const url = new URL(origin);
    const isHttp = url.protocol === "http:";
    const isLoopbackHost =
      url.hostname === "localhost" || url.hostname === "127.0.0.1";

    return isHttp && isLoopbackHost;
  } catch {
    return false;
  }
}

export function createApp() {
  const app = express();
  ensureUploadsDir();

  const allowlist = String(env.corsOrigin || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const corsOptions = {
    origin(origin, callback) {
      const isDevelopment = env.nodeEnv === "development";
      const isAllowedLoopback =
        isDevelopment && origin && isDevLoopbackOrigin(origin);

      if (
        !origin ||
        allowlist.length === 0 ||
        allowlist.includes(origin) ||
        isAllowedLoopback
      ) {
        return callback(null, true);
      }

      const error = new Error(`CORS bloqueado para a origem: ${origin}`);
      error.status = 403;
      return callback(error);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use("/uploads", express.static(uploadsRoot));

  app.use("/api", healthRoutes);
  app.use("/api", myPageRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
