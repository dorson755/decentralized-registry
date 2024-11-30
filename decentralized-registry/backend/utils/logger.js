const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require('winston-daily-rotate-file'); // Import daily rotate transport

// Define a custom log format to include metadata
const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
    // Check if there are metadata and format it accordingly
    const metadataString = Object.keys(metadata).length ? `\n${JSON.stringify(metadata, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${metadataString}`;
});

// Define log levels and colors
const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'grey'
    }
};

// Create the logger instance
const logger = createLogger({
    level: 'info', // Set the default logging level
    levels: logLevels.levels, // Use the defined log levels
    format: combine(
        timestamp(), // Adds timestamp to logs
        colorize(), // Colorizes output for readability
        customFormat  // Use the custom format
    ),
    transports: [
        new transports.Console(), // Logs to the console

        // Rotate logs daily, keeping a maximum of 7 days of logs
        new DailyRotateFile({
            filename: 'logs/api-%DATE%.log', // Log filename pattern
            datePattern: 'YYYY-MM-DD', // Daily rotation
            maxSize: '20m', // Rotate if log file size exceeds 20MB
            maxFiles: '7d', // Keep logs for 7 days
            level: 'info', // Set the minimum level of logs to store in files
        }),
    ],
});

// Add custom colors to the logger
require('winston').addColors(logLevels.colors);

module.exports = logger;
