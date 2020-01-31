const express = require("express");
const logger = require("morgan");
const path = require("path");
const fs = require('fs');

const app = express();

var notedb = path.join(__dirname,'db.json')

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public", {'extensions': ['html']}));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//This supercedes the api stuff.
//app.get("*", (req, res) => {
    //res.sendFile(path.join(__dirname + "/public/index.html"));
//});  

app.get("/api/notes", (req, res) => {
    console.log ("anything I guess")
    //res.sendFile(path.join(__dirname + "./public/index.html"));
        fs.readFile(notedb, function(err, data) {
            if(err) {
                res.send([]);
                return;
            }
            console.log("saved!");
            obj=JSON.parse(data)
            res.send(obj);
            console.log(obj);
        })


});  

app.post("/api/notes", (req, res) => {
    //res.sendFile(path.join(__dirname + "./public/index.html"));
        var obj;
        console.log(notedb);
        fs.readFile(notedb, function(err, data) {
            if(err) {
                obj = [];
            } else {
                obj = JSON.parse(data);
            }
            obj.push(req.body);
        fs.writeFile(notedb, JSON.stringify(obj), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("saved!");
            res.send(obj);
          })

        })
});  

app.delete("/api/notes/:id", (req, res) => {
    //res.sendFile(path.join(__dirname + "./public/index.html"));
    var obj;
    fs.readFile(notedb, function(err, data) {
        if(err) {
            obj = [];
        } else {
            obj = JSON.parse(data);
        }

        console.log(req.params.id);
        obj.splice(req.params.id, 1) ;
    fs.writeFile(notedb, JSON.stringify(obj), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("saved!");
        res.send(obj);

       })
    })

});  

/*  Might be useful for this

app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  ----

app.delete("/api/examples/:id", function(req, res) {
    db.Characters.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

 ----

*/



app.listen(3000, () => {
  console.log("App running on port 3000!");
});


/*

app.get("/exercise", (req, res) => {
      res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
});

app.put("/api/workouts/:id", (req, res) => {
  //create empty workout if appropriate
  console.log(req.body);
  console.log(req.params.id);
  console.log(mongojs.ObjectId(req.params.id));
  db.workouts.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
        $push: { exercises: req.body }
    },
    (error, data) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {

        console.log(data);
        res.send(data);
      }
    }
  );
});


app.post("/api/workouts", (req, res) => {
  db.workouts.insert( { "exercises" : [] } , (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      console.log(data);
//      data=[{exercises:[{duration:12}]},{exercises:[{duration:13}]}];

      res.json(data);
    }
  });
});
*/