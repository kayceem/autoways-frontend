const fs = require('fs');
const path = require('path');
const readline = require('readline');
const logger = require('../utils/logger');

const logsDir = path.join(__dirname, '..', 'logs');

/**
 * Get list of available log files
 */
const getLogFiles = async (req, res) => {
  try {
    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
      return res.json({
        success: true,
        data: []
      });
    }

    const files = fs.readdirSync(logsDir)
      .filter(file => file.endsWith('.log') || file.endsWith('.log.gz'))
      .map(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          modified: stats.mtime,
          type: file.includes('error') ? 'error' : 'application'
        };
      })
      .sort((a, b) => new Date(b.modified) - new Date(a.modified));

    res.json({
      success: true,
      data: files
    });
  } catch (error) {
    logger.error('Error getting log files:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get log files'
    });
  }
};

/**
 * Get logs from a specific file with pagination and filtering
 */
const getLogs = async (req, res) => {
  try {
    const {
      file,
      level,
      search,
      limit = 100,
      offset = 0,
      startDate,
      endDate
    } = req.query;

    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
      return res.json({
        success: true,
        data: [],
        total: 0
      });
    }

    // Default to most recent application log if no file specified
    let logFile = file;
    if (!logFile) {
      const files = fs.readdirSync(logsDir)
        .filter(f => f.startsWith('application-') && f.endsWith('.log'))
        .sort()
        .reverse();
      logFile = files[0];
    }

    if (!logFile) {
      return res.json({
        success: true,
        data: [],
        total: 0
      });
    }

    const filePath = path.join(logsDir, logFile);

    // Security check - ensure file is within logs directory
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(logsDir))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file path'
      });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'Log file not found'
      });
    }

    // Read and parse log file
    const logs = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (!line.trim()) continue;

      try {
        const logEntry = JSON.parse(line);

        // Apply filters
        if (level && logEntry.level !== level) continue;

        if (search) {
          const searchLower = search.toLowerCase();
          const messageMatch = logEntry.message?.toLowerCase().includes(searchLower);
          const jsonMatch = JSON.stringify(logEntry).toLowerCase().includes(searchLower);
          if (!messageMatch && !jsonMatch) continue;
        }

        if (startDate) {
          const logDate = new Date(logEntry.timestamp);
          if (logDate < new Date(startDate)) continue;
        }

        if (endDate) {
          const logDate = new Date(logEntry.timestamp);
          if (logDate > new Date(endDate)) continue;
        }

        logs.push(logEntry);
      } catch (e) {
        // If line is not valid JSON, add as raw text
        logs.push({
          timestamp: null,
          level: 'raw',
          message: line
        });
      }
    }

    // Sort by timestamp descending (newest first)
    logs.sort((a, b) => {
      if (!a.timestamp) return 1;
      if (!b.timestamp) return -1;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    // Apply pagination
    const total = logs.length;
    const paginatedLogs = logs.slice(Number(offset), Number(offset) + Number(limit));

    res.json({
      success: true,
      data: paginatedLogs,
      total,
      file: logFile,
      pagination: {
        limit: Number(limit),
        offset: Number(offset),
        hasMore: Number(offset) + Number(limit) < total
      }
    });
  } catch (error) {
    logger.error('Error reading logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to read logs'
    });
  }
};

/**
 * Get log statistics
 */
const getLogStats = async (req, res) => {
  try {
    if (!fs.existsSync(logsDir)) {
      return res.json({
        success: true,
        data: {
          totalFiles: 0,
          totalSize: 0,
          errorCount: 0,
          levels: {}
        }
      });
    }

    const files = fs.readdirSync(logsDir)
      .filter(file => file.endsWith('.log') || file.endsWith('.log.gz'));

    let totalSize = 0;
    let errorCount = 0;
    const levels = {};

    for (const file of files) {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;

      // Only parse non-gzipped log files for stats
      if (file.endsWith('.log')) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const lines = content.split('\n').filter(line => line.trim());

          for (const line of lines) {
            try {
              const entry = JSON.parse(line);
              if (entry.level) {
                levels[entry.level] = (levels[entry.level] || 0) + 1;
                if (entry.level === 'error') errorCount++;
              }
            } catch (e) {
              // Skip non-JSON lines
            }
          }
        } catch (e) {
          // Skip files that can't be read
        }
      }
    }

    res.json({
      success: true,
      data: {
        totalFiles: files.length,
        totalSize,
        errorCount,
        levels
      }
    });
  } catch (error) {
    logger.error('Error getting log stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get log statistics'
    });
  }
};

/**
 * Clear old log files (keep last N days)
 */
const clearOldLogs = async (req, res) => {
  try {
    const { daysToKeep = 7 } = req.body;

    if (!fs.existsSync(logsDir)) {
      return res.json({
        success: true,
        message: 'No logs to clear',
        deletedCount: 0
      });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const files = fs.readdirSync(logsDir)
      .filter(file => file.endsWith('.log') || file.endsWith('.log.gz'));

    let deletedCount = 0;
    const deletedFiles = [];

    for (const file of files) {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);

      if (stats.mtime < cutoffDate) {
        fs.unlinkSync(filePath);
        deletedCount++;
        deletedFiles.push(file);
      }
    }

    logger.info(`Cleared ${deletedCount} old log files`, { deletedFiles });

    res.json({
      success: true,
      message: `Deleted ${deletedCount} log files older than ${daysToKeep} days`,
      deletedCount,
      deletedFiles
    });
  } catch (error) {
    logger.error('Error clearing old logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear old logs'
    });
  }
};

module.exports = {
  getLogFiles,
  getLogs,
  getLogStats,
  clearOldLogs
};
