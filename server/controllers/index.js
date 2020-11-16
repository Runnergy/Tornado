let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//let passport = require('passport');

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


/*
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
*/