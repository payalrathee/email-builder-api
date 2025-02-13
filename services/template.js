const path = require('path');
const fs = require('fs').promises;
const Template = require('../models/Template');

exports.toTemplateJson = function(template) {

    try {
       
        let jsonTemplate =  {
            id: template._id,
            name: template.name,
            description: template.description,
            header: template.header,
            imageUrl: template.imageUrl,
            content: template.content,
            link: template.link,
            footer: template.footer,
        }

        return jsonTemplate
    } catch (error) {
        throw error;
    }
}

exports.getTemplateById = async (templateId) => {
    try {
        const template = await Template.findById(templateId);
        return template;
    } catch (error) {
        throw error;
    }
}

exports.getDefaultTemplate = async () => {
    try {
        const filePath = path.join(__dirname, '../layouts/main.html');
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        throw new Error('Failed to read template file: ' + err.message);
    }
};

exports.saveTemplate = async (templateData) => {
    try {
        const newTemplate = new Template(templateData);
        var savedTemlate = await newTemplate.save();
        return savedTemlate;
    } catch (err) {
        throw err;
    }
}

exports.updateTemplate = async(templateId, templateData) => {
    try {

        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId,
            templateData,
            { 
                new: true , // Return the updated document
                runValidators: true 
            } 
        );

        if (!updatedTemplate) {
            throw Error("TemplateNotFound");
        }

        return updatedTemplate;

    } catch(error) {
        throw error;
    }
}

exports.deleteTemplate = async (templateId) => {
    try {

        const deletedTemplate = await Template.findByIdAndDelete(templateId);

        if (!deletedTemplate) {
            throw Error("TemplateNotDeleted");
        }

        return deletedTemplate;
        
    } catch(error) {
        throw error;
    }
}