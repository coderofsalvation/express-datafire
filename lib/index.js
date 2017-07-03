require('safer-json-stringify')
const httpolyglot         = require('httpolyglot')
const express             = require('express')
const bodyParser          = require('body-parser')
const _                   = require('lodash')
const fs                  = require('fs')
const fileManager 				= require('express-file-manager')
const wt                  = require('wt')
const swaggerUi           = require('swagger-ui-express');
const request 						= require('request')
const statusMonitor       = require('express-status-monitor')({title:"DataFire"});
const datafire 						= require('./middleware/datafire')

var cache = {
	datafire: (req, res, next) => next(), 
	openapi: {}
}

process.on('uncaughtException', function (exception) {
	console.error(exception)
	datafire.middleware = cache.datafire // datafire middleware error,  revert to previous
})

//process.stderr._write = process.stderr.write
//process.stderr.write = function(text){
//	process.stderr._write.apply(process.stderr, arguments)
//}

module.exports = function(app, opts){
  var authenticate        = (req, res, next) => next()

  if( process.env.AUTH_USER && process.env.AUTH_PASSWORD )
    authenticate        = require('./middleware/auth')(
      process.env.AUTH_USER, 
      process.env.AUTH_PASSWORD
    )

  var commit              = ""

  // enable CORS
  app.use( require('./middleware/cors.js') )

  if( process.AUTH_ENDPOINTS ) app.use( authenticate )

  // allow big images
  app.use( bodyParser.json({limit:'50mb'}) ) 
  app.use( bodyParser.urlencoded({limit:'50mb', extended:true}) ) 

  // parse application/json bodies
  app.use( bodyParser.json() )

  //// track API calls using google universal analytics
  //app.use( require('universal-analytics-api-middleware')({
  //    "GA_TOKEN":"UA-92996013-1",
  //    "GA_BUFFERTIME": 5000,
  //    "name":"penna api"
  //  })
  //)
	//// report cpu usage every 30 secs
	//cpuUsage( 1000, function( load ) {
	//	for( var i in process.app ) if( process.app[i].ua ) process.app[i].ua.event("cpu", load )
	//})

  // settings editor
	app.use('/admin', authenticate, fileManager(process.cwd()+'/data'))
	// patch
	// home/sqz/projects/express-datafire-middleware/node_modules/express-file-manager/index.js
	fs.createWriteStream = _.wrap(fs.createWriteStream,  function(original, file, opts ){
		if( typeof opts == "string" ) opts = undefined
		return original(file, opts)
	})

	// live status
	app.use(statusMonitor);

	var reloadDataFire = function(){
		cache.datafire = datafire.middleware // backup old middleware
		setTimeout(datafire.init, 500 )
	}

  // watch local file changes
  var dirs = [process.cwd()+'/data']
  if( opts.repository ) dirs.push( opts.repository.split("/").pop().replace(/(\.git)/, '') )
  var watcher = wt.watch(dirs)
  watcher.on('all', reloadDataFire )

	app.get('/*', swaggerUi.serve, function(req, res, next){ 
		if( req.url == '/' || req.url.match(/\/swagger.*/) != null ){
			if( datafire.inited ){
				request('http://'+opts.host+'/openapi.json', function(err, resWithBody, body){
					body = JSON.parse(body)
					body.host = opts.host
					body.info.title = "DataFire"
					body.info.description  = "* [editor](/admin)\n"
					body.info.description += "* [console](/console)\n"
					body.info.description += "* [status monitor](/status)\n"
					body.info.description += "* [export endpoints](/export)\n"
					body.info.description += "* [swagger openapi.json](/openapi.json)\n"
					cache.openapi = body
					swaggerUi.setup(body)(req, res, next) 
				})			
			}else swaggerUi.setup(cache.openapi)(req, res, next) 
		}else next()
	})

	// show log
	app.get('/console', authenticate, require('./middleware/console') )
	var logToString = function(data){
		process.log = new Date().toISOString() + ' ' + (typeof data == "string" ?  data  : JSON.stringify(data, null, 2) ) + "\n" + (process.log || "")
		process.log = process.log.split("\n").splice(0, 100).join("\n")
	}
	console.log = _.wrap( console.log, function(original, data){
		original(data)
		logToString(data)
	})
	console.dir = console.log

	// allow download of firebase functions
	app.get('/export', authenticate, function(req, res, next){
		require('zip-dir')( process.cwd()+'/data', function (err, buffer) {
			res.set("Content-Disposition", "attachment;filename=datafire-export.zip");
			res.set("Content-Type", "application/octet-stream");
			res.send(buffer)
		});	
	})

	// bind datafire middleware (reference to it, so it'll support dynamic updates )
	app.use( (req, res, next) => datafire.middleware(req, res, next) )

	reloadDataFire()

}
