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
	       .then( (messages,err) => {
					if(err)
					console.log(err);

					//console.log(messages);
					res.render('index',{user:req.user.username , messages: messages});
	});
});

//Sending Message
router.post('/sendmessage', ensureAuthenticated, function(req, res){
	var subject  = req.body.subject,
	    content  = req.body.content,
	    receiver = req.body.receiver,
	    fromUser = req.user._id;	
           User.findOne({username : receiver }).exec()
		.then((products,err) => {
			if(err)
			throw(err);
 
			if(products)
			  { 
				if(req.user.isBlockedBy.indexOf(products._id.toString())>-1)
				{ 
					req.flash('error_msg', 'Invalid Request'); //Blocked User
					res.redirect('/');
				}
			   	else
				{
				var msg = new Message({
					    subject: subject,
					    content: content,
					    toUser: products._id,
					    fromUser: fromUser			
					});
				msg.save(function(err,saved){
					if(err)
					{
						req.flash('error_msg','Content is Required');
						res.redirect('/');
					}
					else
					{
						console.log(saved);
						req.flash('success_msg', 'Message Sent');
						res.redirect('/');
					}
				    });
				}
			   }
			else 
			  { 
			        req.flash('error_msg','Invalid Receipient'); 
			        res.redirect('/');
			  }
		})
		.catch((err) => {
			console.log(err);
			req.flash('error_msg','Invalid Request');
			res.redirect('/');
	});	        	
});

//Blocking a User
router.put('/block/:user', ensureAuthenticated, function(req, res){
	var username = req.params.user;
	console.log(username);
	User.findOne({username : username}).exec()
	.then( (user,err) => {
		if(err)
		throw(err);
		
		console.log('user is' + user);
		var x = req.user._id.toString();
		console.log(x);
		if(user.isBlockedBy.indexOf(x)>-1)
			{
			res.render('index',{user:req.user.username,success_msg:'Already Blocked'});
			}
		else {
			user.isBlockedBy.push(x);
			//console.log(user.isBlockedBy);
			var finalList = user.isBlockedBy; //List of Users has been blocked by.
			User.where({ _id: user._id }).update({ $set: { isBlockedBy: finalList }})
			.then( (response,err) => {
			//console.log(finalList);
			if(err)
			throw(err);			
			res.render('index',{user:req.user.username,success_msg:'Blocked'});
			});
		}
	})
	.catch((error) => {
			console.log(err);
			res.render('index',{user:req.user.username,error_msg:'Invalid Request'});
	});	        	
});

//Authentication Check
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
