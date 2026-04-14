import path from "path";
import multer from "multer";
import { avatarUploadsDir, ensureUploadsDir } from "../config/uploads.js";

ensureUploadsDir();

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, avatarUploadsDir);
  },
  filename(_req, file, callback) {
    const extension = path.extname(file.originalname || "").toLowerCase();
    const safeExtension = extension || ".png";
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `avatar-${uniqueSuffix}${safeExtension}`);
  },
});

function fileFilter(_req, file, callback) {
  if (String(file?.mimetype || "").startsWith("image/")) {
    callback(null, true);
    return;
  }

  const error = new Error("Envie apenas arquivos de imagem.");
  error.status = 400;
  error.code = "INVALID_AVATAR_FILE";
  callback(error);
}

export const uploadAvatarSingle = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("file");
