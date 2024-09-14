import path from "path";
import { fileURLToPath } from "url";
import { handleError } from "./handleErrors.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to handle 404 errors for unmatched routes.
export const handleError404 = (app) => {
  app.all("*", (req, res) => {
    const acceptHeader = req.headers.accept || "";
    if (acceptHeader.includes("text/html")) {
      res.status(404).sendFile(path.join(__dirname, "../public", "404.html"));
    } else {
      handleError(res, 404, "Page not found!");
    }
  });
};
