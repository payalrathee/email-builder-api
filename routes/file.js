const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file');
const { getMulter } = require('../utilities/utility');

const upload = getMulter();
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
