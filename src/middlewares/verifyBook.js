const Book = require('../models/book')

exports.verifyBook = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.bookID)
        console.log('book found', book)
        req.book = book
        next()
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}