const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema
({
    name: {type: String, required: true},
    email: {type: String, required: true},
    // Will be encrypted using bcryptjs
    password: {type: String, required: true},
    type: {type: String, required: true}
})

const User = mongoose.model("User", UserSchema)

module.exports = User