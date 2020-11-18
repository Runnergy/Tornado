let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Tournament = require('../models/tournament');
let Participant = require('../models/participant');

module.exports.displayTournamentList = (req, res, next) => {
    Tournament.find((err, tournamentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index', {title: 'Tournaments',file: '../views/tournament/list', TournamentList: tournamentList, displayName: req.user ? req.user.displayName : ''});   
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
    
    let totalParticipants = participants.length;
    round = Math.ceil(Math.log(totalParticipants) / Math.log(2));

    let arrayParticipants = new Array();
    
    for (let index = 0; index < participants.length; index++) {
        let participantName = participants[index];
        let participant = Participant({
            "participantname": participantName,
            "history": 0
        });
        arrayParticipants[index] = participant;
        console.log(participant.participantname);
    }

    let newTournament= Tournament({
        "title": req.body.title,
        "participants": arrayParticipants,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "round": round,
        "type": req.body.type,
        "hostname": req.body.hostname,
        "status": req.body.status
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

    let round = 0;

    if(req.body.type == '4')
    {
        round = '3';
    }
    else
    {
        round = '4';
    }

    
    let arrayParticipants = new Array();
    
    for (let index = 0; index < participants.length; index++) {
        let participant = Participant({
            "participantname": participants[index],
            "history": 0
        });
        arrayParticipants[index] = participant;
    }

    
    let updatedTounament = Tournament({
        "_id": id,
        "title": req.body.title,
        "participants": arrayParticipants,
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "round": round,
        "type": req.body.type,
        "hostname": req.body.hostname,
        "status": req.body.status
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
            res.render('index', { title: 'Tournament brackets', file: '../views/tournament/brackets', tournament: tournamentToView, displayName: req.user ? req.user.displayName : ''  });
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