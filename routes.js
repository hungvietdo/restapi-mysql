var todo = require('./models/todo');
var user = require('./models/user');
var question = require('./models/question');
var authenticate = require('./models/authenticate');
var jwt    = require('jsonwebtoken');
var username = '';
module.exports = {
  configure: function(app) {
    //Question
    //Authentication
    app.post('/authenticate/', function (req, res) {
        authenticate.post(req.body, res);
    });

    //Check token
    app.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        // decode token
        if (token) {
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    username = req.decoded.username;
                    next();
                }
            });
        } else {
            // if there is no token
            // return an error
           return res.json({ success: false, message: 'Please provide a token.' });
        }
    });


//------------------------------------------
//If authenticated, below actions can be run
//------------------------------------------


    //Select data
    app.get('/question/', function (req, res) {
        question.get(res);
    });

    //Insert question
    app.post('/question/', function (req, res) {
        question.create(
          ({username:username,
            title:req.body.title,
            content:req.body.content}),
          res);
        console.log(req.body);
    });

    //Update data
    app.put('/question/', function (req, res) {
        question.update(req.body, res);
    });

    //Delete data
    app.delete('/question/', function (req, res) {
        question.delete(req.params.id, res);
    });

    
    //User
    app.get('/todo/', function(req, res) {
        todo.get(res);
    });
 
    app.post('/todo/', function(req, res) {
      todo.create(req.body, res);
    });
 
    app.get('/user/', function(req, res) {
      user.get(res);
    });
 
    app.delete('/todo/:id/', function(req, res) {
      user.delete(req.params.id, res);
    });
  }
};
