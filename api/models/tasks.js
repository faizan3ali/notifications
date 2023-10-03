const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String },
  description: { type: String },
  dueDate: { type: Date },
  assignedToType: { type: String },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, refPath:'assignToType' }],
  taskCategory: { type: String },
  taskSubjectId: { type: mongoose.Schema.Types.ObjectId, refPath:'taskCategory' },
  status: { type: String },
  comments: [{ type: Object }],
  createdAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  updatedAt: { type: Date },
  updatedBy: { type: mongoose.Schema.Types.ObjectId },
  priority:{ type: Number },
  order:{ type: Number },
  tags: [{ type: mongoose.Schema.Types.ObjectId, refPath:'tagsList' }],
},
{
  toJSON: { virtuals: true }
});
tasksSchema.virtual('User', {
  ref: 'User',
  localField: 'assignedTo',
  foreignField: '_id',
  justOne: true
});
tasksSchema.virtual('Teams', {
  ref: 'Teams',
  localField: 'assignedTo',
  foreignField: '_id',
  justOne: true
});
tasksSchema.virtual('Tags', {
  ref: 'Tags',
  localField: 'tags',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model("Tasks", tasksSchema);
