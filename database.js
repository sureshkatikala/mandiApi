var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '103.21.59.201:3306',
    database : 'groctoov_grretail',
    user     : 'groctoov_merch',
    password : 'GROCTAURANT008#groctaurant008#',
});



module.exports = {
    getDatabaseData() {
        connection.connect(function(err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        
            console.log('Connected as id ' + connection.threadId);
        });
        connection.query('SELECT * FROM grret_orders WHERE ord_status="Under Processing"', function (error, results, fields) {
            if (error)
                throw error;
        
            results.forEach(result => {
                console.log(result);
            });
            return results
        }).then(data => {
            connection.end();
            return data
        })
        
        connection.end();
    }
}