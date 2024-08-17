const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../middleware')

// to show the signup form 
router.get('/register', (req, res) => {
    res.render('auth/signup');
})


// to actually register a user in db
router.post('/register', async (req, res) => {
    try {
        let { email, password, username, role } = req.body;
        const user = new User({ email, username, role });
        const newUser = await User.register(user, password);
        // res.redirect('/login');
        req.login(newUser, function (err) {
            if (err) { return next(err) }
            req.flash('success', "Welcome , You are registered succesfully")
            return res.redirect('/products')
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup')
    }

})

// to get login form 
router.get('/login', (req, res) => {
    res.render('auth/login');
})

// to actually login via the db 
router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureMessage: true
    }),
    (req, res) => {
        req.flash('success', "Welcome Back")
        res.redirect('/products');
    });

// logout -> always work in a callback function
router.get('/logout', isLoggedIn, (req, res) => {
    () => {
        req.logout()
    }
    req.flash('success', "Goodbye Friends , See You Again ");
    res.redirect('/login');
})

module.exports = router;
