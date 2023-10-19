const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  label: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;