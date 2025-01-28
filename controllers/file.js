const fileService = require('../services/file');

exports.uploadFile = async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const fileData = {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            path: req.file.path, 
            url: `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}` 
        };
        
        const uploadedFile = await fileService.saveFile(fileData);
        res.status(200).json({
            message: 'File uploaded successfully!',
            file: uploadedFile
        });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred during file upload.' });
    }
}
