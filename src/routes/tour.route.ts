import express, { Router } from "express";
import { getAllToursHandler } from "../controllers/tour.controller";

const router = Router();

router.get("/", getAllToursHandler);
router.post("/", (req, res) => res.sendStatus(201));

export default router;
