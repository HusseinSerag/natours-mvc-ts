import express, { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.sendStatus(200));
router.post("/", (req, res) => res.sendStatus(201));

export default router;
