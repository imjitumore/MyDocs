const mongoose = require("mongoose")
require("../config")

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel