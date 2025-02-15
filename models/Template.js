// models/Template.js
const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    name: {
      type: "String",
      required: true
    },
    category: {
      type: String,
      enum: ["header", "image", "paragraph", "button", "footer", "link"], 
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "file", "number"],
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed, 
      required: true,
    },
    order: {
      type: Number, 
      required: true,
    },
});

const templateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String
    },
    sections: [sectionSchema], 
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Template', templateSchema);
