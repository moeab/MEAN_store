var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new mongoose.Schema({
	item : {
		type : String, 
		trim: true,
    	unique: true,
    	required: true
	},
	image : {
		type : String, 
		trim: true,
    	required: true
	},
	quantity : {
		type : Number, 
    	required: true
	},
	added_at : {
		type: Date, 
		default: new Date
	},
	_customer: {type: Schema.ObjectId, ref: "Customer"}
}) 

var product = mongoose.model('Product', productSchema);