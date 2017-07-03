const scheduler						= require('node-schedule')
const glob                = require('glob')
const safeRequire         = require('safe-node-require')
const _                   = require('lodash')

module.exports = function(endpoints, schedulers){

  var dummyEndpoint = function(file, req, res, next){
    res.status(409).end(file.split("/").pop()+" contains a syntax error :/")
  }

  var addEndpoint = (file, endpoints, schedulers) => {
    var endpoint = file.split("/").pop().replace(/\.js/, '')
    var func     = safeRequire(file) || dummyEndpoint.bind(this, file)
    if( typeof func != "function" ) return
    var schema   = func.schema 
    endpoints[ func.path || endpoint] = {
      func: safeRequire(file) || dummyEndpoint.bind(this, file), 
      schema: func.schema 
    }
    // setup scheduler
    if( func.scheduler ) 
      _.each(func.scheduler, (f, cron) => {
        console.log("adding scheduler: "+cron+": "+file)
        if( f.active || f.active == undefined) scheduler.scheduleJob(cron, f.func)
        schedulers.push({active:f.active, cron:cron, file:file})
      })
  }

  return new Promise( (resolve, reject) => {

    // init middleware from repo
    new Promise( (rs,rj) =>{
      glob("./endpoints/*", {}, (er, files) =>{
        files.map( (file) => addEndpoint(file, endpoints, schedulers) )
        rs()
      })
    })

    // init middleware from local folder
    .then( () => {
      glob("./data/*", {}, (er, files) =>{
        files.map( (file) => addEndpoint(file, endpoints, schedulers) )
      })
    })

    // init middleware from local folder
    .then( () => {
      glob("./node_modules/express-faas-*/*", {}, (er, files) =>{
        files.map( (file) => addEndpoint(file, endpoints, schedulers) )
        resolve()
      })
    })
  })


}
