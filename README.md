Express FaaS
============

<img src="https://github.com/coderofsalvation/express-faas/blob/master/logo.png" width="12%">

Serverless development using live-editing of endpoints (locally and/or from remote repo).

## Usage

    // Create a new Express application.
    var express             = require('express')
    var app = express()
 
    require('express-faas')(app, {
      repository: "https://github.com/coderofsalvation/expressa-faas-endpoints", // OPTIONAL
      refresh_interval: 5000                                                     // OPTIONAL
      url_docs: '/'                                                              // OPTIONAL
    })

    app.listen(port, function(){
      console.log("listening on "+host)
    })

BOOM! 

    $ node app.js --inspect=0.0.0.0:3003

* surf to `/admin` and you can edit endpoints & configuration.
* surf to `chrome://inspect`,  configure your host+port, and view the stdout/stderr in your console 

## Environment variables 

All these are optional:

| environment variable | value | explanation |
|----------------------|-------|-------------|
| AUTH_USER            | test  | login name for data-editor at /admin | 
| AUTH_PASSWORD        | test  | password for data-editoro at /admin  |
| AUTH_ENDPOINTS       | 1     | set this if you want to enable auth for endpoints too |
| SSL_PRIVKEY          | privkey.pem | set this to enable SSL |
| SSL_CERT             | cert.pem    | set this to enable SSL |
| HOST                 | 'localhost' | host for swagger-ui to use for testing requests |
| PORT                 | 3002        | port for swagger-ui- to use for testing requests |
| DATADIR              | './data'    | override default data-path for live editable endpoints| 
 
## Features

* hot reloading of local endpoints and/or endpoints from repository
* watch repository for changes
* runs google cloud functions (if declared like so `module.helloGET = module.exports = function(req, res){..}`)
* tries to automatically install missing modules from endpoint-code 
* dynamic configuration of endpoint thru faas-token (header or payload-variable)
* letsencrypt/ssl-ready
* live editor

## Example endpoint

		module.exports = (req, res) => {
			// req.config is set when faas-token is passed as header or in payload
			res.json({msg:'hello '+req.body.email+'! \o/', config: req.config });
			res.end();
		}

    // optional: specify jsonschema for payload
		module.schema = {
      "post":{
        type: "object", 
        properties: {
          email: { type:"string" }
        }
      }
		}

> NOTE: by default all endpoints are json-endpoints. For raw payloads (forms e.g.) just specify `module.schema = {type:"string"}` as a schema.
