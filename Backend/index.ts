
import app from "./src/app";
import {AppDataSource}  from "./src/db";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("DB connect");
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.error(error);
  }
}

main();