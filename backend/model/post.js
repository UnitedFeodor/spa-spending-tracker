const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    amount: {
        type: String //  Dinero({amount: 10000,currency: 'USD'})
    }, 
    type: {
        type: String
    }, 
    comments: {
        type: String
    }, 
    date: {
        type: Date,
        default: Date.now
    }, 
    image: {
        type: String,
        default: null 
    }
})

const Post = mongoose.model("Post",PostSchema)

module.exports = Post