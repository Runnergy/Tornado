let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model instance\
let userModel = require('../models/user');
let User = userModel.User; // alias

// create a reference to the model
let Tournament = require('../models/tournament');

module.exports.displayHomePage = (req, res, next) => {
    Tournament.find((err, tournamentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(tournamentList);
            res.render('index', {title: 'Home',file: './partials/home', TournamentList: tournamentList, displayName: req.user ? req.user.displayName : ''});      
        }
    });
    // res.render('index', { title: 'Home', file: './partials/home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Us', file: './partials/about', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact Us', file: './partials/contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    //check if the user is already logged in
    if (!req.user) {
        res.render('index', {
            title: "Login",
            file: './authentication/login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            //server error
            if (err) {
                return next(err);
            }
            //is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server err
                if (err) {
                    return next(err);
                }
                return res.redirect('/tournament');
            })
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //if user is not already logged in
    if (!req.user) {
        res.render('index',
        {
            title: "Register",
            file: './authentication/register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New user");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error, user already exists');
            }
            return res.render('index', {
                title: 'Register',
                file: './authentication/register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else {
            //if no error exists, then registration is successsful

            //redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/tournament')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}