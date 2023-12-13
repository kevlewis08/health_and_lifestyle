require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

router.get('/users/register', checkAuthenticated, (req, res) => {
    res.render("register")
})

router.get('/users/login', checkAuthenticated, (req, res) => {
    res.render('login')
})

router.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    res.render('dashboard', { id: req.user.id, email: req.user.email.toLowerCase(), name: req.user.name })
})

router.get('/users/nutrition', checkNotAuthenticated, (req, res) => {
    res.render('nutrition', { id: req.user.id, email: req.user.email.toLowerCase(), name: req.user.name })
})

router.get('/users/recipes', checkNotAuthenticated, (req, res) => {
    res.render('recipes')
})

router.get('/users/fitness', checkNotAuthenticated, (req, res) => {
    res.render('fitness')
})

router.get('/users/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You have logged out');
        res.redirect('/users/login');
    });
});

router.post('/users/register', async (req, res) => {
    let { name, email, password, password2 } = req.body;
    email = email.toLowerCase();

    console.log({
        name,
        email,
        password,
        password2
    });
    let errors = [];
    if(!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }
    if(password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }
    if(password != password2) {
        errors.push({ message: "Passwords do not match" });
    }
    if(errors.length > 0) {
        res.render('register', { errors });
    } else {
        // Form validation has passed
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results) => {
                if(err) {
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0) {
                    errors.push({ message: "Email already registered" });
                    res.render('register', { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
                            if(err) {
                                throw err;
                            }
                            console.log(results.rows);
                            req.flash('success_msg', "You are now registered. Please log in");
                            res.redirect('/users/login');
                        }
                    )
                }
            });
        }
    });

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}



module.exports = router;