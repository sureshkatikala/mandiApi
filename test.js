var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '103.21.59.201',
    database: 'groctoov_grretail',
    user: 'groctoov_merch',
    password: 'GROCTAURANT008#groctaurant008#',
    multipleStatements: true,
});



module.exports = {
    getDatabaseData() {
        return new Promise((resolve, reject) => {
            connection.connect(function (err) {
                if (err) {
                    console.error('Error connecting: ' + err.stack);
                    return;
                }

                console.log('Connected as id ' + connection.threadId);
            });
            let result = {
                ord_id: '20180927104056website'
            }
            let recipe = "Dal Makhani";
            console.log('SELECT * FROM grret_orderdetails WHERE ord_id=' + result.ord_id + ' AND rec_name=' + recipe + '');

            let orderObject = {};
            connection.query('SELECT * FROM grret_orderdetails WHERE ord_id="' + result.ord_id + '" AND rec_name="' + recipe + '"', function (error, ingredients_results, fields) {
                if (error)
                    throw error;
                orderObject.ingredients = ingredients_results;
                console.log(orderObject)
                // return orderObject;
                resolve(orderObject);

            })
        })
    }
}