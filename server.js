const express = require("express");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
require("dotenv").config();
require("./config/passport");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(dataRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Fitbit API");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
