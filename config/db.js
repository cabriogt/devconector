const config = require('config');
const mongoose = require('mongoose');

const db = config.get('mongoURI');

const connectDB = async()=>{
    try {
        await mongoose.connect(db)
        console.log("db connected")
    } catch (error) {
        console.error(error.message)
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;