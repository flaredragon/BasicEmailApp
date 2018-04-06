var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');
var Message = require('../models/message');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	Message.find({ toUser : req.user._id})
	       .populate('fromUser')
	       .exec()
	       .then( (messages) => {
					console.log(messages);
					res.render('index',{user:req.user.username , messages: messages});
	});
});

router.post('/sendmessage', ensureAuthenticated, function(req, res){
	var subject  = req.body.subject,
	    content  = req.body.content,
	    receiver = req.body.receiver,
	    fromUser = req.user._id;
           User.findOne({username : receiver }).exec()
		.then((products) => { 
			if(products)
			  {    
				var msg = new Message({
					    subject: subject,
					    content: content,
					    toUser: products._id,
					    fromUser: fromUser			
					});
				msg.save(function(err,saved){
					if(err)
					throw err;
					else
					{
					console.log(saved);
					req.flash('success_msg', 'Message Sent');
					res.redirect('/');
					}
				    });
				}
			else 
			  { 
			        req.flash('error_msg','Invalid Receipient'); 
			        res.redirect('/');
				}
		})
		.catch((error) => {
			console.log(err);
			res.redirect('/');
	});	        	
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
