import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as healthController from './health.controller.js';
import { validateGetHealth } from './health.validation.js';

const router = Router();

router.get('/', validateGetHealth, asyncHandler(healthController.getHealth));
router.get('/ping', validateGetHealth, asyncHandler(healthController.getHealth));

export default router;
