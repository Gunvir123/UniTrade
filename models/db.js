const mongoose = require('mongoose');

const uri = "mongodb+srv://gsingh13be21:aXdPcd40ZcxRYT6R@cluster0.f5vxuio.mongodb.net/?retryWrites=true&w=majority";
const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connected db");
    } catch (error) {
        console.log(err);
    }
}

module.exports = connectDb;