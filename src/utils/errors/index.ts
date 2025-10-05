import { NextFunction, Request, Response } from "express";
import env, { HttpStatusCode } from "../../config/constants.conf";
import { sendError } from "./message";
import { AsyncHandler, IGlobalError } from "../../config/types.conf";

const { isDev, HTTP_STATUS } = env;

const asyncError = (asyncFn: AsyncHandler) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(asyncFn(req, res, next)).catch(next);


const globalError = (error: IGlobalError, req: Request, res: Response, next: NextFunction) => {
    const statusCode: HttpStatusCode = error.statusCode ?? HTTP_STATUS.BAD_REQUEST;
    const message: string = error.message ?? 'Network error, try again later.';
    const data: string[] | undefined = error.data ?? undefined;

    if (isDev) {
        console.error('GlobalError:', { error, url: req.originalUrl });
    }
    return sendError(res, message, 'NETWORK_ERR', statusCode, data);
};

const routerError = (req: Request, res: Response, next: NextFunction) =>
    sendError(
        res,
        isDev ? `Route Not Found: ${req.method} ${req.originalUrl}` : 'Resource not found',
        'NOT_FOUND',
        HTTP_STATUS.NOT_FOUND,
        [`${req.method} ${req.originalUrl}`],
    );

export {
    asyncError,
    globalError,
    routerError
}