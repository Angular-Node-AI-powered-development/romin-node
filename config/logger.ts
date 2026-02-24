import winston from 'winston';
import path from 'path';
import config from 'config';

interface LoggerConfig {
  level: string;
  dir: string;
}

let loggerConfig: LoggerConfig = { level: 'info', dir: 'logs' };
try {
  if (config.has('logger')) loggerConfig = config.get('logger') as LoggerConfig;
} catch {
  // use defaults
}

const logDir = path.isAbsolute(loggerConfig.dir)
  ? loggerConfig.dir
  : path.join(process.cwd(), loggerConfig.dir);
const level = process.env.LOG_LEVEL ?? loggerConfig.level ?? 'info';

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

export default logger;
