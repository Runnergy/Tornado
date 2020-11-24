let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Tournament = require('../models/tournament');

module.exports.displayTournamentList = (req, res, next) => {
    Tournament.find((err, tournamentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index', {title: 'Tournaments',file: '../views/tournament/list', 
                        TournamentList: tournamentList, 
                        displayName: req.user ? req.user.displayName : '', 
                        username: req.user ? req.user.username : '' }); 
            console.log(req.user ? req.user.username : '');  
        }
    });
}

module.exports.displayCreatePage = (req, res, next) => {
    res.render('index', { title: 'Create Tournament', file: '../views/tournament/create', displayName: req.user ? req.user.displayName : '' });          
}

module.exports.processCreatePage = (req, res, next) => {
    // User will add one participant in each line
    let participantString = req.body.participants;
    
    // split the line with the new line character and assign it to array
    let participants = participantString.split("\r\n");

    // remove empty element from the array
    participants = participants.filter(item => item);
    
    // let totalParticipants = participants.length;
    // round = Math.ceil(Math.log(totalParticipants) / Math.log(2));

    // determine round according to the number of bouts
    let roundTotal = '';

    if(req.body.type == '4')
    {
        roundTotal = '3';
    }
    else
    {
        roundTotal = '4';
    }

    let status = '';
    let currentDate = new Date().toISOString().slice(0,10);

    if(req.body.startdate <= currentDate && 
        req.body.enddate >= currentDate &&
        participants.length == req.body.type * 2)
        {
            status = 'active';
        }
        // console.log(req.body.type * 2);
        // console.log(req.body.enddate);
        // console.log(req.body.startdate);
        // username: req.user.username

    let newTournament= Tournament({
        "title": req.body.title,
        "round1": participants,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "roundTotal": roundTotal,
        "type": req.body.type,
        "host": req.user.username,
        "status": status,
        "description": req.body.description
    });

    Tournament.create(newTournament, (err, Tournament) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh 
            res.redirect('/tournament');
        }
    });

}

module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    Tournament.findById(id, (err, tournamentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('index', { title: 'Update Tournament', file: '../views/tournament/update', tournament: tournamentToEdit, displayName: req.user ? req.user.displayName : '' });
        }
    });
}

module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id;

    // User will add one participant in each line
    let participantString = req.body.participants;
    
    // split the line with the new line character and assign it to array
    let participants = participantString.split("\r\n");

    // remove empty element from the array
    participants = participants.filter(item => item);
    
    // let totalParticipants = participants.length;
    // round = Math.ceil(Math.log(totalParticipants) / Math.log(2));


    // determine round according to the number of bouts
    let roundTotal = '';

    if(req.body.type == '4')
    {
        roundTotal = '3';
    }
    else
    {
        roundTotal = '4';
    }

    let status = '';
    let currentDate = new Date().toISOString().slice(0,10);

    if(req.body.startdate <= currentDate && 
        req.body.enddate >= currentDate &&
        participants.length == req.body.type * 2)
        {
            status = 'active';
            console.log(status);
        }
    
    // get values from the input text field containing list of participants in each round
    let secondRoundString = req.body.secondRoundParticipants;
    let thirdRoundString = req.body.thirdRoundParticipants;
    let forthRoundString = req.body.forthRoundParticipants;
    let fifthRoundString = req.body.fifthRoundParticipants;
    
    // split and assign it to array
    let secondParticipants = secondRoundString.split(",");
    let thirdParticipants = thirdRoundString.split(",");
    let forthParticipants = forthRoundString.split(",");
    let fifthParticipants = fifthRoundString.split(",");
    
    let updatedTounament = Tournament({
        "_id": id,
        "title": req.body.title,
        "round1": participants,
        "round2": secondParticipants,
        "round3": thirdParticipants,
        "round4": forthParticipants,
        "round5": fifthParticipants,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "roundTotal": roundTotal,
        "type": req.body.type,
        "host": req.user.username,
        "status": status,
        "description": req.body.description
    });

    Tournament.updateOne({_id: id}, updatedTounament, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh 
            res.redirect('back');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Tournament.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh
             res.redirect('/tournament');
        }
    });
}

module.exports.editBrackets = (req, res, next) => {
    let id = req.params.id;

    Tournament.findById(id, (err, tournamentToView) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('index', { title: 'Tournament brackets', file: '../views/tournament/brackets', tournament: tournamentToView, displayName: req.user ? req.user.displayName : '' });
        }
    });
}

module.exports.displayBrackets = (req, res, next) => {
    let id = req.params.id;

    Tournament.findById(id, (err, tournamentToView) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('index', { title: 'Tournament brackets - view', file: '../views/tournament/brackets', tournament: tournamentToView, displayName: req.user ? req.user.displayName : ''  });
        }
    });
}

module.exports.processBracket = (req, res, next) => {
    let id = req.params.id;

    // get values from the input text field containing list of participants in each round
    let firstRoundString = req.body.firstRoundParticipants;
    let secondRoundString = req.body.secondRoundParticipants;
    let thirdRoundString = req.body.thirdRoundParticipants;
    let forthRoundString = req.body.forthRoundParticipants;
    let fifthRoundString = req.body.fifthRoundParticipants;
    
    
    // split and assign it to array
    let firstParticipants = firstRoundString.split(",");
    let secondParticipants = secondRoundString.split(",");
    let thirdParticipants = thirdRoundString.split(",");
    let forthParticipants = forthRoundString.split(",");
    let fifthParticipants = fifthRoundString.split(",");

    
    let updatedTounament = Tournament({
        "_id": id,
        "round1": firstParticipants,
        "round2": secondParticipants,
        "round3": thirdParticipants,
        "round4": forthParticipants,
        "round5": fifthParticipants
    });

    Tournament.updateOne({_id: id}, updatedTounament, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(updatedTounament.round3);
            // refresh 
            res.redirect('back');
        }
    });
}