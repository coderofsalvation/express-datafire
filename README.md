Express DataFire middleware 
===========================

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


> NOTE: by default all endpoints are json-endpoints. For raw payloads (forms e.g.) just specify `module.schema = {type:"string"}` as a schema.

## Installation

    $ npm install
    $ datafire serve
    DataFire listening on port 3000
 
## Datafire Docs 

see [here](https://github.com/DataFire/DataFire)
     
## About Datafire.io

[twitter-image]: https://img.shields.io/twitter/url/http/github.com/DataFire/DataFire.svg?style=social
[twitter-link]: https://twitter.com/intent/tweet?text=DataFire%20-%20open+source+integration+framework:&url=http%3A%2F%2Fgithub.com%2FDataFire%2FDataFire
[gitter-image]: https://badges.gitter.im/DataFire/DataFire.png
[gitter-link]: https://gitter.im/DataFire/Lobby
[npm-image]: https://img.shields.io/npm/v/datafire.svg
[npm-link]: https://npmjs.org/package/datafire
[travis-image]: https://travis-ci.org/DataFire/DataFire.svg?branch=master
[travis-link]: https://travis-ci.org/DataFire/DataFire
[climate-image]: https://codeclimate.com/github/DataFire/DataFire.png
[climate-link]: https://codeclimate.com/github/DataFire/DataFire
[deps-image]: https://img.shields.io/david/DataFire/DataFire.svg
[deps-link]: https://david-dm.org/DataFire/DataFire
[devdeps-image]: https://img.shields.io/david/dev/DataFire/DataFire.svg
[devdeps-link]: https://david-dm.org/DataFire/DataFire#info=devDependencies

[DataFire](https://datafire.io) is a webservice and open source framework for building and integrating APIs. It
provides over [350 pre-built integrations](https://github.com/DataFire/Integrations), including:

MongoDB &bull; Slack &bull; GitHub &bull; Twilio &bull; Trello &bull; Spotify &bull;
Instagram &bull; Gmail &bull; Google Analytics &bull; YouTube

Each integration provides a set of composable actions. New actions can be built by
combining existing actions, JavaScript, and external libraries.

Actions are driven by JavaScript Promises,
and can be triggered by an HTTP endpoint, on a schedule, or manually.

## Sample Projects
* [Create an API backed by Google Sheets](https://github.com/DataFire-flows/sheets-api)
* [E-mail yourself news headlines](https://github.com/DataFire-flows/headlines)
* [Sync GitHub issues to a Trello board](https://github.com/DataFire-flows/github-issues-to-trello)
* [Create a Spotify playlist from r/listentothis](https://github.com/DataFire-flows/listen-to-this)

