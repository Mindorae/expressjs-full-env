import { RequestHandler } from "express";
import i18nConf from "../config/i18n.conf";
import { Request, Response, NextFunction } from "express";

const { i18next, middleware } = i18nConf;

const i18nExpressMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    middleware.handle(i18next)(req as any, res as any, () => {
        const explicit = (req.query.lang as string) || req.header('X-Local');
        const userPref = (req as any).user?.locale;
        const chosen = explicit ?? userPref ?? req.language ?? i18next.options.fallbackLng?.toString();

        req.language = chosen;
        (req as any).t = i18next.getFixedT(chosen);
        res.locals.t = (req as any).t;

        res.setHeader("X-Request-Language", chosen as string);

        next();
    });
};

export default i18nExpressMiddleware;