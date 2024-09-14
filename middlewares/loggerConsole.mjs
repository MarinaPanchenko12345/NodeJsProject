import morgan from "morgan";
import chalk from "chalk";
import moment from "moment";

//Morgan logger middleware for logging HTTP requests to the console.
export const loggerConsole = morgan((tokens, req, res) => {
  const url = tokens.url(req, res);
  if (
    url.includes("code=") ||
    url.endsWith(".jpg") ||
    url.endsWith(".png") ||
    url.endsWith(".css") ||
    url.endsWith(".js")
  ) {
    return null; // Skip logging for these URLs
  }

  // Format the log output
  const status = tokens.status(req, res);
  return [
    chalk.cyan.bold(tokens.method(req, res)),
    chalk.cyan.bold(tokens.url(req, res)),
    status >= 200 && status < 400
      ? chalk.green.bold(tokens.status(req, res))
      : chalk.bgRed.bold(tokens.status(req, res)),
    chalk.grey.bold(moment().format("YYYY-MM-DD HH:mm")),
    chalk.bgBlack.bold(tokens["response-time"](req, res), "ms"),
  ].join(" ");
});
