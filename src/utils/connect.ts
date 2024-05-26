import mongoose from "mongoose";
import { log } from "./logger";

export default function connect() {
  const dbURI = process.env.DBURI!.replace("<PASSWORD>", process.env.PASSWORD!);

  return mongoose
    .connect(dbURI)
    .then(() => {
      log.info("DB connected!");
    })
    .catch((error) => log.error("Couldn't connected to DB"));
}
