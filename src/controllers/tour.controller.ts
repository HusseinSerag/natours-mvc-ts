import { type Request, type Response } from "express";
import mongoose from "mongoose";
import Tour from "../models/tour.model";
import { log } from "../utils/logger";
import { getAllTours } from "../services/tour.service";
import { FindAllToursType } from "../schemas/tour.schema";

async function getAllToursHandler(
  req: Request<{}, {}, {}, FindAllToursType["query"]>,
  res: Response
) {
  try {
    const tours = await getAllTours(req.query);
    log.info("Tours successfully queried!");

    return res.status(200).json({
      status: "success",
      count: tours.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    log.error("An error occured! " + e);
    return res.status(500).json({
      status: "failure",
    });
  }
}

export { getAllToursHandler };
