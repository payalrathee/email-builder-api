// models/Template.js
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
    }, 
    description: { 
        type: String 
    }, 
    header: {
        type: String, 
    }, 
    imageUrl: {
        type: String, 
    },       
    content: {
        type: String, 
    }, 
    link: {
        type: String, 
    },
    footer: {
        type: String, 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }, 
});

module.exports = mongoose.model('Template', templateSchema);
