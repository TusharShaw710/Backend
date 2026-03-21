import express from 'express';
import { validateRegister } from '../middlewares/validation.js';
import { register } from '../controllers/auth.controller.js';


const router = express.Router();

// Register route
router.post('/register',validateRegister,register);

export default router;
