import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import env from "./constants.conf";

const { isDev } = env;

const logDir = join(process.cwd(), 'logs');
if (!existsSync(logDir)) mkdirSync(logDir);

const fileFormat = format.combine(
    format.timestamp(),
    format.json()
);

const consoleFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} [${level}]: ${message} ${metaString}`;
    }),
);


const dailyRotateError = new transports.DailyRotateFile({
    level: 'error',
    filename: join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    format: fileFormat,
});

const dailyRotateCombined = new transports.DailyRotateFile({
    filename: join(logDir, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    zippedArchive: true,
    format: fileFormat,
});

const activeTransports = [
    !isDev ? dailyRotateError : null,
    !isDev ? dailyRotateCombined : null,
    new transports.Console({
        format: consoleFormat,
    }),
].filter(Boolean) as transports.StreamTransportInstance[];

const logger = createLogger({
    level: isDev ? "debug" : "info",
    transports: activeTransports,
    exceptionHandlers: [
        new transports.File({
            filename: join(logDir, "exceptions.log"),
            format: fileFormat,
        }),
    ],
    rejectionHandlers: [
        new transports.File({
            filename: join(logDir, "rejections.log"),
            format: fileFormat,
        }),
    ],
    exitOnError: false,
});


export default logger;