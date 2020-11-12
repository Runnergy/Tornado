
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
            // console.log(tournamentList);
            res.render('index', {title: 'Tournaments',file: '../views/tournament/list', TournamentList: tournamentList});      
        }
    });
}

module.exports.displayCreatePage = (req, res, next) => {
    res.render('index', { title: 'Create Tournament', file: '../views/tournament/create' });          
}

module.exports.processCreatePage = (req, res, next) => {
    // User will add one participant in each line
    let participantString = req.body.participants;
    
    // split the line with the new line character and assign it to array
    let participants = participantString.split("\r\n");

    // remove empty element from the array
    participants = participants.filter(item => item);

    console.log(participants);
    
    let totalParticipants = participants.length;
    round = Math.ceil(Math.log(totalParticipants) / Math.log(2));
    
    let newTournament= Tournament({
        "title": req.body.title,
        "participants": participants,
        "round": round,
        "type": req.body.type
    });

    console.log(newTournament);

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
            res.render('index', { title: 'Update Tournament', file: '../views/tournament/update', tournament: tournamentToEdit });
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

    participants = participants.filter(item => item);
    
    let totalParticipants = participants.length;
    round = Math.ceil(Math.log(totalParticipants) / Math.log(2));
    
    let updatedTounament = Tournament({
        "_id": id,
        "title": req.body.title,
        "participants": participants,
        "round": round,
        "type": req.body.type
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
            res.redirect('/tournament');
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