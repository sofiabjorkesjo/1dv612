

'use strict';

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let env = require('env2')('.env');
let access_token;


let username;

router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
    console.log(username)   
   
    request('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'redirect_uri=http://localhost:3000/dashboard&' + 'client_secret=' + process.env.REACT_APP_CLIENT_SECRET + '&' + 'code=' + temporaryCode,{
        method: 'POST',
        header: {
            'content-type': 'application/json'
         },
    }, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            access_token = response.body
            res.send({express: response.body});
        }
    })
 });

//  router.get('/settings', function(req, res) {
//     console.log('SETTINGS')
//     request('https://api.github.com/orgs/sofiasorganisationtest/hooks', {
//         method: 'GET',

//     }), function(error, response) {
//         if (error) {
//             console.log(error)
//         } else {
//             console.log(response)
//         }
//     }
// })
 

 router.post('/settings', function(req, res) {
    sparaWebbhook();
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
                            //sparaWebbhook()
                            getHooks();
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
            console.log(err)
        } else {
            console.log(res)
        }
    } 

}



function sparaWebbhook() {
    let options = {
        url: 'https://api.github.com/orgs/sofiasorganisationtest/hooks',
        // oauth: {
        //     access_token: access_token.substring(13, 53)
        // },
        method: 'POST',
        headers: {
            'Accept': 'json',
            'User-Agent': 'sofiabjorkesjo'
        },
        body: JSON.stringify({
            'name': 'web',
            'active': 'true',
            'config': {
              'url': 'http://localhost:8000/webhook',
              'content_type': 'json'
            }
        })
    }

    request(options, function(err, res, body) {

        if(err) {
            console.log(err)
        } else {
            console.log(res.body)
        }
    })
    // return request('https://api.github.com/orgs/sofiasorganisationtest/hooks', {
    //     method: 'POST',
    //     header: {
    //         'User-Agent': 'sb223fz-examination',
    //     }, 
    //     body: JSON.stringify  ({
    //         "name": "web",
    //         "active": true,
    //         "events": [
    //           "push",
    //           "pull_request"
    //         ],
    //         "config": {
    //           "url": "http://localhost:8000/webhook",
    //           "content_type": "application/json"
    //         }
    //       })
    // }, function(error, response){
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log(response.body)
    //     }
    // })  
}






 router.post('/dashboard', function(req, res) {
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