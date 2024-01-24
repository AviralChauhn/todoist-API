const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, colorize } = format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});
const logger = createLogger({
  transports: [
    new transports.File({
      filename: "logs.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
});
const logConsole = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [new transports.Console()],
});
module.exports = { logger, logConsole };
