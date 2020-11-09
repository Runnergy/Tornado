let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
//let passport = require('passport');

//create the User Model instance\
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', file: 'home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Us', file: 'about', displayName: req.user ? req.user.displayName : '' });
}

/*
module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
*/