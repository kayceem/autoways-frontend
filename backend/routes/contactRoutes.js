import express from 'express';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

/**
 * POST /api/contact
 * Contact form submission endpoint - sends email using environment variables
 *
 * Request body:
 * {
 *   "name": "string (required)",
 *   "email": "string (required)",
 *   "phone": "string (required)",
 *   "subject": "string (required)",
 *   "message": "string (optional)"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "message": "Contact form submitted successfully. We will get back to you soon."
 * }
 */
router.post('/', submitContactForm);

export default router;
