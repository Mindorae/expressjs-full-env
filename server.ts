import e, { Express, Request, Response } from "express";
import morgan from "morgan";
import env from "./src/config/constants.conf";
import { sendSuccess } from "./src/utils/errors/message";
import { globalError, routerError } from "./src/utils/errors";
import logger from "./src/config/logger.conf";
import i18nExpressMiddleware from './src/middlewares/i18n.middleware';

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
});