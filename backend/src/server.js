const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('./config/googlePassport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://mern-fashion-website-73wf.vercel.app'
];

// Bật CORS cơ bản
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

// Middleware khác
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session & Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        collectionName: 'sessions',
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

// DB connect
connectDB();

// Route init
router(app);

module.exports = app;
