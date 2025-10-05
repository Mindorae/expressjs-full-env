import { NextFunction, Request, Response } from "express";
import { HttpStatusCode, HttpStatusMap } from "./constants.conf";

interface EnvConfig {
    HOST: string;
    PORT: number;
    isDev: boolean;
    DATABASE_URL: string;
    HTTP_STATUS: HttpStatusMap;
};

interface IGlobalError {
    statusCode: HttpStatusCode;
    message: string;
    data: string[];
}

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export {
    EnvConfig,
    IGlobalError,
    AsyncHandler
}