var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	subject: {
		type: String,
		index:true
	},
	content: {
		type: String,
		required: true
	},
	toUser: {
		type: mongoose.Schema.Types.ObjectId,
            	ref: 'User'
	},
	fromUser : {
		type: mongoose.Schema.Types.ObjectId,
            	ref: 'User'
	}
});

var Message = module.exports = mongoose.model('Message', MessageSchema);

