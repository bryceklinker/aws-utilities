import winston from 'winston';

export const logger = winston.createLogger({
    level: 'inf',
    transports: new winston.transports.Console(),
    format: winston.format.combine(
        winston.format.colorize()
    )
})
