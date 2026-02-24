import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as controller from './time-entries.controller.js';
import {
  validateList,
  validateCreate,
  validateUpdate,
  validateIdParam,
} from './time-entries.validation.js';

const router = Router();

router.get('/', validateList, asyncHandler(controller.list));
router.get('/:id', validateIdParam, asyncHandler(controller.getOne));
router.post('/', validateCreate, asyncHandler(controller.create));
router.patch('/:id', validateUpdate, asyncHandler(controller.update));
router.delete('/:id', validateIdParam, asyncHandler(controller.remove));
router.post('/:id/duplicate', validateIdParam, asyncHandler(controller.duplicate));

export default router;
