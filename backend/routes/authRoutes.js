import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Login endpoint - validates credentials against environment variables
 *
 * Request body:
 * {
 *   "username": "string",
 *   "password": "string"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "token": "jwt-token-string"
 * }
 */
router.post('/login', login);

export default router;
