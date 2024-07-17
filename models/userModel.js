const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "productModel" }]

})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;