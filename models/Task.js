var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const enum1 = ['Daily', 'Weekly', 'Monthly'];
const enum2 = ['Career', 'Education', 'Fitness', 'Personal', 'Health', 'Chores'];

var TaskSchema = new Schema({
  taskItem: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  saved: {
    type: Boolean,
    default: false
  },
  
  createdOn: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    default: Date.now

  },
  priority: {
    type: String, 
    enum: enum1, 
    required: false},
    
  category: {
    type: String, 
    enum: enum2, 
    required: true}

});

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;
