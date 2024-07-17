const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    pname: {
        type: String,
        required: true
    },
    pdesc: {
        type: String,
        required: true
    },
    pprice: {
        type: Number,
        required: true
    },
    pcat: {
        type: String,
        required: true
    }
    ,
    pimage: {
        type: String,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,

    }


})

const productModel = mongoose.model("productModel", productSchema);
module.exports = productModel;