var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	subject: {
		type: String,
		index:true
	},
	content: {
		type: String
	},
	toUser: {
		type: mongoose.Schema.Types.ObjectId,
            	ref: 'User'
	}
});

var Message = module.exports = mongoose.model('Message', MessageSchema);

