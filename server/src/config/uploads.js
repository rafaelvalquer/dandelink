import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadsRoot = path.resolve(__dirname, "../../uploads");
export const avatarUploadsDir = path.join(uploadsRoot, "avatars");

export function ensureUploadsDir() {
  fs.mkdirSync(avatarUploadsDir, { recursive: true });
}
