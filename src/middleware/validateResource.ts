import { query, type NextFunction, type Request, type Response } from "express";

import * as z from "zod";

export function validateRequest(schema: z.AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (e) {
      return res.status(400).json({
        status: "error",
        error: e,
      });
    }
  };
}
