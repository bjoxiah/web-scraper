import express, { Request, Response } from "express";
import controller from "../controllers/scraper.controller";
import {postData as validate} from "../util/validator";

const router = express.Router();

router.get("/", controller.index);

router.post("/", validate, controller.scrapeWeb);


export = router;