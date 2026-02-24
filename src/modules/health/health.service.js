const { pool } = require('../../../config/db');

async function getHealth() {
  const timestamp = new Date().toISOString();
  let db = 'unknown';
  try {
    const client = await pool.connect();
    client.release();
    db = 'connected';
  } catch (_) {
    db = 'disconnected';
  }
  return { status: 'ok', timestamp, db };
}

module.exports = { getHealth };
