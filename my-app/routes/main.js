'use strict';

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let env = require('env2')('.env');


router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
   
    request('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'redirect_uri=http://localhost:3000/dashboard&' + 'client_secret=' + process.env.REACT_APP_CLIENT_SECRET + '&' + 'code=' + temporaryCode,{
        method: 'POST',
        header: {
            'content-type': 'application/json'
         },
    }, function(error, response, body) {
        if(error) {
            console.log(error)
        } else {
            res.send({express: response.body});
        }
    })
 });

 router.post('/settings', function(req, res) {
    console.log('heeeeeejj!!')
    console.log(req.body.username);
    let userAndOrgs = new orgsSchema({
        username: req.body.username,
        organisations: req.body.data
    });
    userAndOrgs.save(function(err, result) {
        if(err) {
            console.log(err)
        } else {
            res.send({'express': 'Successfull saved to database'});
        }
    })
   
    
})


 router.post('/dashboard', function(req, res) {
    console.log('heeeeeejj!!????')
    console.log(req.body);
     res.send('hej från express' + req.body);
 })
 
 


module.exports = router;