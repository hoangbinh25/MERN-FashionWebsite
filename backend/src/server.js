const express = require('express');
const router = require('./routes');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv')
dotenv.config()
const passport = require('./config/googlePassport');
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();
const port = process.env.PORT || 3001;
const allowedOrigins = [
    'http://localhost:5173',
    'https://mern-fashion-website.vercel.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

// Cho phép xử lý preflight (OPTIONS) request
app.options("*", cors(corsOptions));

// middlewares
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.urlencoded({
    extended: true
}))

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

// Connect to MongoDB
connectDB();

// Route init
router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
