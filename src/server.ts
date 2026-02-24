import 'dotenv/config';
import app from './app.js';
import { connect, close } from '../config/db.js';
import logger from '../config/logger.js';
import config from 'config';

let server: ReturnType<typeof app.listen> | undefined;

function getPort(): number {
  if (process.env.PORT) return parseInt(process.env.PORT, 10);
  try {
    return (config.get('server.port') as number) ?? 3000;
  } catch {
    return 3000;
  }
}

async function start(): Promise<void> {
  const port = getPort();
  try {
    await connect();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn('DB connect failed at startup; app will run without DB', { err: message });
  }
  server = app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

async function shutdown(signal: string): Promise<void> {
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
