var connection = require('../connection');
var jwt    = require('jsonwebtoken');
var config = require('../config'); // get our config file
function Authenticate() {
    this.post = function(account,res) {
        connection.acquire(function(err, con) {
            var token = jwt.sign(account, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
        //return the information including token as JSON
            connection.acquire(function(err, con) {
                con.query("select * from user where username= ? and password = md5(?)",
                [account.username,account.password], 
                function(err, result) {
                    con.release();
                    if (result.length)
                        {
                            res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                            });
                        } else {
                            res.json({success:false, message:'Wrong username of password'});
                        }
                });
            });
        });
    };
}
module.exports = new Authenticate();
