import { type Express } from "express";
import healthCheckRouter from "./routes/healthcheck.route";
import tourRouter from "./routes/tour.route";
export function routes(app: Express) {
  app.use("/healthcheck", healthCheckRouter);
  app.use("/api/v1/tours", tourRouter);
}
