import 'dotenv/config';
import { EnvConfig } from './types.conf';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3829);
const isDev = process.env.NODE_ENV === 'development';
const DATABASE_URL = process.env.DATABASE_URL ?? '';

const env: EnvConfig = {
    HOST,
    PORT,
    isDev,
    DATABASE_URL,
}

export default env