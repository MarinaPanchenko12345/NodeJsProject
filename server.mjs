import express from "express";
import dotenv from "dotenv";
import { loggerConsole } from "./middlewares/loggerConsole.mjs";
import { loggerRequest } from "./middlewares/loggerRequest.mjs";
import { corsMiddleware } from "./middlewares/cors.mjs";
import { handleError } from "./utils/handleErrors.mjs";
import { connectDB } from "./helpers/db.helper.mjs";
import chalk from "chalk";
import router from "./routes/router.mjs";
import { initializeData } from "./initial-data/initial-data.service.mjs";
import { handleError404 } from "./utils/htmlError404.mjs";

dotenv.config();

connectDB();

export const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(loggerConsole);
app.use(loggerRequest);
app.use(corsMiddleware);
app.use(router);

initializeData();
handleError404(app);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});
app.listen(process.env.PORT, async () => {
  console.log(chalk.blue.bold("listening on port 9898"));
});
