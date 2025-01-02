const mongoose = require("mongoose");

// Define the schema
const documentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId
    required: true,
  },
  name: {
    type: String, // Name of the document
    required: true,
    trim: true,
  },
  isUpload: {
    type: Boolean, // Indicates if the document has been uploaded
    required: true,
    default: false,
  },
});

const documentModel = mongoose.model("documents", documentSchema);

module.exports = documentModel;
