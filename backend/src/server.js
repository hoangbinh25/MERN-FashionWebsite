const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Connect to MongoDB
connectDB();

// Route init
router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})