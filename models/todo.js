var connection = require('../connection');
 
function Todo() {
 this.get = function(res) {
    connection.acquire(function(err, con) {
         con.query('select * from todo_list', function(err, result) {
             con.release();
        res.send(result);
      });
     });
  }; 
  this.create = function(todo, res) {
    connection.acquire(function(err, con) {
      con.query('insert into todo_list set ?', todo, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'TODO creation failed'});
        } else {
          res.send({status: 0, message: 'TODO created successfully'});
        }
      });
    });
  };   
}
module.exports = new Todo();
