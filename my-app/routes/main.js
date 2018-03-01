'use strict';

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let env = require('env2')('.env');


let username;

router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
    console.log('aaaa')
    console.log(username)
   
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
    username = req.body.username
    if(req.body.data === undefined) {
        res.send({'message': 'inget att spara'})
    } else {
        orgsSchema.findOneAndUpdate({'username': username},
        {username: req.body.username,
         organisations: req.body.data},
         {new: true},
        function(err, user) {
            if(err) {
                res.send(err)
            } else {
                console.log(user)
                if(user == null) {
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
                }
            }
        })
    }     
})


 router.post('/dashboard', function(req, res) {
    console.log('heeeeeejj!!????')
    console.log(req.body.username);
    username = req.body.username;

    orgsSchema.findOne({'username': username}, function(err, user) {
        if(err) {
            console.log(err)
        } else {
            console.log(user)
        }
        let result = {
            'orgs': user.organisations,
            'user': user.username
        }
        console.log(result)
        res.send(result)
    })

 });

module.exports = router;