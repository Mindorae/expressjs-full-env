import { Response } from "express";
import env from "../../config/constants.conf";
import  { HttpStatusCode } from "../../config/constants.conf";

const { isDev } = env;

export const sendSuccess = (
    res: Response,
    message: string,
    data: {} | undefined = undefined,
    statusCode: HttpStatusCode,
) => res.status(statusCode).json({
    success: true,
    message,
    data,
});

export const sendError = (
    res: Response,
    message: string,
    errorCode: string = 'NETWORK_ERR',
    statusCode: HttpStatusCode,
    errors: string[] = [],
) => res.status(statusCode).json({
    success: true,
    message,
    errorCode,
    ...(isDev && errors.length ? { errors } : {}),
});