import fs from "fs";
import moment from "moment";

//Get default status message based on HTTP status code.
function getDefaultStatusMessage(statusCode) {
  const statusMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
  };
  return statusMessages[statusCode] || "Unknown Status";
}

//Middleware to log HTTP requests and responses.
//Logs details of requests that result errors into a file named with the current date.
export const loggerRequest = (req, res, next) => {
  if (req.url === "/favicon.ico") {
    return next();
  }
  const fileName = "logger_" + moment().format("YYYY_MM_DD"); // File name based on the current date
  let fileContent = "";

  // Event listener for when the response has been sent
  res.on("finish", () => {
    if (
      req.url.endsWith(".jpg") ||
      req.url.endsWith(".png") ||
      req.url.endsWith(".css") ||
      req.url.endsWith(".js")
    ) {
      return;
    }
    if (res.statusCode < 400) {
      return;
    }
    // Get the status message
    const statusMessage =
      res.statusMessage || getDefaultStatusMessage(res.statusCode);

    // Build the log content
    fileContent += `Time: ${moment().format("DD/MM/YYYY HH:mm:ss")}\n`;
    fileContent += `Status: ${res.statusCode} ${statusMessage}\n`;
    fileContent += `Method: ${req.method}\n`;
    fileContent += `Route: ${req.url}\n`;

    //logs directory
    fs.mkdirSync("./logs", { recursive: true });

    // Append the log content to the file for the current date
    fs.appendFile(`./logs/${fileName}.txt`, fileContent + "\n", (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  });
  next();
};
