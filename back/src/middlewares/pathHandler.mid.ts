import { Request, Response, NextFunction } from "express";

import HTTP_STATUS from '../constants/httpStatusCodes';

export function pathHandler(req: Request, res: Response, next: NextFunction) {

    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: req.method + " " + req.url + " " + "ENDPOINT NOT FOUND."
    });
}