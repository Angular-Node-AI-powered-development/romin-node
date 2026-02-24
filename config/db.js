const { Pool } = require('pg');
const path = require('path');

// Load config from project root (config package uses NODE_CONFIG or defaults)
let dbConfig = {};
try {
  const config = require('config');
  dbConfig = config.has('db') ? config.get('db') : {};
} catch (_) {
  // config not available, use env only
}

const pool = new Pool({
  host: process.env.PGHOST || dbConfig.host || 'localhost',
  port: parseInt(process.env.PGPORT || dbConfig.port || '5432', 10),
  database: process.env.PGDATABASE || dbConfig.database || 'romin_db',
  user: process.env.PGUSER || dbConfig.user || 'postgres',
  password: process.env.PGPASSWORD || dbConfig.password || '',
  max: dbConfig.max ?? 20,
  idleTimeoutMillis: dbConfig.idleTimeoutMillis ?? 30000,
  connectionTimeoutMillis: dbConfig.connectionTimeoutMillis ?? 2000,
});

async function connect() {
  const client = await pool.connect();
  client.release();
  return pool;
}

async function close() {
  await pool.end();
}

module.exports = { pool, connect, close };
