'use strict';

let router = require('express').Router();

router.get('/', function (req, res, next) {
    res.send({ express: 'Heeej' });  
});

module.exports = router;