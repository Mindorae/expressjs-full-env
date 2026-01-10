import 'dotenv/config';
import type { EnvConfig } from './types.conf.js';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3829);
const isDev = process.env.NODE_ENV === 'development';
const DATABASE_URL = process.env.DATABASE_URL ?? '';

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    LIMIT_REQUESTS: 429,

    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export type HttpStatusMap = typeof HTTP_STATUS;

const env: EnvConfig = {
    HOST,
    PORT,
    isDev,
    DATABASE_URL,
    HTTP_STATUS,
}

export default env