const express = require('express');
const { submitContactForm } = require('../controllers/contactController.js');

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

module.exports = router;
