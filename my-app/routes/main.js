

'use strict';

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let env = require('env2')('.env');
let access_token;


let username;
let savedOrgs = []

router.get('/webhook', function(req, res) {
    res.send({'hej': 'hej'})

})
router.post('/webhook', function(req, res) {
    console.log('TESTAR')
    console.log(req.body)
})



router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
   
    request('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'redirect_uri=http://localhost:3000/dashboard&' + 'client_secret=' + process.env.REACT_APP_CLIENT_SECRET + '&' + 'code=' + temporaryCode,{
        method: 'POST',
        header: {
            'content-type': 'application/json'
         },
    }, function(error, response) {
        if(error) {
            res.send(error)
        } else {
            access_token = response.body
            res.send({express: response.body});
        }
    })
 });

 router.post('/settings', function(req, res) {
    //getHooks();
    username = req.body.username
    if(req.body.data === undefined) {
        res.send({'message': 'inget att spara'})
    } else {
        let orgsArray = req.body.data;
        orgsArray.forEach(element => {
            savedOrgs.push(element);
        });
        createWebhook()
        orgsSchema.findOneAndUpdate({'username': username},
        {username: req.body.username,
         organisations: req.body.data},
         {new: true},
        function(err, user) {
            if(err) {
                res.send(err)
            } else {
                if(user == null) {
                    let orgsArray = req.body.data;
                    orgsArray.forEach(element => {
                        savedOrgs.push(element);
                    });
                    let userAndOrgs = new orgsSchema({
                        username: req.body.username,
                        organisations: req.body.data
                    });
                    userAndOrgs.save(function(err, result) {
                        if(err) {
                            res.send(err)
                        } else {
                           // createWebhook()
                            res.send({'express': 'Successfull saved to database'});
                        }
                    }) 
                }
            }
        })
    }     
})

function getHooks(){
    return request('https://api.github.com/orgs/sofiasorganisationtest/hooks', {
        method: 'GET'
    }), function(err, res) {
        if(err) {
            console.log('FEEL')
            console.log(err)
        } else {
            console.log('rätt')
            console.log(res)
        }
    } 

}

function createWebhook() {
    let newAccessToken = access_token.substring(13, 53)
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'json',
            'User-Agent': 'sofiabjorkesjo'
        },
        body: JSON.stringify({
            'name': 'web',
            'active': true,
            "events": [
                "push",
                "issues"
              ],
            'config': {
              'url': 'http://f7c4e877.ngrok.io/main/webhook',
              'content_type': 'json'
            }
        })
    }

    request('https://api.github.com/orgs/sofiasorganisationtest/hooks?access_token=' + newAccessToken, options, function(err, res, body) {
        if(err) {
            console.log('ERROR')
            console.log(err)
        } else {
            console.log('BODY')
            console.log(body)
        }
    })
}

function ping() {
    let newAccessToken = access_token.substring(13, 53);
    let options = {
        method: 'POST',
        headers: {
            
            'User-Agent': 'sofiabjorkesjo'
        },
    }
    request('https://api.github.com/orgs/sofiasorganisationtest/hooks/23130988/pings?' + 'access_token=' + newAccessToken, options, function(err, res, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(res.statusCode  )
        }
    })
}

 router.post('/dashboard', function(req, res) {
    username = req.body.username;
    //ping()
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