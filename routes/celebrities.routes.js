// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// connecting the celebrity model
const Celebrity = require("../models/Celebrity.model")


// all your routes here
// Iteration #3: Adding New Celebrities

router
.route("/celebrities/create")
.get((req, res) => res.render("celebrities/new-celebrity"))
.post((req, res) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
        console.log("There was an error adding a celebrity:", err)
        res.render("celebrities/new-celebrity")
        })
})

router.get("/celebrities", (req, res) => {
    //const {name} = req.body
    Celebrity.find()
    .then((celebs) => res.render("celebrities/celebrities", {celebs}))
    .catch((err) => {
        console.log("unable to find celebrity", err)
        res.redirect("/celebrities")
    })
})



/* 
Create the /celebrities GET route in routes/celebrities.routes.js.
In the route:
Use find() method on the Celebrity model to retrieve all the celebrities
If everything is okay, render the celebrities/celebrities.hbs view and pass the array of celebrities into the view as a variable
If there's an error, catch it
In the views/celebrities/celebrities.hbs view file:
Add an <h2> tag for the page's heading.
Use a hbs #each loop to display tags with each celebrity's name.
In the views/index.hbs (homepage) file:
Add a link that goes to the /celebrities route.
*/

module.exports = router;

