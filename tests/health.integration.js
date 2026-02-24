/**
 * Placeholder integration test: GET /api/health.
 * Run with: node tests/health.integration.js
 * Ensure the server is running (npm run dev) first, or run from CI after starting the app.
 */
const http = require('http');

const port = process.env.PORT || 3000;
const path = '/api/health';

const req = http.get(`http://127.0.0.1:${port}${path}`, (res) => {
  let data = '';
  res.on('data', (ch) => (data += ch));
  res.on('end', () => {
    const ok = res.statusCode === 200;
    const body = JSON.parse(data);
    if (ok && body.status === 'ok') {
      console.log('health.integration.js: GET /api/health OK');
      process.exit(0);
    } else {
      console.error('health.integration.js: unexpected response', res.statusCode, body);
      process.exit(1);
    }
  });
});

req.on('error', (err) => {
  console.error('health.integration.js: request failed (is the server running?)', err.message);
  process.exit(1);
});

req.setTimeout(5000, () => {
  req.destroy();
  console.error('health.integration.js: timeout');
  process.exit(1);
});
