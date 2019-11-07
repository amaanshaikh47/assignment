//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


// mongoose.connect("mongodb://localhost:27017/movieDB", {useNewUrlParser : true,  useUnifiedTopology: true });

// DataBase added in MongoDb Atlas */
 mongoose.connect("mongodb+srv://amaanS:amaan123@assignment-hulh0.mongodb.net/modb", {
      useNewUrlParser: true ,  useUnifiedTopology: true 
 });


const movieSchema = new mongoose.Schema({
  name: String,
  img: String,
  summary: String
});


const Movie = mongoose.model("Movie", movieSchema);


const movie1 = new Movie({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
});

const movie2 = new Movie({
  name: "The Lord of the Rings: The Fellowship of the Ring",
  img: "https://bit.ly/2tC1Lcg",
  summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
});

const movie3 = new Movie({
  name: "Avengers: Endgame",
  img: "https://bit.ly/2Pzczlb",
  summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
});

const allMovies = [movie1, movie2, movie3];

app.get("/", function(req, res) {
  Movie.find({}, function(err, found) {
    if (!err) {
      if (found.length === 0) {
        Movie.insertMany(allMovies, function(err) {
          if (!err) {
            res.redirect("/");
          }
        });
      } else {
        res.render("index", {
          found: found
        });
      }
    }
  });

});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
