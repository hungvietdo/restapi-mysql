var connection = require('../connection');
 
function Authenticate() {
    this.post = function(account,res) {
        connection.acquire(function(err, con) {
            console.log(account.Q_ID);
            con.query('select * from question', function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };
}
module.exports = new Authenticate();
