'use strict';

let router = require('express').Router();
let passport = require('passport');

router.get('/', function (req, res, next) {
    res.send({ express2: 'http://localhost:3000/auth/github' });  
});

//router.get('/auth/github', passport.authenticate('github'));


router.get('/auth/github', function(req, res) {
    console.log('fff');
    res.redirect('https://github.com/login/oauth/authorize');
})

router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), function(req, res){
    res.redirect('/dashboard');
});

router.get('/dashboard', function(req, res) {
    res.send('heej');
})

module.exports = router;