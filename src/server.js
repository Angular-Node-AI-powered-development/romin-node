require('dotenv').config();

const app = require('./app');
const { connect, close } = require('../config/db');
const logger = require('../config/logger');

let server;

function getPort() {
  if (process.env.PORT) return parseInt(process.env.PORT, 10);
  try {
    const config = require('config');
    return config.get('server.port') || 3000;
  } catch (_) {
    return 3000;
  }
}

async function start() {
  const port = getPort();
  try {
    await connect();
  } catch (err) {
    logger.warn('DB connect failed at startup; app will run without DB', { err: err.message });
  }
  server = app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

async function shutdown(signal) {
  logger.info(`${signal} received; shutting down`);
  if (server) {
    server.close(() => logger.info('HTTP server closed'));
  }
  await close();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start().catch((err) => {
  logger.error('Startup failed', err);
  process.exit(1);
});
