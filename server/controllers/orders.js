var mongoose = require('mongoose');
var Products = mongoose.model('Product');
var Customers = mongoose.model('Customer');
module.exports = (function(){
	return {
		addOrder: function(req, res){
			Customers.findOne({_id : req.body.id}).populate('order.product').exec(function(err, customer){
				Products.findOne({_id : req.body.item_id}, function(err, product){
					product.quantity -= req.body.quantity;
					product.save(function(err){
						if(err){
							console.log(err);
						} 
					})
				})
				var new_order = function(){
					customer.order.push({qty : req.body.quantity, product : req.body.item_id});
					customer.save(function(err){
						if (err){
							console.log(err);
						} else {
							res.json({});
						}
					})
				}
				var order_qty = function(i){
					customer.order[i].qty += req.body.quantity;
					customer.order[i].ordered_at = new Date();
					customer.save(function(err){
						if (err){
							console.log(err);
						} else {
							res.json({});
						}
					})
				}
				if (customer.order.length != 0){
					for (var i = 0; i < customer.order.length; i++) {
						if (customer.order[i].product._id != req.body.item_id){
							if (i == customer.order.length -1){
								return new_order()
							}
						} else {
							return order_qty(i);
						}
					}
				} else {
					return new_order();
				}
			})
		}
	}
})();