


'use strict';

module.exports = function(io) {

let router = require('express').Router();
let passport = require('passport');
let request = require('request');
let orgsSchema = require('../models/organisations');
let timeSchema = require('../models/time');
let env = require('env2')('.env');
let nodemailer = require('nodemailer');
let access_token;


let username;
let savedOrgs = [];
let webhooksName = [];
let allUsers = [];
let events = [];


function findAllUsers(req, res) {
    orgsSchema.find({}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            for(let i = 0; i < users.length; i++) {
                let obj = {
                    'username': users[i].username,
                    'email': users[i].email
                }
                allUsers.push(obj);
            }
           // console.log('test test ')
          //  console.log(allUsers);
            return allUsers;
        }
    })
}


findAllUsers();
io.on('connection', function(socket) {
    console.log('connectade till sockets');   
   // console.log(allUsers); 
    allUsers.forEach(function(element) {
       // console.log('hej: ' + element.username);
        socket.join(element.username);
    });
})

router.get('/webhook', function(req, res) {
    res.send({'hej': 'hej'})
})

router.post('/webhook', function(req, res) {
    let eventIssues;
    let eventPush;
    let eventRelease;

    if(req.body.issue) {
        let issueObj = {
            'event': 'issue',
            'subject': 'New issue',
            'action': req.body.action,
            'title': req.body.issue.title,
            'organization': req.body.organization.login,
            'repository': req.body.repository.name,
            'user': req.body.issue.user.login,
            'date': req.body.issue.created_at

        }
        console.log('ett nytt issue');
        console.log(issueObj);
        eventIssues = 'issues ';
        let organisation = req.body.organization.login;
        let eventAndOrganisation = eventIssues + organisation;
        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email)
                }
                
                usernames.forEach(function(element) {
                    io.sockets.in(element).emit(element, issueObj);
                })
                //sendEmail();
                email.forEach(function(element) {
                    let issue = 'en ny issue!'
                    //sendEmail(element, issue);
                })

                
            }
        })
    }
    
    if(req.body.ref) {
        console.log('new push här');
        eventPush = 'push ';
        let organisation = req.body.repository.organization;
        let eventAndOrganisation = eventPush + organisation;
        console.log(eventAndOrganisation);
        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log('DESSA MATCHAR');
                console.log(result);
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email)
                }
                
                usernames.forEach(function(element) {
                    io.sockets.in(element).emit(element, element+ ' detta är en notikation till dig! Nytt push event!');
                })

                email.forEach(function(element) {
                    let push = 'nytt push event!'
                    //sendEmail(element, push);
                })
            }
        })
    }
  
    if(req.body.release) {
        console.log('new release');
        eventRelease = 'release ';
        let organisation = req.body.organization.login;
        let eventAndOrganisation = eventRelease + organisation;
        console.log(eventAndOrganisation);
        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                console.log(err);
            } else {

                console.log(result);
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email);
                }
                
                usernames.forEach(function(element) {
                    io.sockets.in(element).emit(element, element+ ' detta är en notikation till dig! En ny release!');
                })

                email.forEach(function(element) {
                    let release = 'ny release!'
                    //sendEmail(element, release);
                })
            }
        })
    }
})
router.post('/dashboard/events', function(req, res) {

    let time;
    let timeString;
    let savedTime;
    
    request('https://api.github.com/orgs/sofiasorganisationtest/events', {
        method: 'GET',
        headers: {
            'User-Agent': 'sofiabjorkesjo'
        }
    }, function(error, result, body) {
        let parsedBody;
        if(error) {

            console.log(error);
        } else {

            parsedBody = JSON.parse(body);
           
            timeSchema.findOne({username: req.body.username}, function(err, user) {
                if(err) {
                    console.log(err);
                } else {
                    time = user.time;
                    timeString = JSON.stringify(time);
                    savedTime = JSON.parse(timeString);
                }
            })
            orgsSchema.findOne({username: req.body.username}, function(err, username) {
                if(err) {
   
                    console.log(err);
                } else {
             
                    console.log(username.organisations);
                    username.organisations.forEach(function(org) {
                        if(org.includes('issues')) {
                            console.log('issues !');
    
                            for(let i = 0; i < parsedBody.length; i ++) {
                                if(parsedBody[i].type === 'IssuesEvent' && parsedBody[i].created_at > savedTime) {
                                    console.log('aaaaaa :D');
                                    console.log(parsedBody[i].created_at);
                                    events.push(parsedBody[i]);    
                                }
                            }        
                        }

                        if(org.includes('push')) {
                            console.log('push !');
                            for(let i = 0; i < parsedBody.length; i ++) {
                                if(parsedBody[i].type == 'PushEvent' && parsedBody[i].created_at > savedTime) {
                                    console.log('bbbb :D');
                                    events.push(parsedBody[i]);    
                                }
                            }  
                        }

                        if(org.includes('release')) {
                            console.log('release !');
                            for(let i = 0; i < parsedBody.length; i ++) {
                                if(parsedBody[i].type == 'ReleaseEvent' && parsedBody[i].created_at > savedTime) {
                                    console.log('cccc :D');
                                    events.push(parsedBody[i]);    
                                }
                            } 
                        }
                      
                    })
                    res.send({'events': events});

                }
            })
        }
    });  
})


router.post('/dashboard/active', function(req, res) {
    console.log('testtest hej hej');
    console.log(req.body);
    timeSchema.findOneAndUpdate({username: req.body.username},{time: req.body.time}, {new: true}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            if(user == null) {
                let time = new timeSchema({
                    time: req.body.time,
                    username: req.body.username
                });
            
                time.save(function(err, user) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('sparat i databsen!')
                        console.log(user);
                    }
                })  
            } else {
                console.log('finns ');
                console.log(user);
                
            }
        }
    })
})



router.get('/:code', function (req, res, next) {
    //window.location.reload(true);
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
         organisations: req.body.data,
        email: req.body.email},
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
                        organisations: req.body.data,
                        email: req.body.email
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
                'url': 'http://0f7b6e04.ngrok.io/main/webhook',
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

var transporter = nodemailer.createTransport({
    host: 'smtp@gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'sofiiiabjorkesjo@gmail.com',
        pass: 'sussiecleo'
    }
});

function sendEmail(email, subject) {
        console.log(email);
        console.log('sending email!');
        var mailOptions = {
            from: 'sofiiiabjorkesjo@gmail.com',
            to: email,
            subject: 'Notification' + subject,
            text: 'Du har en ny notifikation!' + subject
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log('Message sent:' + info.response);
            };
        });

}

 router.post('/dashboard', function(req, res) {
    username = req.body.username;
    orgsSchema.findOne({'username': username}, function(err, user) {
        if(err) {
            console.log(err)
        } else {
            if(user === null) {
                let newUser = new orgsSchema({
                    username: req.body.username,
                    organisations: [],
                    email: req.body.email
                });
                newUser.save(function(err, user) {
                    if(err) {
                        console.log('error blev de nu')
                        console.log(err);
                    } else {
                        console.log(user);
                        console.log('resultatet här');

                        let result = {
                            'orgs': '',
                            'user': newUser.username
                        }
                        console.log(result);
                        res.send(result);
                    }
                })
            } else {
                let result = {
                    'orgs': user.organisations,
                    'user': user.username
                 }
                console.log(result)
                res.send(result)
            }
        }
    })

 });


return router;

//module.exports = router;

}