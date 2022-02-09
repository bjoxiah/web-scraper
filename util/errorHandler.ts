import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import Logger from "./logger";

const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    // if (err) {
    //     // Logger.error(err.stack);
    // }
    res.status(500).end();
}

export = errorHandler;