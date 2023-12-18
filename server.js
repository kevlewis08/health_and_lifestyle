// /server.js
require('dotenv').config();
require('./database');
const express = require('express');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const nutritionRoutes = require('./routes/nutritionRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');


const initializePassport = require('./passportConfig');

initializePassport(passport);


const PORT = process.env.PORT || 3000;

const { pool } = require('./dbConfig');

app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.session());
app.use(passport.initialize());

app.use(flash());

app.get('/', (req, res) => {
    res.redirect('/users/login');
});

// app.use(express.static('public'));

app.use('/', nutritionRoutes);
app.use('/', loginRoutes);
app.use('/', fitnessRoutes);
app.use('/', profileRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
