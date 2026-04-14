import { env } from "../config/env.js";

export function errorHandler(error, _req, res, _next) {
  if (error?.name === "MulterError" && error?.code === "LIMIT_FILE_SIZE") {
    error.status = 400;
    error.message = "A imagem deve ter no maximo 5 MB.";
    error.code = "AVATAR_TOO_LARGE";
  }

  const status = Number(error?.status || error?.statusCode) || 500;
  const payload = {
    ok: false,
    error: error?.message || "Erro interno do servidor.",
  };

  if (error?.code) {
    payload.code = error.code;
  }

  if (env.nodeEnv !== "production") {
    console.error(error);

    if (error?.details) {
      payload.details = error.details;
    }
  }

  res.status(status).json(payload);
}
