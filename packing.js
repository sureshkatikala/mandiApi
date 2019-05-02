var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '103.21.59.201',
    database: 'groctoov_grretail',
    user: 'groctoov_merch',
    password: 'GROCTAURANT008#groctaurant008#',
    multipleStatements: true,
});


function updateData(body) {

    let ingredientId = body.ingredient_id;
    let completeIngredient = ingredientId.split('_');
    let ord_id = completeIngredient[0];
    let item_id = completeIngredient[1];
    let only_ingredient_id = completeIngredient[2];
    
    body.is_weighed += 0;
    body.is_packed += 0;
    body.is_labelled += 0;

    return new Promise((resolve, reject) => {
        let sql = 'SELECT * FROM grret_orders WHERE ord_id=' + mysql.escape(ord_id);
        connection.query(sql /*+ '" AND rec_name="' + recipe + '"'*/, function (error, order_results, fields) {
            if (error)
                throw error;
            let recipe = order_results[0].rec_name.split(", ")[item_id - 1];
            //  console.log(recipe);
            let newQuery = 'SELECT * FROM grret_orderdetails WHERE ord_id=' + mysql.escape(ord_id) + 'AND rec_name=' + mysql.escape(recipe);

            connection.query(newQuery /*+ '" AND rec_name="' + recipe + '"'*/, function (error, ingredients_results, fields) {
                if (error)
                    throw error;
                let requiredIngredient = ingredients_results[only_ingredient_id - 1];
                databaseId = requiredIngredient.id;

                let updateQuery =  'UPDATE grret_orderdetails SET ing_is_weighed = ?, ing_pack_status = ?, ing_label_status = ? WHERE id = ?';
                connection.query(updateQuery, [body.is_weighed, body.is_packed, body.is_labelled, databaseId],function (err, result) {
                    if (err) throw err;
                    resolve(result.affectedRows);
                    // connection.end();
                });
            })
        })
    })
}

module.exports.updateData = updateData;