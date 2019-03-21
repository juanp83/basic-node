
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


// --> 7)  Mount the Logger middleware here

app.use(function(req, res, next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.urlencoded({ extended: false}));

/** 1) Meet the node console. */


/** 2) A first working Express Server */

// app.get('/', function(req, res){
//         res.send('Hello Express')
//         });

/** 3) Serve an HTML file */

var indexPath = __dirname + '/views/index.html';

app.get('/', function(req, res){
        res.sendFile(indexPath)
        });

/** 4) Serve static assets  */

var publicPath = __dirname + '/public';

app.use(express.static(publicPath));

/** 5) serve JSON on a specific route */

app.get('/json', function(req,res){
  var obj = {"message": "Hello json"}
  if (process.env.MESSAGE_STYLE === 'uppercase') {
      obj.message = obj.message.toUpperCase();
      }
  res.json(obj)
});

/** 6) Use the .env file to configure the app */


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !



/** 8) Chaining middleware. A Time server */

app.get('/now', function(req, res, next){
  var time = new Date().toString();
  req.time = time;
  next();
}, function(req, res){
        var timeObj = {time: req.time};
        res.json(timeObj);
        })

/** 9)  Get input from client - Route parameters */

app.get('/:word/echo', function(req, res){
  var wordObj={echo: req.params.word}
  res.json(wordObj);
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.route('/name').get(function(req, res){
  var nameObj = {name: req.query.first + ' ' + req.query.last}
  res.json(nameObj);
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

app.post('/name', function(req, res){
  var newNameObj = {name: req.body.first + ' ' + req.body.last};
  res.json(newNameObj);
});


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
