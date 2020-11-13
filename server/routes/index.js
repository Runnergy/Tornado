let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about me page. */
router.get('/about', indexController.displayAboutPage);

/* GET contact us page. */
router.get('/contact', indexController.displayContactPage);

/** GET to perform UserLogout */
//router.get('/logout', indexController.performLogout);

module.exports = router;