const mongoose = require('mongoose')
const dotev = require('dotenv')

dotev.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log('MongoDB Connected...');

    } catch (error) {
        console.error('MongoDB Connection Error: ', error)
        process.exit(1);
    }
}

module.exports = connectDB;
