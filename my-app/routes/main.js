'use strict';

let router = require('express').Router();
let passport = require('passport');
let request = require('request');

router.get('/:code', function (req, res, next) {
    let temporaryCode = req.url.substring(1);
    request('https://github.com/login/oauth/access_token?' + 'client_id=80168115df9ea9d87e1f&' + 'redirect_uri=http://localhost:3000/dashboard&' + 'client_secret=5a1aafce5111dc000f94b189de7043cfb3e2cc09&' + 'code=' + temporaryCode,{
        method: 'POST',
        header: {
            'content-type': 'application/json'
         },
    }, function(error, response, body) {
        if(error) {
            console.log(error)
        } else {
            console.log(response.body);
        }
    })  
 }); 


module.exports = router;