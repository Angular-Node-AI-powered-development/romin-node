const logger = require('../../config/logger');

const isOperational = (err) => {
  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) return true;
  if (err.isOperational === true) return true;
  return false;
};

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isOperational(err)) {
    logger.error({ err: err.message, stack: err.stack, url: req.originalUrl });
  } else {
    logger.warn({ err: err.message, statusCode, url: req.originalUrl });
  }

  res.status(statusCode).json({
    error: message,
    ...(isDev && err.stack ? { stack: err.stack } : {}),
  });
}

module.exports = errorHandler;
