import e, { Express, Request, Response } from "express";
import morgan from "morgan";
import env from "./src/config/constants.conf";
import { sendSuccess } from "./src/utils/errors/message";
import { globalError, routerError } from "./src/utils/errors";

const app: Express = e();

app.use(e.json());
app.use(e.urlencoded());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
    return sendSuccess(
        res,
        'Server running successfully!',
        undefined,
        env.HTTP_STATUS.OK
    )
});

app.use(globalError);
app.use(routerError);

app.listen(env.PORT, env.HOST, () => {
    console.log(`Server running on http://${env.HOST}:${env.PORT}`);
});