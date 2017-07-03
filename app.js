var express             = require('express')
var http 								= require('http')

var port                = process.env.PORT || 3002
var host                = process.env.HOST || '127.0.0.1:'+port

// Create a new Express application.
var app = express()

require('./lib')(app, { port: port, host: host })

module.exports = { 
	app:app, 
	server: app.listen(port, function(){
		console.log("listening on "+host)
	})
}
