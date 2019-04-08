var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '103.21.59.201',
    database: 'groctoov_grretail',
    user: 'groctoov_merch',
    password: 'GROCTAURANT008#groctaurant008#',
    multipleStatements: true,
});



function getDatabaseData() {
    return new Promise((resolve, reject) => {
        connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }

            console.log('Connected as id ' + connection.threadId);
        });

        connection.query('SELECT * FROM grret_orders WHERE ord_status="Under Processing"', function (error, results, fields) {
            if (error)
                throw error;

            let returnObject = {};
            returnObject.success = true;
            returnObject.all_order = results.map(result => {
                let allOrderObject = {};
                allOrderObject.order_id = result.ord_id;
                allOrderObject.order_number = result.id;

                let recipeNames = result.rec_name.split(", ");
                let recipeSKUs = result.rec_sku.split(", ");

                allOrderObject.order = recipeNames.map((recipe, index) => {
                    orderObject = {
                        item_order_id: result.ord_id + "_" + (index + 1),
                        order_id: result.ord_id,
                        cus_phone: result.cus_phone,
                        cus_name: result.cus_name,
                        cus_address: result.cus_address,
                        mer_id: result.mer_id,
                        Recipe_SKU: recipeSKUs[index],
                        Recipe_Name: recipe,
                        rec_cuisine: result.rec_cuisine,
                        Recipe_Servings: result.rec_serving,
                        Recipe_Quantity: result.rec_qty,
                        rec_price: result.rec_price,
                        sub_total: result.sub_total,
                        discount_percentage: result.discount_percentage,
                        discount: result.discount,
                        new_cus_discount: result.new_cus_discount,
                        sgst: result.sgst,
                        cgst: result.cgst,
                        del_charges: result.del_charges,
                        total_price: result.total_price,
                        grcash: result.grcash,
                        walletcash: result.walletcash,
                        final_amount: result.final_amount,
                        payment_type: result.payment_type,
                        payment_status: result.payment_status,
                        add_notes: result.add_notes,
                        del_time: result.del_time,
                        order_at: result.order_at,
                        order_cancel_till: result.order_cancel_till,
                        Order_Status: result.order_Status,
                        Order_Number: result.order_number,
                        delivery_expected: result.delivery_expected,
                        dispatch_real: result.dispatch_real,

                    };
                    return getIngredients(result.ord_id, recipe).then(ingredients_results => {
                        orderObject.ingredients = ingredients_results;
                        // console.log(orderObject)
                        return orderObject;
                    })
                    // return orderObject;
                })
                Promise.all(allOrderObject.order)
                .then(data => {
                    console.log(data)
                })

                
                // console.log(allOrderObject.order)
                return allOrderObject;
                // console.log(result);
            });
            connection.end();
            resolve(returnObject);
        });
    })
}

function getIngredients(ord_id, recipe) {
    return new Promise((resolve, reject) => {

        connection.query('SELECT * FROM grret_orderdetails WHERE ord_id="' + ord_id + '" AND rec_name="' + recipe + '"', function (error, ingredients_results, fields) {
            if (error)
                throw error;
            resolve(ingredients_results)

        })
    })

}

module.exports.getDatabaseData = getDatabaseData;