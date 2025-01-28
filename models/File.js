// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },           
    type: { type: String, required: true },           
    size: { type: Number, required: true },           
    path: { type: String, required: true },  
    url: { type: String, required: true },               
    createdAt: { type: Date, default: Date.now },         
    updatedAt: { type: Date, default: Date.now },                   
});

module.exports = mongoose.model('File', fileSchema);
