const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  label: { type: String, required: true },
  description: { type: String },
  status: { type: String },
  starting_date: { type: Date, required: true },
  ending_date: { type: Date, required: true },
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;