var express = require('express');
var router = express.Router();
const graphController = require('../controllers/graphController');


router.post('/find',graphController.findMeetingTimesApi);
router.get('/',graphController.findMeetingTimesget);
router.post('/sugg',graphController.suggest);

module.exports = router;
