var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


router.get('/newjoiners',userController.getNewJoiners);

module.exports = router;
