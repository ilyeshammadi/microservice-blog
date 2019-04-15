const { createLogger, format, transports } = require('winston');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = {
        logger: createLogger({
            level: 'debug',
            format: format.combine(
                format.timestamp(),
                format.json(),
                format.prettyPrint(),
                format.colorize({ all: true }),
            ),
            transports: [
                new transports.Console()
            ]
        })
    }
} else {
    module.exports = {
        logger: createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new transports.Console()
            ]
        })
    }
}