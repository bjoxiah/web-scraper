import {Request, Response} from "express";
import { websites } from "../util/websites";
import { validationResult } from 'express-validator';
import { Scrape } from "../services/puppeteer.service";

const scrapeWeb = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('index', { websites, errors: errors.array(), scraped: null });
    }
    const data = await Scrape(req.body.link, req.body.newspaper);
    if (data)
        res.render('index', { websites, errors: [], scraped: data });

    res.render('index', { websites, errors: ["An error occurred!"], scraped: null });
}

const index = (req: Request, res: Response) => {
    res.render('index', { websites, errors: [], scraped: null });
}


export = {
    scrapeWeb,
    index
};