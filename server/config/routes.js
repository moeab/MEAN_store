var customer = require('./../controllers/customers.js');
var product = require('./../controllers/products.js');
var order = require("./../controllers/orders.js");
module.exports = function(app){
	app.get('/get_customers', customer.getAll);
	app.post('/new_customer', customer.addCustomer);
	app.delete('/remove_customer/:name' , customer.removeCustomer);
	app.get('/get_products', product.getProducts);
	app.post('/add_product', product.addProduct);
	app.put('/new_order', order.addOrder);
}