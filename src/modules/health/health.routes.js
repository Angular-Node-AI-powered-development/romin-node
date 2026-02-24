const express = require('express');
const { asyncHandler } = require('../../utils/asyncHandler');
const healthController = require('./health.controller');
const { validateGetHealth } = require('./health.validation');

const router = express.Router();

router.get('/', validateGetHealth, asyncHandler(healthController.getHealth));
router.get('/ping', validateGetHealth, asyncHandler(healthController.getHealth));

module.exports = router;
