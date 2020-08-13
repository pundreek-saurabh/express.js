const express = require ('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const members = require('./members')

//Middleware function has access to request and response of route, getting created below :-

//init middleware
//app.use(logger);

/*
app.get ('/',(req,res)=>{
    //res.send('<h1> Hey !!Pundreek Saurabh Srivastava </h1>');
    res.sendFile(path.join(__dirname,'public','index.html'));
})
*/
//handlebars- middlewares 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //here we are setting the view engine .


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage route
app.get('/',(req,res)=>res.render('index', {
    title: 'Member App',
    members
}));


//set a static folder:-(could not be executed successfully)
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT||5000;

app.listen (PORT, () => console.log(`Server started at ${PORT}`));

/*We get output "Cannot GET /" because we haven't created any route .
and "/" is the route here*/

//Let's create a route from line(3-5).
//nodemon is just a dev dependency 
