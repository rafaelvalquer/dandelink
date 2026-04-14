import path from "path";
import { uploadsRoot } from "../config/uploads.js";

export async function uploadAvatarHandler(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error("Selecione uma imagem para continuar.");
      error.status = 400;
      error.code = "AVATAR_REQUIRED";
      throw error;
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const relativePath = path.relative(uploadsRoot, req.file.path).replace(/\\/g, "/");
    const url = `${baseUrl}/uploads/${relativePath}`;

    res.status(201).json({
      ok: true,
      url,
      message: "Avatar enviado com sucesso.",
    });
  } catch (error) {
    next(error);
  }
}
