var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  categoryTitle: {
    type: String,
    unique: true,
    required: true,
    enum: ['Career', 'Education', 'Fitness', 'Personal', 'Health', 'Chores'], 

  },
   
  // user: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "user"
  // }],

  task: [{
    type: Schema.Types.ObjectId,
    ref: "task"
  }]
});

var Category = mongoose.model("category", CategorySchema);

module.exports = Category;
