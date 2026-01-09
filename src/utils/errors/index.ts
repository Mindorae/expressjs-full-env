import type { NextFunction, Request, Response } from "express";
import env, { type HttpStatusCode } from "../../config/constants.conf.js";
import { sendError } from "./message.js";
import type { AsyncHandler, IGlobalError } from "../../config/types.conf.js";
import logger from "../../config/logger.conf.js";

const { isDev, HTTP_STATUS } = env;

const asyncError = (asyncFn: AsyncHandler) =>
    (req: Request, res: Response, next: NextFunction) =>
        Promise.resolve(asyncFn(req, res, next)).catch((err) => {
            logger.error("AsyncHandlerRejection", {
                message: err?.message ?? String(err),
                stack: err?.stack,
                route: `${req.method} ${req.originalUrl}`,
                ip: req.ip,
                user: req.user ? { id: (req.user as any).id } : undefined,
            });
            next(err);
        });

const globalError = (error: IGlobalError, req: Request, res: Response, next: NextFunction) => {
    const statusCode: HttpStatusCode = error.statusCode ?? HTTP_STATUS.BAD_REQUEST;
    const message: string = error.message ?? "Network error, try again later.";
    const data: string[] | undefined = error.data ?? undefined;

    logger.error("UnhandledError", {
        message,
        statusCode,
        stack: (error as any)?.stack,
        route: `${req.method} ${req.originalUrl}`,
        ip: req.ip,
        data,
        user: req.user ? { id: (req.user as any).id } : undefined,
    });

    if (isDev) {
        console.error("GlobalError:", { error, url: req.originalUrl });
    }

    return sendError(req, res, message, "NETWORK_ERR", statusCode, data);
};

const routerError = (req: Request, res: Response, next: NextFunction) => {
    const route = `${req.method} ${req.originalUrl}`;
    const message = isDev ? `Route Not Found: ${req.method} ${req.originalUrl}` : "Resource not found";
    const details = [route];

    logger.warn("RouteNotFound", {
        message,
        route,
        ip: req.ip,
        referer: req.get("referer"),
    });

    return sendError(req, res, 'ROUTE_NOT_FOUND', "NOT_FOUND", HTTP_STATUS.NOT_FOUND, details, { route });
};

export {
    asyncError,
    globalError,
    routerError
};
