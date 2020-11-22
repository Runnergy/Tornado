var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// connect to our tournament Model
let Tournament = require('../models/tournament');
let tournamentController = require('../controllers/tournament');

/* GET Route for the Tournament List page - READ Operation */
router.get('/', tournamentController.displayTournamentList );

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/create', tournamentController.displayCreatePage );

/* POST Route for processing the Add page - CREATE Operation */
router.post('/create', tournamentController.processCreatePage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/update/:id', tournamentController.displayUpdatePage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/update/:id', tournamentController.processUpdatePage );

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', tournamentController.performDelete);

router.get('/brackets/:id', tournamentController.editBrackets);

router.get('/brackets/:id/read-only', tournamentController.displayBrackets);

router.post('/brackets/:id', tournamentController.processBracket);

module.exports = router;
