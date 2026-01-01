const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getLogFiles,
  getLogs,
  getLogStats,
  clearOldLogs
} = require('../controllers/logsController.js');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

/**
 * GET /api/logs/files
 * Get list of available log files
 */
router.get('/files', getLogFiles);

/**
 * GET /api/logs
 * Get logs with optional filtering
 *
 * Query params:
 * - file: specific log file name
 * - level: filter by log level (info, error, warn, debug)
 * - search: search in log messages
 * - limit: number of logs to return (default 100)
 * - offset: pagination offset
 * - startDate: filter logs after this date
 * - endDate: filter logs before this date
 */
router.get('/', getLogs);

/**
 * GET /api/logs/stats
 * Get log statistics
 */
router.get('/stats', getLogStats);

/**
 * POST /api/logs/clear
 * Clear old log files
 *
 * Request body:
 * {
 *   "daysToKeep": 7  // Keep logs from last N days
 * }
 */
router.post('/clear', clearOldLogs);

module.exports = router;
