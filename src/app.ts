import express from "express";
import { log } from "./utils/logger";
import connect from "./utils/connect";
import dotenv from "dotenv";
import path from "path";
import { routes } from "./routes";

dotenv.config({ path: path.resolve(__dirname, "./../config/config.env") });

const app = express();
app.use(express.json());

app.listen(process.env.PORT!, async () => {
  log.info(`Server has started! at localhost:${process.env.PORT!}`);
  await connect();
  routes(app);
});
