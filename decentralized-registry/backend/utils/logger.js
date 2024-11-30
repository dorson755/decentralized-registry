const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

// Create the logger instance
const logger = createLogger({
    level: 'info', //I just set the default logging level
    format: combine(
        timestamp(),
        colorize(), // Colorize output for readability
        customFormat
    ),
    transports: [
        new transports.Console(), // Logs to the console
        new transports.File({ filename: 'logs/api.log' }) // Logs to a file
    ]
});

module.exports = logger;
