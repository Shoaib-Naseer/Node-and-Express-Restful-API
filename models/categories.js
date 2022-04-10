const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Categories', CategoriesSchema);
