import e, { Express, Request, Response } from "express";
import morgan from "morgan";
import env from "./src/config/constants.conf";


const app: Express = e();

app.use(e.json());
app.use(e.urlencoded());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Server running successfully!', success: true, ip: req.ip });
});

app.listen(env.PORT, env.HOST, () => {
    console.log(`Server running on http://${env.HOST}:${env.PORT}`);
});