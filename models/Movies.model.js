
const { Schema, model } = require("mongoose")

const movieSchema = new Schema({
    title: String,
    genre: String,
   plot: String,
   cast: [{ type: Schema.Types.
    ObjectId, ref: "Celebrity"}]
})

const Movie = model("Movie", movieSchema)

module.exports = Movie



/*----------------------------------------------------------------

The Movie model should have:

title - String
genre - String
plot - String
cast - Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)

*/