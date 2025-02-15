const path = require('path');
const fs = require('fs').promises;
const Template = require('../models/Template');

exports.toTemplateJson = function(template) {

    try {
       
        let jsonTemplate =  {
            id: template._id,
            name: template.name,
            description: template.description,
            sections: template.sections
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

exports.renderTemplate = async (templateId) => {

    try {

        let template = await this.getTemplateById(templateId);

        let templateContent = '';

        // Add styles
        templateContent += `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4CAF50;
                color: #ffffff;
                text-align: center;
                padding: 15px;
            }
            .content {
                padding: 20px;
                color: #333333;
                line-height: 1.6;
            }
            .content h1 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .content p {
                margin: 10px 0;
            }
            .cta-button {
                display: inline-block;
                padding: 10px 20px;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
            }
            .cta-button:hover {
                background-color: #45a049;
            }
            .image-container {
                text-align: center;
                padding: 10px;
            }
            .link {
                padding: 20px;
            }
            .footer {
                background-color: #f1f1f1;
                text-align: center;
                font-size: 12px;
                color: #555555;
                padding: 10px;
            }
        </style>
        `;

        templateContent += '<div class="email-container">';

        let sectionsContent = template.sections.map((section) => {
            switch(section.category) {
                case "header": 
                    return `<div class="header">
                                <h1>${section.content}</h1>
                            </div>`
                    
                case "footer": 
                    return `<div class="footer">
                                <p>${section.content}</p>
                            </div>`
    
                case "paragraph": 
                    return `<div class="content">
                                <p>${section.content}</p>
                            </div>`
    
                case "link": 
                    return `<div class="link">
                                <a href="${section.content}" class="cta-button">Get Started</a>
                            </div>`
                    
                case "image":
                    return `<div class="image-container">
                                <img src="${decodeURIComponent(section.content)}" alt="Header Image" style="max-width: 100%; height: auto"/>
                            </div>`
            }
        })

        sectionsContent.forEach(function(item) {
            templateContent += item;
        })

        templateContent += '</div';

        return templateContent;

    } catch(error) {
        throw error;
    }
}