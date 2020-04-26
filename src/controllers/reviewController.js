const Review = require('../models/review')
const Book = require('../models/book')

exports.createReview = async (req, res) => {
    try{
        const review = new Review({
            content: req.body.content,
            user: req.user._id,
            book: req.book._id
        })
        await review.save();

        return res.status(201).json({
            status: "success",
            data: review
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.readReviews = async (req, res) => {
    try{
        // const reviews = await Review.find({book: req.params.bookID})
        // return res.status(200).json({
        //     status: "success",
        //     data: reviews
        // })

        const book = await Book.findById(req.params.bookID)
            .populate({
                path: 'reviews',
                selection: "-createdAt -updatedAt -__v"
            })
            
        return res.status(200).json({
            status: "success",
            data: book
        })
    } catch(err){
        return res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}