import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//Connects to the MongoDB database.
//Depending on the NODE_ENV environment variable, it connects to either a local MongoDB Compass or MongoDB Atlas.
export const connectDB = async () => {
  const dbUrl =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_DB_URL
      : process.env.ATLAS_DB_URL;
  const dbType = process.env.NODE_ENV === "development" ? "Local" : "Atlas";
  try {
    await mongoose.connect(dbUrl);
    console.log(chalk.yellow.bold(`Connected to ${dbType} database`));
  } catch (error) {
    console.log(chalk.red.bold(`Error connecting to ${dbType} database`));
    console.log(chalk.red(error));
    process.exit(1); // Exit the application with a failure code
  }
};
