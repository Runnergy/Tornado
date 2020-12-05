// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// modules for updating tournament records every minute
let Tournament = require('../models/tournament');
let cron = require('node-cron');

// execute it every minute
cron.schedule('* * * * *', () => 
{
  // find all tournaments
  Tournament.find((err, tournamentList) => {
    if(err)
    {
        return console.error(err);
    }
    else
    {
      // loop the list of tournaments
      for (const tournament of tournamentList) {
        // console.log(tournament._id);
        // console.log('running a task every minute');

        let status = '';
        
        // it returns current time + 5hrs
        let today = new Date();

        // subtract 5hrs to get current time
        let currentDate = new Date(today.setTime(today.getTime() - (5*60*60*1000)));

        // it returns the beginning of enddate. to make it the end of enddate,  added 23hr 59min
        let enddate = new Date(tournament.enddate.setTime(tournament.enddate.getTime() + (23*60*60*1000) + (59*60*1000)));
        // console.log(currentDate);
        // console.log(enddate);

        if(tournament.startdate <= currentDate && 
          enddate >= currentDate &&
          tournament.rounds[0].participants.length == tournament.type * 2)
          {
              status = 'active';
          }

        // set status
        Tournament.updateOne({_id: tournament._id}, { $set:{"status": status}}, (err) => {
          if(err)
          {
              console.log(err);
          }
        });
      }
    }
});


});

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URi
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDb = mongoose.connection;
mongoDb.on('error', console.error.bind(console, 'Connection Error:'));
mongoDb.once('open', () => {
  console.log('Connected to MongoDB...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let tournamentRouter = require('../routes/tournament');

let app = express();
//  force the browser to obtain new copy of the page even when they hit "back".
app.use(function(req, res, next) {
  // Set the Cache-control headers to no-cache conditionally for logged out users
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')))

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport user configuration

//create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

//implement a User authentication stratgy
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tournament', tournamentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error'
  });
});

module.exports = app;