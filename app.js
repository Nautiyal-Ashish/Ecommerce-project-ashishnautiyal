const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');

// requiring Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// mongoose connection 
mongoose.connect('mongodb+srv://nauty9625ashish:iGou2lGPR080U1Un@cluster0.eleyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log('DB connected successfully') })
    .catch((err) => {
        console.log("DB Error");
        console.log(err);
    })


// session-middleware
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 1000
    }
}

app.engine('ejs', ejsMate); //setting engine 
app.set('view engine', 'ejs'); //read ejs files
app.set('views', path.join(__dirname, 'views'));// views folder
app.use(express.static(path.join(__dirname, 'public')));// public folder
app.use(express.urlencoded({ extended: true }))// middleware
app.use(methodOverride('_method'));// method-override
app.use(session(configSession));
app.use(flash())// flash-middleware
// passport intilization
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// storing in locals (middleware)
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// passport Local Strategy used
passport.use(new LocalStrategy(User.authenticate()));


// seeding database
// seedDB() //do not comment again because data will duplicate (This is to run only once to add data in db)

// So that run after every incoming request  (using routes)
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('*', (req, res) => {
    res.redirect('/main')
})


// Server Connection 
app.listen(4444, () => {
    console.log("Server Connected at port 8080");
})
