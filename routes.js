var todo = require('./models/todo');
var user = require('./models/user');
var question = require('./models/question');
var authenticate = require('./models/authenticate');
 
module.exports = {
  configure: function(app) {
    //Question
    
    //Select data
    app.get('/question/', function (req, res) {
        question.get(res);
    });

    //Insert question
    app.post('/question/', function (req, res) {
        question.create(req.body,res);
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

    //Authentication
    app.post('/authenticate/', function (req, res) {
        authenticate.post(req.body, res);
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
