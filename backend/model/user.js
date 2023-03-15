const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String 
    }, 
    password: {
        type: String 
    }, 
    spendings: {
        type: [mongoose.ObjectId] 
    }
    
})

const User = mongoose.model("User",UserSchema)

module.exports = User