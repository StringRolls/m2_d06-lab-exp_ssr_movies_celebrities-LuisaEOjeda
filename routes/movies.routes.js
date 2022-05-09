// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// connecting the movie model
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

// all your routes here

router
  .route("/movies/create")
  .get((req, res) => {
    Celebrity.find()
      .then((celebs) => {
        res.render("movies/new-movie", { celebs });
      })
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
      .then(() => res.redirect("/movies"))
      .catch((err) => res.render("celebrities/new-celebrity"));
  });

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => res.render("movies/movie-details", { movie }))
    .catch((err) => console.log(err));
});

router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => res.render("movies/movies", { movies }))
    .catch((err) => {
      console.log("unable to find movies", err);
      res.redirect("/movies");
    });
});

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(err));
});

router
.route("/movies/:id/edit")
.get((req, res) => {
    const { id } = req.params;

    Movie.findById(id)
    .populate("cast")
    .then((movie) =>{
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/edit-movie", {
            movie: movie,
            celebrities: {celebrities}
        })
    })
})
})
.post((req, res) => {
const { id } = req.params;
const { title, genre, plot, cast } = req.body;

Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
.then(() => res.redirect("/movies/:id"))
.catch((err) => console.log(err))
})

module.exports = router;
