import type { NextFunction, Request, Response } from "express";
import type { HttpStatusCode, HttpStatusMap } from "./constants.conf.js";

export interface EnvConfig {
    HOST: string;
    PORT: number;
    isDev: boolean;
    DATABASE_URL: string;
    HTTP_STATUS: HttpStatusMap;
};

export interface IGlobalError {
    statusCode?: HttpStatusCode;
    message: string;
    data: string[];
}

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export interface IUser {
    id: string;
    role?: string;
    jti: string;
}