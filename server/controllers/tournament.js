var dialog = require('dialog');

// create a reference to the model
let Tournament = require('../models/tournament');

// GET controller for tournament list page
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
                username: req.user ? req.user.username : ''
            }); 
        }
    });
}

// GET controller for tournament list card page
module.exports.displayTournamentListCard = (req, res, next) => {
    Tournament.find((err, tournamentList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('index', {title: 'Tournaments Cards',file: '../views/tournament/list_card', 
                tournamentList: tournamentList, 
                displayName: req.user ? req.user.displayName : '', 
                username: req.user ? req.user.username : ''
            }); 
        }
    });
}

// GET controller for create page
module.exports.displayCreatePage = (req, res, next) => {
    if (!req.user) {
        req.session.returnTo = req.originalUrl; 
        res.redirect('/login');
    } else {
        res.render('index', { title: 'Create Tournament', file: '../views/tournament/create', 
        displayName: req.user ? req.user.displayName : '' });
    }       
}

// POST controller for create page
module.exports.processCreatePage = (req, res, next) => {
    // User will add one participant in each line
    let participantString = req.body.participants;
    
    // split the line with the new line character and assign it to array
    let participants = participantString.split("\r\n");

    for (let index = 0; index < participants.length; index++) {
        participants[index] = participants[index].trim();
    }

    // remove empty element from the array
    participants = participants.filter(item => item);

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

    // if current date is between start date and end date & have enough participants
    if(req.body.startdate <= currentDate && 
        req.body.enddate >= currentDate &&
        participants.length == req.body.type * 2)
        {
            // active status
            status = 'active';
        }

    // object that will be inserted in rounds array, containing participants array 
    let participantArray = {"participants": participants};

    // placeholder object that will be inserted in rounds array
    let emptyParticipantArray = {"participants": []};
    
    // creating new tournament object
    let newTournament= Tournament({
        "title": req.body.title,
        "rounds": [participantArray, emptyParticipantArray, emptyParticipantArray, emptyParticipantArray, emptyParticipantArray],
        "startdate": req.body.startdate,
        "enddate": req.body.enddate,
        "roundTotal": roundTotal,
        "type": req.body.type,
        "host": req.user.username,
        "status": status,
        "description": req.body.description
    });

    // creating new tournament in DB
    Tournament.create(newTournament, (err) =>{
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

// GET controller for update page
module.exports.displayUpdatePage = (req, res, next) => {
    let id = req.params.id;

    // finding tournament by id that will be updated
    Tournament.findById(id, (err, tournamentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            let host = tournamentToEdit.host;

            // validating if user is logged in
            if (!req.user) {
                req.session.returnTo = req.originalUrl;
                console.log("i run");
                res.redirect('/login');
            } else {

                // validating if the user that is updating is the host of tournament
                if (req.user.username != host) {
                    if (err) { 
                        console.log(err);
                    }
                    //dialog.info('Access Denied!');
                    res.redirect('/login');
                } else { 
                    //show the update view
                    res.render('index', { title: 'Update Tournament', file: '../views/tournament/update', 
                                tournament: tournamentToEdit, 
                        displayName: req.user ? req.user.displayName : ''
                    });
                }
            }
        }
    });
}

// POST controller for update page
module.exports.processUpdatePage = (req, res, next) => {
    let id = req.params.id;

    // User will add one participant in each line
    let participantString = req.body.participants;
    
    // split the line with the new line character and assign it to array
    let participants = participantString.split("\r\n");

    for (let index = 0; index < participants.length; index++) {
        participants[index] = participants[index].trim();
    }

    // remove empty element from the array
    participants = participants.filter(item => item);

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

    // if current date is between start date and end date & have enough participants
    if(req.body.startdate <= currentDate && 
        req.body.enddate >= currentDate &&
        participants.length == req.body.type * 2)
        {
            status = 'active';
        }

    // object that will be inserted in rounds array, containing participants array 
    let ParticipantArray = {"participants": participants};

    // placeholder object that will be inserted in rounds array
    //let emptyParticipantArray = {"participants": []};
    
    // declaring empty array variables
    let R1 = { "participants": [] };
    let R2 = { "participants": [] };
    let R3 = { "participants": [] };
    let R4 = { "participants": [] };
    
    // finding the tournament by id
    Tournament.findById(id, (err, tournamentToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // populating the empty arrays with values (participants) of each round
            R1 = {"participants": tournamentToUpdate.rounds[1].participants};
            R2 = {"participants": tournamentToUpdate.rounds[2].participants};
            R3 = {"participants": tournamentToUpdate.rounds[3].participants};
            R4 = { "participants": tournamentToUpdate.rounds[4].participants };
            
            // creating updated tournament object without changing the round participants
            let updatedTounament = Tournament({
                "_id": id,
                "title": req.body.title,
                "rounds": [ParticipantArray, R1, R2, R3, R4],
                "startdate": req.body.startdate,
                "enddate": req.body.enddate,
                "roundTotal": roundTotal,
                "type": req.body.type,
                "host": req.user.username,
                "status": status,
                "description": req.body.description
            });

            // validation if the user is logged in
            if (!req.user) {
                req.session.returnTo = req.originalUrl; 
                res.redirect('/login');
            } else {

                // finding the host of the tournament from DB
                Tournament.findById(id, function (err, findHost) {
                    if (err) { 
                        console.log(err);
                        res.end(err);
                    }
                    else { 
                        let host = findHost.host;
                        
                        // validating if the logged in user is the host of tournament
                        if (req.user.username != host) {
                            if (err) { 
                                console.log(err);
                            }
                            //dialog.info('Access Denied!');
                            res.redirect('/login');
                        } else { 

                            // updating tournament with the updatedTournament object
                            Tournament.updateOne({ _id: id }, updatedTounament, (err) => {
                                if (err) {
                                    console.log(err);
                                    res.end(err);
                                }

                                // checking if all the participants are same as before after update
                                if (JSON.stringify(tournamentToUpdate.rounds[0].participants) === JSON.stringify(participants)) {
                                    console.log('They are equal!');
                                    R1 = {"participants": tournamentToUpdate.rounds[1].participants};
                                    R2 = {"participants": tournamentToUpdate.rounds[2].participants};
                                    R3 = {"participants": tournamentToUpdate.rounds[3].participants};
                                    R4 = { "participants": tournamentToUpdate.rounds[4].participants };
                                }
                                else {

                                    // if there is a change in participants emptying the winners of each round
                                    R1 = { "participants": [] };
                                    R2 = { "participants": [] };
                                    R3 = { "participants": [] };
                                    R4 = { "participants": [] };
                                }
                                
                                // checking if round 3 has round 4 winners
                                if (tournamentToUpdate.rounds[4].participants.every(i => tournamentToUpdate.rounds[3].participants.includes(i)) == false) { 
                                    R4 = { "participants": [] };
                                }
                                
                                // checking if round 2 has round 3 winners
                                if (tournamentToUpdate.rounds[3].participants.every(i => tournamentToUpdate.rounds[2].participants.includes(i)) == false) { 
                                    R3 = { "participants": [] };
                                    R4 = { "participants": [] };
                                }

                                // checking if round 1 has round 2 winners
                                if (tournamentToUpdate.rounds[2].participants.every(i => tournamentToUpdate.rounds[1].participants.includes(i)) == false) { 
                                    R2 = { "participants": [] };
                                    R3 = { "participants": [] };
                                    R4 = { "participants": [] };
                                }

                                // checking if round 0 has round 1 winners
                                if (tournamentToUpdate.rounds[1].participants.every(i => tournamentToUpdate.rounds[0].participants.includes(i)) == false) { 
                                    R1 = { "participants": [] };
                                    R2 = { "participants": [] };
                                    R3 = { "participants": [] };
                                    R4 = { "participants": [] };
                                }

                                // creating new tournament ofject after validation the rounds
                                let validatedTounament = Tournament({
                                    "_id": id,
                                    "title": req.body.title,
                                    "rounds": [ParticipantArray, R1, R2, R3, R4],
                                    "startdate": req.body.startdate,
                                    "enddate": req.body.enddate,
                                    "roundTotal": roundTotal,
                                    "type": req.body.type,
                                    "host": req.user.username,
                                    "status": status,
                                    "description": req.body.description
                                });

                                //upadating tournament after validation
                                Tournament.update({ _id: id }, validatedTounament, (err) => {
                                    if(err) {
                                        console.log(err);
                                        res.end(err);
                                    } else {
                                        // refresh 
                                        res.redirect('back');
                                    }
                                });
                            });
                        }
                    }
                });
            }
        }
    });
}

// controller for deleting tournament
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    // checking if the user is logged in
    if (!req.user) {
                req.session.returnTo = req.originalUrl; 
                res.redirect('/login');
    } else {
        Tournament.findById(id, function (err, findHost) {
            if (err) { 
                console.log(err);
                res.end(err);
            }
            else { 
                let host = findHost.host;

                // checking if the user is host of the tournament
                if (req.user.username != host) {
                    if (err) { 
                        console.log(err);
                    }
                    //dialog.info('Access Denied!');
                    res.redirect('/login');
                } else { 

                    // removing tournament after validation
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
            }
        });
    }
}

// GET controller for display bracket page
module.exports.displayBrackets = (req, res, next) => {
    let id = req.params.id;

    //finding tournament by id to display
    Tournament.findById(id, (err, tournamentToView) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            if (!req.user && tournamentToView.status != 'active') 
            {
                req.session.returnTo = req.originalUrl; 
                res.redirect('/login');
            } 
            else 
            {
                //show the update view
                res.render('index', { title: 'Tournament brackets', file: '../views/tournament/brackets', 
                    tournament: tournamentToView, 
                    displayName: req.user ? req.user.displayName : ''  });
            }
        }
    });
}

// POST controller for display progress page
module.exports.displayProgress = (req, res, next) => {
    let id = req.params.id;
    let roundNumber = req.params.roundNumber;

    // finding tournament by id to continue the progress
    Tournament.findById(id, (err, tournamentToView) => {
        let host = tournamentToView.host;
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // checking if user is logged in
            if (!req.user) {
                req.session.returnTo = req.originalUrl; 
                res.redirect('/login');
            } else {
                // validating if the logged in user is the host of tournament
                if (req.user.username != host) {
                    if (err) { 
                        console.log(err);
                    }
                    //dialog.info('Access Denied!');
                    res.redirect('/login');
                } else { 
                    // if tournament is inactive, it cannot be started
                    if(tournamentToView.status != 'active')
                    {
                        res.redirect('back');
                    }
                    else
                    {
                        let errorMessage = '';
                        if(roundNumber != tournamentToView.roundTotal && 
                            tournamentToView.rounds[roundNumber].participants.length != Math.pow(2, tournamentToView.roundTotal - roundNumber))
                        {
                            errorMessage = 'Access denied. Please start it again.';
                            // errorMessage = `participant should be ${Math.pow(2, tournamentToView.roundTotal - roundNumber)}`;
                        }
                        //show the update view
                        res.render('index', { title: 'Progress Tournament', file: '../views/tournament/progress', 
                        tournament: tournamentToView, 
                        displayName: req.user ? req.user.displayName : '',
                        roundNumber: roundNumber,
                        errorMessage:  errorMessage});
                    }
                   
                }
            }
        }
    });
}

// POST route for process progress page
module.exports.processProgress = (req, res, next) => {
    let id = req.params.id;
    let roundNumber = req.params.roundNumber;

    // get values from the input text field containing list of participants in each round
    let firstRoundString = req.body.firstRoundParticipants;
    let secondRoundString = req.body.secondRoundParticipants;
    let thirdRoundString = req.body.thirdRoundParticipants;
    let forthRoundString = req.body.forthRoundParticipants;
    let fifthRoundString = req.body.fifthRoundParticipants;
    
    // split and assign it to array
    let firstParticipantArray = {"participants": firstRoundString.split(",")};
    let secondParticipantArray = {"participants": secondRoundString.split(",")};
    let thirdParticipantArray = {"participants": thirdRoundString.split(",")};
    let forthParticipantArray = {"participants": forthRoundString.split(",")};
    let fifthParticipantArray = {"participants": fifthRoundString.split(",")};

    // tournament object containing array of participants for each round
    let updatedTounament = Tournament({
        "_id": id,
        "rounds.0": firstParticipantArray,
        "rounds.1": secondParticipantArray,
        "rounds.2": thirdParticipantArray,
        "rounds.3": forthParticipantArray,
        "rounds.4": fifthParticipantArray,
    });

    Tournament.findById(id, function (err, findHost) {
            if (err) { 
                console.log(err);
                res.end(err);
            }
            else { 
                let host = findHost.host;
                
                // validating if user logged in is the host of the tournament
                if (req.user.username != host) {
                    if (err) { 
                        console.log(err);
                    }
                    //dialog.info('Access Denied!');
                    res.redirect('/login');
                } else { 
                    Tournament.updateOne({_id: id}, updatedTounament, (err) => {
                    if(err)
                    {
                        console.log(err);
                        res.end(err);
                    }
                    else
                    {

                        // checking if user is logged in
                        if (!req.user) {
                            req.session.returnTo = req.originalUrl; 
                            res.redirect('/login');
                        } else {
                            // redirect to next round page
                            res.redirect(`/tournament/progress/${id}/${parseInt(roundNumber) + 1}`);
                        }
                    }
                });
            }
        }
    });
    //     //node cron
    //     let cron = require('node-cron');
    //     cron.schedule('* * * * *', () => {

    //     console.log('running a task every minute');

    // });
}