var connection = require('../connection');
 
function Question() {
//Select data 
    this.get = function(res) {
        connection.acquire(function(err, con) {
            con.query('select * from question', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    }; 
//Insert data
     this.create = function(question, res) {
        connection.acquire(function(err, con) {
            con.query('insert into question set ?', question, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message:'Insert question failed.'});
                } else {
                    res.send({status: 0, message:'New question created successfully.'});
                }
            });
        });
    };    
//Update data
     this.update = function(question, res) {
        connection.acquire(function(err, con) {
            con.query('update question set ? where q_id = ?', [question, question.Q_ID], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message:'Update question failed.',err: err});
                } else {
                    res.send({status: 0, message:'Updated question  successfully.'});
                    console.log(question.Q_ID);

                }
            });
        });
    };    

}
module.exports = new Question();
