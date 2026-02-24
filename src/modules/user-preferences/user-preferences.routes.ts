import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as controller from './user-preferences.controller.js';
import { validateUpsert } from './user-preferences.validation.js';

const router = Router();

router.get('/', asyncHandler(controller.get));
router.put('/', validateUpsert, asyncHandler(controller.upsert));

export default router;
