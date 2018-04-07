# CASHPOSITIVE

NODEJS ASSIGNMENT – MESSAGING APP

Assignment: Create a NodeJS application to provide REST APIs for a messaging
application.

Application Features:

The application would allow logged in users to send messages to each other:
1. POST /login
 	Should authenticate and log in user
	It can be done via https://radiant-retreat-64740.herokuapp.com/login either by form or by POSTMAN
	![](https://preview.ibb.co/hAXvGc/Screenshot_from_2018_04_07_17_39_24.png)

2. POST /register
	 Allows user to register herself on the platform with basic information
	 Username, password, firstname, lastname	
	User Can Navigate to GET https://radiant-retreat-64740.herokuapp.com/register fill up a form and call POST /register by submitting form.

3. POST /sendmessage
	 Allows user to send message to another user
	 Message subject, Message Content, ToUser
	 
	This End Point has to be Accessed using POSTMAN first the user has to POST /login giving in credentials via x-www-form-urlencoded 
	filling in username,password.
	
	Step 1 - 
	![](https://preview.ibb.co/hAXvGc/Screenshot_from_2018_04_07_17_39_24.png)
	
	Step2 - 
	![](https://preview.ibb.co/h1Cj9x/Screenshot_from_2018_04_07_17_25_31.png)
	
	Then POST https://radiant-retreat-64740.herokuapp.com/sendmessage on the link via POSTMAN with subject,content,toUser 		for sending message successfully a webpage is returned with Success or Error Alert which can be seen via the 		screenshot in the 5th Point.
	
	 
4. GET /
	Returns all messages sent to the logged in user
	
5. PUT /block/{username}
	Allows logged in user to block another user from sending messages to
	them
	![](https://preview.ibb.co/hrEWpx/Screenshot_from_2018_04_07_17_24_51.png)
	
	It alerts a blocked user as Invalid Request when he tries to send a message.
	![](https://preview.ibb.co/dJHj9x/Screenshot_from_2018_04_07_17_24_10.png)

### Version
1.0.0

### Usage
A Heroku Hosted Version is on - https://radiant-retreat-64740.herokuapp.com/

### Installation

MessagingApp requires [Node.js](https://nodejs.org/) v4+ to run.

```sh
$ npm install
```

```sh
$ npm start
```
