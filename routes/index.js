const mongoose = require("mongoose");
const db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds237267.mlab.com:37267/heroku_0n06ck2s";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// postTask: function(taskData) {
module.exports = function (app) {
  // app.get('/task', function (req, res) {
  //   db.Task.find({}, function(err, data) {
  //     res.render('TaskBankHome', { taskObject:data });
  //   })
  // });

  app.get("/api/tasks", function(req, res) {
    db.Task.find({}).then(function(dbModel) {
      res.json(dbModel);
    });
  });


  app.post("/api/tasks", function(req, res) {
    db.Task.create({
      taskData:req.body
    }).then(function(dbModel) {
      console.log("yes!")

      res.json(dbModel);
    });
  });
  // app.post("/api/tasks", function(req, res) {
  //   db.Task.create()
  //   .then(function(dbTask){
  //     res.json(dbTask)
  //   })
  //   .catch(function (err){
  //     res.json(err);
  //   })
  // });

//   db.User.create({
//     email: req.body.email,
//     fullName: req.body.fullName,
//     password: req.body.password
// }).then(() => {
//     res.status(200).end();
// });
  // app.get('/saved', function (req, res) {
  //   db.Article.find({saved: true}, function(err, data){
  //     res.render('saved', { home: false, article : data });
  //   })
  // });

  // app.get("/api/headlines", function(req, res) {
  //   db.Article.find({})
  //   .then(function(dbArticle) {
  //   res.json(dbArticle);
  //   })
  //   .catch(function(err) {
  //   res.json(err);
  //   });
  // });

  // app.get("/api/notes", function(req, res) {
  //   db.Article.find({})
  //   .then(function(dbArticle) {
  //   res.json(dbArticle);
  //   })
  //   .catch(function(err) {
  //   res.json(err);
  //   });
  // });

  // app.put("/api/headlines/:id", function(req, res){
  //   var saved = req.body.saved == 'true'
  //   if(saved){
  //     db.Article.updateOne({_id: req.body._id},{$set: {saved:true}}, function(err, result){
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       return res.send(true)
  //     }
  //   });
  //   }
  // });

  // app.delete("/api/headlines/:id", function(req, res){
  //   db.Article.deleteOne({_id: req.params.id}, function(err, result){
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       return res.send(true)
  //     }
  //   });
  // });

  // app.get("/api/fetch", function(req, res) {
  //   axios.get("https://mmamania.com").then(function(response) {

  //     var $ = cheerio.load(response.data);
    
  //     $(".c-entry-box--compact").each(function(i, element) {
  //       var result = {};
  //       result.headline = $(element).find("h2").text();
  //       result.url = $(element).find("a").attr("href");
  //       result.summary = $(element).find("p").text();
    

  //   if (result.headline !== '' && result.summary !== ''){
	// 		db.Article.findOne({headline: result.headline}, function(err, data) {
  //       if(err){
  //         console.log(err)
  //       } else {
  //         if (data === null) {
	// 				db.Article.create(result)
  //          .then(function(dbArticle) {
  //            console.log(dbArticle)
  //         })
  //         .catch(function(err) {
  //         console.log(err)
  //         });
	// 			}
  //       console.log(data)
  //       }
	// 		});
  //   }

  // });

  //   res.send("Scrape completed!");
  // });
  // });

  // app.get("/api/notes/:id", function(req, res){
  //   db.Article.findOne({_id: req.params.id})
  //   .populate("note")
  //   .then(function(dbArticle){
  //     console.log(dbArticle.note)
  //     res.json(dbArticle.note)
  //   })
  //   .catch(function(err){
  //     res.json(err)
  //   })
  // });

  // app.post("/api/notes", function(req, res){
  //   db.Note.create({ noteText: req.body.noteText })
  //   .then(function(dbNote){
  //     return db.Article.findOneAndUpdate({ _id:req.body._headlineId}, 
  //     { $push: {note: dbNote._id} }, 
  //     {new: true})
  //   })
  //   .then(function(dbArticle){
  //     res.json(dbArticle)
  //   })
  //   .catch(function(err){
  //     res.json(err);
  //   })
  // });

  // app.delete("/api/notes/:id", function(req, res){
  //   console.log('reqbody:' + JSON.stringify(req.params.id))
  //   db.Note.deleteOne({_id: req.params.id}, function(err, result){
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       return res.send(true)
  //     }
  //   });
  // });

  // app.get("/api/clear", function(req, res){
  //   db.Article.deleteMany({}, function(err, result){
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(result)
  //       res.send(true)
  //     }
  //   })
  // });
}







// router.get('/api/tasks', (req, res) => {
//   res.json(res.data);
// });

// router.post('/api/tasks', (req, res) => {
//   res.send(req.body);
// });

// module.exports = router;





// router.get('/api/tasks', (req, res) => {
//   db.Task.find({}).then((err, result) => res.json(result))
//     .catch((err) => res.status(422).json(err));

//   // res.json(res.data);
// });

// router.post('/api/tasks', (req, res) => {
//   db.Task.create(req.body).then((err, result) => res.json(result))
//     .catch((err) => res.status(422).json(err));
// });
