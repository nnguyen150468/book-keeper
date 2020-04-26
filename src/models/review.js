const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Review's content is required"],
        minlength: 3
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: true
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;