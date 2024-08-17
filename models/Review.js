const mongoose = require('mongoose');

// making rating schema 
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    }

}, { timestamps: true })

// making model
let Review = mongoose.model('Review', reviewSchema);


// exporting this model to use it in another pages 
module.exports = Review;