var express             = require('express')
var http 								= require('http')

var port                = process.env.PORT || 3002
var host                = process.env.HOST || '127.0.0.1'+( process.env.NODE_ENV == "production" ? ':'+port : '')

// Create a new Express application.
var app = express()

require('./lib')(app, { port: port, host: host })

// configure SSL if any
if ( process.env.SSL_PRIVKEY && process.env.SSL_CERT){
	var options             = {}
	options.key = fs.readFileSync( process.env.SSL_PRIVKEY ) // key.pem file
	options.cert= fs.readFileSync( process.env.CERT   ) // cert.pem file
	app.enable('trust proxy')
	httpolyglot.createServer(options, app)
}

module.exports = { 
	app:app, 
	server: app.listen(port, function(){
		console.log("listening on "+host)
	})
}
