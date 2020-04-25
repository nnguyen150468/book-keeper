const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        unique: true,
        required: [true, "Genre's name is required."],
        trim: true
    }
})

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;