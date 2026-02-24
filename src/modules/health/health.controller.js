const healthService = require('./health.service');

async function getHealth(req, res) {
  const payload = await healthService.getHealth();
  res.json(payload);
}

module.exports = { getHealth };
