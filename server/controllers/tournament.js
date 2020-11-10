
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
            //console.log(BookList);

            res.render('tournament/list', {title: 'Tournaments', TournamentList: tournamentList});      
        }
    });
}

module.exports.displayCreatePage = (req, res, next) => {
    res.render('tournament/create', {title: 'Create Tournament'})          
}

module.exports.processCreatePage = (req, res, next) => {
    let newTournament= Tournament({
      
        "tournament_id": req.body.tournament_id,
        "title": req.body.title,
        "participant": req.body.participant,
        "type": req.body.type 
    });

    Tournament.create(newTournament, (err, Book) =>{
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
            res.render('tournament/update', {title: 'Update Tournament', tournament: tournamentToEdit})
        }
    });
}

module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id

    let updatedTounament = Tournament({
        "_id": id,
        "tournament_id": req.body.tournament_id,
        "title": req.body.title,
        "participant": req.body.participant,
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