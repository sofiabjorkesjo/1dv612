'use strict';

let router = require('express').Router();
let passport = require('passport');

router.get('/', function (req, res, next) {
    res.send({ express2: 'hallå' });  
});



router.get('/dashboard', function(req, res) {
    res.send('heej');
})

module.exports = router;