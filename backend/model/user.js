const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String 
    }, 
    password: {
        type: String 
    }
    
})

const User = mongoose.model("User",UserSchema)

module.exports = User