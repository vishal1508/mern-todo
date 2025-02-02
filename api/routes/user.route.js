import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/brcrypts.js';
import { loginSchema, validate } from '../utils/uservalidation.js';

const router = express.Router();

router.get('/test',test)
router.put('/update/:userId',validate(loginSchema),verifyToken,updateUser)

export default router;