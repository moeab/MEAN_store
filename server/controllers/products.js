var mongoose = require('mongoose');
var Products = mongoose.model('Product');

module.exports = (function(){
	return {
		getProducts: function(req, res){
			Products.find({}, function(err, result){
				if(err){
					console.log(err);
				} else {
					res.json(result);
				}
			})
		},
		addProduct: function(req, res){
			var product = new Products(req.body);
			product.save(function(err){
				if(err){
					res.json(err.errors);
				} else {
					res.json({});
				}
			})
		}
	}
})();