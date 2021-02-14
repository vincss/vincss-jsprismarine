import { Logger, createLogger, format, transports } from 'winston';

import fs from 'fs';
import mcColors from 'mccolorstoconsole';
import path from 'path';

const { combine, timestamp, printf } = format;

export default class LoggerBuilder {
    public static logFile: string;
    private readonly logger: Logger;

    public constructor() {
        const date = new Date();
        if (!LoggerBuilder.logFile)
            // mmddyyyy-hh-mm-ss. yes American-style, sue me.
            LoggerBuilder.logFile = `jsprismarine.${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date
                .getFullYear()
                .toString()
                .padStart(2, '0')}-${date
                .getHours()
                .toString()
                .padStart(2, '0')}${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}.log`;

        this.logger = createLogger({
            transports: [
                new transports.Console({
                    level: /* Process.env.NODE_ENV !== 'development' && */ (global as any).log_level || 'info', // || 'silly',
                    format: combine(
                        timestamp({ format: 'HH:mm:ss.SS' }),
                        format((info) => {
                            info.level = info.level.toUpperCase();
                            return info;
                        })(),
                        format.colorize(),
                        format.simple(),
                        printf(({ level, message, timestamp, namespace }) => {
                            return `[${timestamp} ${level}${mcColors.minecraftToConsole(
                                `${
                                    namespace &&
                                    ((global as any).log_level === 'silly' || (global as any).log_level === 'debug')
                                        ? ` ${namespace}]`
                                        : ']'
                                }: ${message}`
                            )}`;
                        })
                    )
                }),
                new transports.File({
                    level: 'silly',
                    filename: path.join(process.cwd(), 'logs', `${LoggerBuilder.logFile}`),
                    format: combine(
                        timestamp({ format: 'HH:mm:ss' }),
                        format.simple(),
                        printf(({ level, message, timestamp, namespace }: any) => {
                            return `[${timestamp}] [${level}]${mcColors.minecraftToConsole(
                                `${namespace ? ` [${namespace}]` : ''}: ${message}`
                            )}`.replace(
                                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                                ''
                            );
                        })
                    )
                })
            ]
        });
    }

    public getLog(): string | undefined {
        try {
            return fs.readFileSync(path.join(process.cwd(), 'logs', LoggerBuilder.logFile), 'utf-8');
        } catch {
            return undefined;
        }
    }

    /**
     * Log information messages
     * @param message
     */
    public info = (message: string, namespace?: string) => {
        this.logger.log('info', message, {
            namespace
        });
    };

    /**
     * Log warning messages
     * @param message
     */
    public warn = (message: string, namespace?: string) => {
        this.logger.log('warn', message, {
            namespace
        });
    };

    /**
     * Log error messages
     * @param message
     */
    public error = (message: string, namespace?: string) => {
        this.logger.log('error', message, {
            namespace
        });
    };

    /**
     * Log debug messages
     * @param message
     */
    public debug = (message: string, namespace?: string) => {
        this.logger.log('debug', message, {
            namespace
        });
    };

    /**
     * Log silly messages
     * @param message
     */
    public silly = (message: string, namespace?: string) => {
        this.logger.log('silly', message, {
            namespace
        });
    };
}
