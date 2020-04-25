const mongoose = require('mongoose')
const Genre = require('./genre')
const Author = require('./author')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book's title is required"],
        trim: true
    },
    genres: Array,
    author: Object,
    owner: {
        type: Object,
        required: [true, "Book must have an owner"]
    }
})

bookSchema.pre("save", async function(){
    const genreArray = this.genres.map(async genre => await Genre.findById(genre))
    this.genres = await Promise.all(genreArray)
    this.author = await Author.findById(this.author)
    return this
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;