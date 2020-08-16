const moment = require('moment'); //moment is a third party package which gives day and date format.
//Middleware function has access to request and response of route, getting created below :-
//every time we make a request this middleware funciton is gonna run and give a output as "Hello" 
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`); //to get the url.  
    console.log('Hello');
    next();
};
module.exports = logger;