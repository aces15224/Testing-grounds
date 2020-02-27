var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CompleteSchema = new Schema({
  category: {
    type: String, 
  }

});

var Complete = mongoose.model("Complete", CompleteSchema);

module.exports = Complete;
