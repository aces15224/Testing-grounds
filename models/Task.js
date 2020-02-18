var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var TaskSchema = new Schema({a
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
 
  dueDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String, 
    enum: ["Daily", "Weekly", "Monthly"]
  },
    
  category: {
    type: String, 
    enum: ["Career", "Education", "Fitness", "Personal", "Health", "Chores"], 
    required: true}

});

var Task = mongoose.model("task", TaskSchema);

module.exports = Task;
