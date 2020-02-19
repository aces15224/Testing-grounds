const mongoose = require("mongoose");
const db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds237267.mlab.com:37267/heroku_0n06ck2s";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

module.exports = function (app) {

  app.get("/api/tasks", function(req, res) {
    db.Task.find({}).then(function(dbModel) {
      res.json(dbModel);
    });
  });


  app.post("/api/tasks", function(req, res) {
    db.Task.create({
      taskItem: req.body.taskItem,
      completed: false,
      saved: false,
      createdOn: req.body.createdOn,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      category:  req.body.category 
    }).then(function(dbModel) {
      console.log("yes!")
      res.json(dbModel);
    });
  });

}




