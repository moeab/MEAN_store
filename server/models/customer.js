var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new mongoose.Schema({
	name : {
		type : String, 
		trim: true,
    	unique: true,
    	required: true
	},
	created_at : {
		type: Date, 
		default: new Date
	},
	order : [{
			qty : Number,
			ordered_at : {
				type : Date, 
				default : new Date
			},
			product : {
				type: Schema.Types.ObjectId, 
				ref: 'Product'
			}
		}]
})

var customer = mongoose.model('Customer', customerSchema);
