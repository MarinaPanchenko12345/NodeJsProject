import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для отправки страницы аутентификации
export const sendAuthPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "googleAuth.html"));
};

// Функция для отправки защищенной страницы
export const sendProtectedPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "googleProtected.html"));
};
