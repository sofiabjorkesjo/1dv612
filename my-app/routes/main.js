


'use strict';

module.exports = function(io) {

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let env = require('env2')('.env');
let access_token;


let username;
let savedOrgs = []
let webhooksName = []

router.get('/webhook', function(req, res) {
    res.send({'hej': 'hej'})
})

router.post('/webhook', function(req, res) {
    let event;
    if(req.body.issue) {
        console.log('ett nytt issue');
        event = 'issues '
    }
    let organisation = req.body.organization.login;
    let eventAndOrganisation = event + organisation;
    console.log(eventAndOrganisation)
    orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('hittade dessa;');
            let username = result[0].username;
            io.emit('test', username)
            io.emit('notifcation', 'Detta är en notifikation!')
            console.log('TEST TEST TEST');
        }
    })
//     //io.emit('message', 'hej från main')
//     let listenToOrgs = [];
//     savedOrgs.forEach(function(element) {
//         console.log(savedOrgs);
//        //FIZA ATT DEN GÅR IGENOM DE TVÅ GÅNGER ALTERNATIVT LÖS PÅ ANNAT SÄTT ELLER NÅTT
//         orgsSchema.find({organisations: element}, function(err, users) {
//             if(err) {
//                 console.log('TESddT')
//                 console.log(err);
//             } else {
//                 console.log('TEffffsdST')
//                 console.log(users);
//                 // for(let i = 0; i < users.length; i++) {
//                 //     console.log(users[i].organisations);
//                 // }
//                 // for(let i = 0; i < users.length; i++) {
//                 //     for(let j = 0; j < users[i].organisations.length; j++) {
//                 //         if(users[i].organisations[j] === req.body.organization.login) {
//                 //             //console.log(req.body)
//                 //             console.log('najs');
//                 //             let test = req.body.organization.login;
//                 //             io.emit('orgs', test);
//                 //         } else {
//                 //             console.log('matchar inte ')
//                 //         }
//                 //     }
//                 // }
           
//             }

//     })
// }
// )
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
            if(savedOrgs.includes(element)) {
                console.log('finns redan')
               } else {
                savedOrgs.push(element);
               }     
        });
        //console.log(savedOrgs);
        
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
                            createWebhook() 
                            res.send({'express': 'Successfull saved to database'});
                        }
                    }) 
                }
            }
        })
    }     
})

function getHooks(){
    console.log('HOOKS')
    let newAccessToken = access_token.substring(13, 53);
    request('https://api.github.com/orgs/sofiasorganisationtest/hooks?access_token=' + newAccessToken, {
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
    console.log(savedOrgs);
    savedOrgs.forEach(function(element) {
        let result;
        let events = [];
        if(element.includes('issues')) {
            let str = element;
            result = str.substring(7);
            console.log('issues finns med i meningen');
            events.push('issues');
            console.log(result);
        } else if(element.includes('push')) {
            let str = element;
            result = str.substring(5);
            events.push('push')
            console.log('push finns med i meningen');
            console.log(result)
        } else if (element.includes('release')) {
            let str = element;
            result = str.substring(8);
            events.push('release');
            console.log('release finns med i meningen');
            console.log(result);
        }
        webhooksName.push(element)
        console.log(events);
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
                events,
                'config': {
                'url': 'http://7e86b2af.ngrok.io/main/webhook',
                'content_type': 'json'
                }
            })
        }

        request('https://api.github.com/orgs/'+ result + '/hooks?access_token=' + newAccessToken, options, function(err, res, body) {
            if(err) {
                console.log('ERROR')
                console.log(err)
            } else {
                console.log('BODY')
                console.log(body)
            }
        })
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


return router;

//module.exports = router;

}