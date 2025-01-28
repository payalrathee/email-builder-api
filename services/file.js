const File = require('../models/File');

// Service to create a new file entry
exports.saveFile = async (fileData) => {
    try {
        const file = new File(fileData);
        await file.save();
        return file;
    } catch (error) {
        throw error;
    }
};

