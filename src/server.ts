import type { Express, Request, Response } from "express";
import e from 'express';
import morgan from "morgan";
import { sendSuccess } from "./utils/errors/message.js";
import { globalError, routerError } from "./utils/errors/index.js";
import logger from "./config/logger.conf.js";
import i18nExpressMiddleware from './middlewares/i18n.middleware.js';
import env from "./config/constants.conf.js";

const app: Express = e();

app.use(e.json());
app.use(e.urlencoded());
app.use(morgan('dev'));
app.use(i18nExpressMiddleware);

app.get('/api/health', (req: Request, res: Response) => {
    return sendSuccess(
        req,
        res,
        'SUCCESS',
        undefined,
        env.HTTP_STATUS.OK
    )
});

app.use(globalError);
app.use(routerError);

app.listen(env.PORT, env.HOST, () => {
    logger.debug(`Server running on http://${env.HOST}:${env.PORT}`)
    console.log(`Server running on http://${env.HOST}:${env.PORT}`)
});