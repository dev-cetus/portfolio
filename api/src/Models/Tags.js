const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  }
})

module.exports = mongoose.model('Tags', tagsSchema);