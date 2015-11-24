var mongoose = require('mongoose');
var Customers = mongoose.model('Customer');
module.exports = (function(){
	return {
		getAll: function(req, res){
			Customers.find({}).populate('order.product').exec(function(err, result){
				if(err){
					console.log(err);
				} else {
					res.json(result);
				}
			})
		},
		addCustomer: function(req, res){
			var customer = new Customers({name : req.body.name, created_at : new Date()})
			customer.save(function(err){
				if (err){
					console.log(err)
				} else {
					res.json({});
				}
			})
		},
		removeCustomer: function(req, res){
			Customers.remove({name : req.params.name}, function(err){
				if (err){
					console.log(err);
				} else {
					res.json({});
				}
			})
		}
	}
})();