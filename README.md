Express DataFire
================

Live-editing & testing of datafire endpoints & scheduled tasks using express.

![](https://gist.githubusercontent.com/coderofsalvation/561331553271fb75028a8dda6ddddd69/raw/24dfe7f5180eefcb0e32adbfea6ef9c3a250d46f/datafire-express-demo.gif)

## Usage: as application

    $ git clone https://github.com/coderofsalvation/express-datafire 
    $ cd express-datafire
    $ npm install
    $ node app.js

## Usage: as middleware

    $ npm install express-datafire --save

And in your express app:

    // Create a new Express application.
    var app = express()

    var port                = process.env.PORT || 3002
    var host                = process.env.HOST || '127.0.0.1:'+port
    require('./lib')(app, { port: port, host: host })

    app.listen(port, function(){
      console.log("listening on "+host)
    })

BOOM! 

* surf to `/` and you can access your endpoints & features 

## Getting started video

[![Check the getting started video](https://img.youtube.com/vi/mKeD6Y5OPGA/0.jpg)](https://www.youtube.com/watch?v=mKeD6Y5OPGA)

## Why

> Disclaimer: I'm not affiliated with datafire, so basically this is fanware

Express-datafire is intended for datafire enthousiast & experimentation, or to simply run 
 datafire-code which shouldn't run on datafire.io.
Please go to [datafire.io](https://datafire.io) in case you want:

* free hosting of datafire code
* a comfortable, and scalable way of glue-ing together complex dataflows
* share and re-use other people's dataflows 

| topic | express-datafire | datafire.io |
|-|-|-|
| stress testing / monitoring          | yes     | yes (but may spike pricing tier) |
| high volume realtime UDP-data        | yes     | no |
| datafire actions                     | yes | yes |
| datafire tasks                       | yes | yes |
| datafire cli                         | yes | no  |
| support for experimental npm modules | yes | no (for obvious reasons) |
| scalable                             | no  | yes |
| multitenancy                         | tedious | easy |
| create dataflows with existing integrations | tedious | easy |
| IoT sensors / hardware access  | yes     | no |
| runs on intranet                     | yes     | no |
| offline prototyping                  | yes     | no |
| (server) hasslefree                  | no     | yes |
| safe for clientwork                  | no      | yes |
| work with extremely big files / video encoding | yes     | no |

![](https://gist.githubusercontent.com/coderofsalvation/561331553271fb75028a8dda6ddddd69/raw/24dfe7f5180eefcb0e32adbfea6ef9c3a250d46f/datafire-express-bigpicture.gif)

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

* live editor
* system monitor
* hot reloading of datafire endpoints & scheduled tasks 
* export of datafire config + files
* tries to automatically install missing modules 
* ssl-ready

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

