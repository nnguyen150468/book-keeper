const Book = require('../models/book')
const Genre = require('../models/genre')
const Author = require('../models/author')

exports.createBook = async (req, res) => {
    try{
        const book = new Book({
            ...req.body,
            owner: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        })

        await book.save();  
        return res.status(201).json({
            status: "success",
            data: book
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.readBooks = async (req, res) => {
    try{
        const books = await Book.find({"owner._id": req.user._id});
        return res.status(200).json({
            status: "success",
            data: books
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.updateBook = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        // console.log('req.user', req.user)
        // console.log('book found',book)
        if(book.owner._id.toString()!==req.user._id.toString()) throw new Error("Not your book")
        
        
        const fields = Object.keys(book)
        // fields.map(field => book.field = req.body.field)
        book.genres = req.body.genres
        book.author = req.body.author
        book.title = req.body.title
        // book.owner = req.user
        await book.save();
        return res.status(201).json({
            status: "success",
            data: book
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.deleteBook = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id)
        if(book.owner._id.toString()!==req.user._id.toString()) throw new Error("Not your book")
        await Book.findByIdAndDelete(req.params.id);
        return res.status(204).json({
            status: "success",
            data: null
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}