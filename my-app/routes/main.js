



'use strict';

module.exports = function(io) {

let router = require('express').Router();
let passport = require('passport');
let request = require('request-promise');
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
let allorgs = [];
let allorgs2 = [];


function findAllUsers(req, res) {
    orgsSchema.find({}, function(err, users) {
        if (err) {
            res.status(404).send({'error':err, 'message': 'Not found'});
        } else {
            for(let i = 0; i < users.length; i++) {
                let obj = {
                    'username': users[i].username,
                    'email': users[i].email
                }
                allUsers.push(obj);
            }
            return allUsers;
        }
    })
}

function findallorgs() {
    orgsSchema.find({}, function(err, users) {
        if (err) {
            res.status(404).send({'error': err, 'message': 'Not found'});
        } else {
            for(let i = 0; i < users.length; i++) {
                let orgs = {
                    'org': users[i].organisations
                }
                allorgs.push(orgs);
            }
     
            allorgs.forEach(function(user) {
                user.org.forEach(function(value) {
                    if(value.includes('push')) {
                        let result = value.substring(5);              
                        if(allorgs2.includes(result)) {
                            console.log('finns redan');
                        } else {
                            allorgs2.push(result);
                        }
                    }

                    if(value.includes('issues')) {
                        let result = value.substring(7);
                        if(allorgs2.includes(result)) {
                            console.log('finns redan');
                        } else {
                            allorgs2.push(result);
                        }
                    }

                    if(value.includes('release')) {
                        let result = value.substring(8);
                        if(allorgs2.includes(result)) {
                            console.log('redan');
                        } else {
                            allorgs2.push(result);
                        }
                    } 
                })
            })
            return allorgs;
        }
    })
}

let connect = false;
findAllUsers();
findallorgs();
io.on('connection', function(socket) {
console.log('connectade till sockets');  
connect = true; 
    allUsers.forEach(function(element) {
        socket.join(element.username);
        console.log(socket.rooms);
        // if(socket.rooms.indexOf(room) >= 0) {
        //     console.log('sadaddsadsa adsajfa djaldj');
        // }
    });
    socket.on('disconnect', function () {
        connect = false;
        console.log('disconnected');
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
            'date': req.body.issue.created_at,
            'id': req.body.issue.id

        }
        eventIssues = 'issues ';
        let organisation = req.body.organization.login;
        let eventAndOrganisation = eventIssues + organisation;
        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                res.send({'error':err});
            } else {
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email)
                }
                console.log('aaadaa');
                
                usernames.forEach(function(element) {
                    console.log('sadadad');
                    console.log(element);
          
                        console.log('den ska skicka socket');
                        io.sockets.in(element).emit(element, issueObj)

                        console.log('den ska skicka mail')
                        email.forEach(function(element) {
                            let issue = ' en ny issue!'
                            sendEmail(element, issue);
                        })

                })
 
            }
        })
    }
    
    if(req.body.ref) { 
        let pushObj = {
            'event': 'push',
            'subject': 'New push',
            'date': req.body.created_at,
            'user': req.body.pusher.name,
            'id': req.body.commits.id

        }
        eventPush = 'push ';
        let organisation = req.body.repository.organization;
        let eventAndOrganisation = eventPush + organisation;

        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                res.send({'error':err});
            } else {
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email)
                }
                
                usernames.forEach(function(element) {
                    io.sockets.in(element).emit(element, pushObj);
                })

                email.forEach(function(element) {
                    let push = ' nytt push event!'
                    sendEmail(element, push);
                })
            }
        })
    }
  
    if(req.body.release) {
      
        let releaseObj = {
            'event': 'release',
            'subject': 'New release',
            'action': req.body.action,
            'date': req.body.release.created_at,
            'user': req.body.release.author.login,
            'id': req.body.release.author.id

        }
        eventRelease = 'release ';
        let organisation = req.body.organization.login;
        let eventAndOrganisation = eventRelease + organisation;

        orgsSchema.find({organisations: eventAndOrganisation}, function(err, result) {
            if(err) {
                res.send({'error':err});
            } else {
                let usernames = [];
                let email = [];
                for(let i = 0; i < result.length; i++) {
                    usernames.push(result[i].username);
                    email.push(result[i].email);
                }
                
                usernames.forEach(function(element) {
                    io.sockets.in(element).emit(element, releaseObj);
                })

                email.forEach(function(element) {
                    let release = 'ny release!'
                    sendEmail(element, release);
                })
            }
        })
    }
})


router.post('/dashboard/events', function(req, res) {
    let time;
    let timeString;
    let promises = [];
    let promise;
    let allOrgsEvents = [];
    let savedTime;
    let filterdEvents = [];

    allorgs2.forEach(function(element) {
        var options = {
            uri: 'https://api.github.com/orgs/' + element + '/events',
            headers: {
                'User-Agent': 'sofiabjorkesjo'
            }
        };
        
        promise = request(options);
  
        promises.push(promise);
    });

    Promise.all(promises)
    .then(function (events) {
        allOrgsEvents = events.map(event => JSON.parse(event));
        allOrgsEvents = [].concat.apply([], allOrgsEvents);
     
        return timeSchema.findOne({username: req.body.username});
    })
    .then(function(user) {
        time = user.time;
        timeString = JSON.stringify(time);
        savedTime = JSON.parse(timeString);
        return orgsSchema.findOne({username: req.body.username});
    })
    .then(function(user) {
        user.organisations.forEach(function(org) {
            let date1;
            let date2;
            if(org.includes('issues')) {
                for(let i = 0; i < allOrgsEvents.length; i++) {
                    date1 = new Date(allOrgsEvents[i].created_at);
                    date2 = new Date(savedTime);
                    if(allOrgsEvents[i].type === 'IssuesEvent' && date1.getTime() > date2.getTime()) {
                        filterdEvents.push(allOrgsEvents[i])
                    }
                }
            }
            if(org.includes('push')) {
                for(let i = 0; i < allOrgsEvents.length; i++) {
                    date1 = new Date(allOrgsEvents[i].created_at);
                    
                    date2 = new Date(savedTime);
                    if(allOrgsEvents[i].type === 'PushEvent' && date1.getTime() > date2.getTime()) {
                        filterdEvents.push(allOrgsEvents[i])
                    }
                }
            }
            if(org.includes('release')) {
                for(let i = 0; i < allOrgsEvents.length; i++) {
                    date1 = new Date(allOrgsEvents[i].created_at);
                    date2 = new Date(savedTime);
                    
                    if(allOrgsEvents[i].type === 'ReleaseEvent' && date1.getTime() > date2.getTime()) {
                        filterdEvents.push(allOrgsEvents[i])
                    }
                }
            }
        })
        res.send({'events': filterdEvents, 'user': req.body.username})
    });
})

    
router.post('/dashboard/active', function(req, res) {
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
                    }
                })  
            } else {
                console.log('finns ');               
            }
        }
    })
})



router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
   
    request('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'client_secret=' + process.env.REACT_APP_CLIENT_SECRET + '&' + 'code=' + temporaryCode,{
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
    username = req.body.username
    if(req.body.data === undefined) {
        res.send({'message': 'inget att spara'})
    } else {
        let orgsArray = req.body.data;
        orgsArray.forEach(element => {       
            if(savedOrgs.includes(element)) {
                console.log('finns redan sparat i settings')
               } else {
                savedOrgs.push(element);
               }     
        });
        
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

function createWebhook() {
    savedOrgs.forEach(function(element) {
        let result;
        let events = [];
        if(element.includes('issues')) {
            let str = element;
            result = str.substring(7);
            savedOrgs.push(result);
            events.push('issues');
        } else if(element.includes('push')) {
            let str = element;
            result = str.substring(5);
            savedOrgs.push(result);
            events.push('push')
        } else if (element.includes('release')) {
            let str = element;
            result = str.substring(8);
            savedOrgs.push(result);
            events.push('release');
        }
        webhooksName.push(element)
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
                'url': 'http://1cc98376.ngrok.io/main/webhook',
                'content_type': 'json'
                }
            })
        }

        request('https://api.github.com/orgs/'+ result + '/hooks?access_token=' + newAccessToken, options, function(err, res, body) {
            if(err) {
                console.log(err)
            } else {
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
        user: 'sb223fz@gmail.com',
        pass: '1dv612Skola'
    }
});

function sendEmail(email, subject) {
        console.log('sending email!');
        var mailOptions = {
            from: 'sb223fz@gmail.com',
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
                        res.send({'error': err});
                    } else {

                        let result = {
                            'orgs': '',
                            'user': newUser.username
                        }
                        res.send(result);
                    }
                })
            } else {
                let result = {
                    'orgs': user.organisations,
                    'user': user.username
                 }
                res.send(result)
            }
        }
    })

 });


return router;


}