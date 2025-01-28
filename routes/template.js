var express = require('express');
var router = express.Router();
var templateController = require('../controllers/template');
const {body, param} = require("express-validator");
const {handleValidationError} = require("../utilities/validtionErrorHandler")
const {sanitizeData} = require("../middleware/inputSanitizer");

// validators
const templateValidator = [
    body('template.name')
        .notEmpty().withMessage("Template name can't be empty")
        .trim()
        .escape(),
];

const idValidator = [
    param('id')
        .notEmpty().withMessage("Template ID is missing")
        .isMongoId().withMessage("Invalid template ID")
];

const urlValidator = [
    body('template.link')
        .optional({ checkFalsy: true }) 
        .isURL()
        .withMessage('Please provide a valid URL')
];

router.route('/default').get( templateController.getDefaultTemplate);
router.route("/").post(templateValidator, urlValidator, sanitizeData, handleValidationError, templateController.saveTemplate);
router.route('/:id').put(idValidator, templateValidator, urlValidator, sanitizeData, handleValidationError, templateController.updateTemplate);
router.route('/:id').delete(idValidator, handleValidationError, templateController.deleteTemplate);
router.route('/render/:id').get(idValidator, handleValidationError, templateController.renderTemplate);

module.exports = router;