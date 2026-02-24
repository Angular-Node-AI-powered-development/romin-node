const winston = require('winston');
const path = require('path');

let loggerConfig = { level: 'info', dir: 'logs' };
try {
  const config = require('config');
  if (config.has('logger')) loggerConfig = config.get('logger');
} catch (_) {}

const logDir = path.isAbsolute(loggerConfig.dir)
  ? loggerConfig.dir
  : path.join(process.cwd(), loggerConfig.dir);
const level = process.env.LOG_LEVEL || loggerConfig.level || 'info';

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'romin-node' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
    }),
  ],
});

module.exports = logger;
