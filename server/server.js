const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors  = require('cors');
const logger = require('morgan');
// const massive = require('massive');
// const server_config = require('./config'); 

//** Initialize express ---------**
const app = express();

//Massive middleware initializer to postgressql
// massive({
//     host:'prodexstral.cculfo6ohmzl.us-west-1.rds.amazonaws.com',
//     port:5432,
//     database:'prodexstral',
//     user:process.env.user || server_config.user,
//     password:process.env.password || server_config.password
   
// }).then(db => app.set('db',db));

//** Port numbers ---------**
const port = process.env.PORT || 15000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Log requests to server console
// app.use(logger(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(logger(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));

//react-production html serving function
app.use(express.static(path.join(__dirname, 'shards-master')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'shards-master', 'index.html'));
  });

//** Endpoints ---------**


//** Server testing endpoints ---------**
app.get('/getTest',function(req,res){
    console.log('req');
    return res.status(200).send(`test successful`);
});

app.post('/postTest',function(req,res){
    console.log(req);
    return res.status(200).send(`test successful`);
});

app.put('/putTest',function(req,res){
    console.log(req);
    return res.status(200).send(`test successful`);
});

app.delete('/delTest',function(req,res){
    console.log('req');
    return res.status(200).send(`test successful`);
});

app.listen(port,()=>console.log(`Listening on port ${port}`));