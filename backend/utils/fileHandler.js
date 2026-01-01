const fs = require('fs/promises');
const path = require('path');
const logger = require('../utils/logger');

// ==================== CONSTANTS ====================
const DATA_FILE_PATH = path.join(__dirname, '..', 'assets', 'data.json');
const BASE_CHANGES_DIR = path.join(__dirname, '..', 'logs', 'data');

try {
    fs.mkdir(BASE_CHANGES_DIR, { recursive: true }).catch((err) => {
        logger.error('Error creating data changes directory:', err);
    });
    fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true }).catch((err) => {
        logger.error('Error creating data changes directory:', err);
    });
} catch (error) {
    logger.error('Error creating data changes directory:', error);
}

// Check if data.json exists
const checkDataFileExists = async () => {
    try {
        await fs.access(DATA_FILE_PATH);
        return true;
    } catch {
        return false;
    }
};

// Read data from data.json
const readDataFile = async () => {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// Write data to data.json
const writeDataFile = async (data) => {
    try {
        const oldData = await readDataFile().catch(() => null);
        if (oldData) {
            const changesFilePath = path.join(BASE_CHANGES_DIR, `${Date.now()}.json`);
            await fs.writeFile(changesFilePath, JSON.stringify(oldData, null, 2), 'utf-8');

            try {
                const existingFiles = await fs.readdir(BASE_CHANGES_DIR);
                const jsonFiles = existingFiles
                    .filter(file => file.endsWith('.json'))
                    .sort((a, b) => b.localeCompare(a));

                if (jsonFiles.length > 5) {
                    const filesToDelete = jsonFiles.slice(5);
                    await Promise.all(
                        filesToDelete.map(file => fs.unlink(path.join(BASE_CHANGES_DIR, file)))
                    );
                }
            } catch (err) {
                logger.error('Error cleaning up old backup files:', err);
            }
        }
    } catch (error) {
        logger.error('Error reading old data.json file:', error);
    }
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

module.exports = {
    checkDataFileExists,
    readDataFile,
    writeDataFile
};