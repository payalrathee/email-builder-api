require('dotenv').config();
const multer = require('multer');
const path = require('path');
require("dotenv").config();

exports.getMulter = () => {

    let upload = null;

    if(upload === null) {
        // Multer storage configuration
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, process.env.UPLOADS_DIR);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        });
        
        // Initialize Multer with the configured storage engine
        upload = multer({ storage: storage });
    }
    return upload;
}