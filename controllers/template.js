const templateService = require('../services/template');
const ejs = require('ejs');

exports.getDefaultTemplate = async (req, res, next) => {
    try {
        const template = await templateService.getDefaultTemplate();
        res.status(201).json({ template: template});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

exports.saveTemplate = async (req, res, next) => {
    try {
        var savedTemplate = await templateService.saveTemplate(req.body.template);
        res.status(201).json({ 
            message: 'Template saved successfully',
            template: templateService.toTemplateJson(savedTemplate)
        });
    } catch (error) {
        console.log(error)
        if(error.name == "MongoServerError" && error.code == 11000) {
            res.status(400).json({message: `${Object.keys(error.keyValue)[0]} already exists`});
        } else if(error.name == "ValidationError") {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message:'Internal server error'});
        }
    }
}

exports.updateTemplate = async (req, res) => {
    try {
        let templateData = req.body.template;
        const updatedTemplate = await templateService.updateTemplate(req.params.id, templateData);
		
		if(updatedTemplate){

			res.status(200).json({ message: 'Template updated successfully', template: templateService.toTemplateJson(updatedTemplate) });
			
		}
		
    } catch (error) {
        console.error(error);
        if(error.message === "TemplateNotFound") {
            return res.status(404).json("Template not found.");
        } else if(error.name == "MongoServerError" && error.code == 11000) {
            res.status(400).json(`${Object.keys(error.keyValue)[0]} already exists`);
        } else if(error.name == "ValidationError") {
            res.status(400).json(error.message);
        } else {
            res.status(500).json('Internal server error');
        }
    }
}

exports.deleteTemplate = async (req,res) => {
    try {
        
        const deletedTemplate = await templateService.deleteTemplate(req.params.id);
        res.status(200).json({ message: 'Template deleted successfully', template: templateService.toTemplateJson(deletedTemplate) });
    } catch (error) {
        console.error(error);
        if(error.message === "TemplateNotFound") {
            return res.status(404).json("Template not found.");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}

exports.renderTemplate = async (req,res) => {
    
    try {
        const { id } = req.params;

        const templateData = await templateService.getTemplateById(id);

        if (!templateData) {
            return res.status(404).json({ message: 'Template not found' });
        }

        // decode urls
        templateData.imageUrl = decodeURIComponent(templateData.imageUrl);
        templateData.link = decodeURIComponent(templateData.link);

        // Set response headers to download the file
        res.setHeader('Content-Disposition', `attachment; filename=template-${id}.html`);
        res.setHeader('Content-Type', 'text/html');

        return res.render('main', templateData);

    } catch (error) {
        console.error(error);
        if(error.message === "TemplateNotFound") {
            return res.status(404).json("Template not found.");
        } else {
            res.status(500).json('Internal server error');
        }
    }
}