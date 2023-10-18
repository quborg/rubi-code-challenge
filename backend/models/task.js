const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  label: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  starting_date: { type: Date, required: true },
  ending_date: { type: Date, required: true },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;