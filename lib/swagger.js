var _ = require('lodash')

module.exports= function(){

	this.getSwaggerTemplate = function(){
		return {
		  "swagger": "2.0",
		  "info": {
		 	 "title": "express-faas",
		 	 "description": "", 
		 	 "version": "1.0"
		  },
		  "produces": ["application/json"],
		  "host": (process.env.HOST || "localhost") + ':' + (process.env.PORT || 3002 ), 
		  "basePath": "/",
		  "paths": {
		 	 "/test1": {
		 		 "get": {
		 			 "x-swagger-router-controller": "middleware-name1",
		 			 "operationId": "swagTest",
		 			 "tags": ["/test"],
		 			 "description": "",
		 			 "parameters": [ ],
		 			 "responses": {}
		 		 }
		 	 }
		  }
		}
	}

	this.addEndpoint = function(path, schema, swaggerDocument){
		var methods = ["get", "post","put", "delete", "options"]
		swaggerDocument.paths[path] = {}
		methods.map( (method) => {
			var header = {
				"in": "header",
				"description": "this will pass a certain configuration to the endpoint", 
				"required": false,
				"name": "faas-token"
			}
			var payload = {
				"in": "body",
				"description": "", 
				"required": false,
				"schema": {type:"object", properties:{}}
			}
			if( method != "get" )
				payload.schema.properties = Object.assign(
					_.get(schema, method+'.properties') || {},  
					{
						"faas-token":{
							type:"string", 
							enum:["f97ef98e"], 
							description:"this will set `req.config` (based on `config.js`)"
						}
					}
				)
			swaggerDocument.paths[path][method] = {
				 "operationId": "swagTest",
				 "tags": [path], 
				 "description": _.get(schema, 'description') || "",
				 "parameters": [header, payload],
				 "responses": _.get(schema,method+'.responses') || {'200':{}}
			}
		})

	}

	return this

}.apply({})
