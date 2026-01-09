import type { Request, Response } from "express";
import env from "../../config/constants.conf.js";
import type { HttpStatusCode } from "../../config/constants.conf.js";

const { isDev } = env;

const tMessage = (req: Request, res: Response, messageKey: string, vars?: Record<string, any> | undefined) => {
    const t = (req as any).t ?? (res.locals.t as any) ?? ((k: string) => k);
    const message = typeof messageKey === "string" ? t(messageKey, vars ?? {}) : String(messageKey);
    return message;
};

export const sendSuccess = (
    req: Request,
    res: Response,
    messageKey: string,
    data: any | undefined = undefined,
    statusCode: HttpStatusCode,
    vars: Record<string, any> | undefined = undefined,
) =>
    res.status(statusCode).json({
        success: true,
        message: tMessage(req, res, messageKey, vars),
        data,
    });

export const sendError = (
    req: Request,
    res: Response,
    messageKey: string,
    errorCode: string = "NETWORK_ERR",
    statusCode: HttpStatusCode,
    errors: string[] = [],
    vars: Record<string, any> | undefined = undefined,
) =>
    res.status(statusCode).json({
        success: false,
        message: tMessage(req, res, messageKey, vars),
        errorCode,
        ...(isDev && errors.length ? { errors } : {}),
    });
