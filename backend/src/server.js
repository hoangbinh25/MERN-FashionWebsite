const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv')
dotenv.config()
const session = require('express-session');
const passport = require('./config/googlePassport');

const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors({
    origin: 'https://mern-fashion-website.vercel.app',
    credentials: true,
}));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// Session & Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Route init
router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
