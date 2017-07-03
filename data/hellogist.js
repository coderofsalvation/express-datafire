var datafire = require('datafire')
var nrequire = require('nrequire')
var request = require('request')
const vm = require('vm')

var handler = {
	script: false, 
	remote: (inputs, context) => {msg:"initing endpoint.."}
}

var loadUrl = function(url){
	var finalUrl = url
	if( url.match(/\/\/gist\.github/) != null ) finalUrl += "/raw?"+Math.random()

	var log = function(scriptid, data){
		process.log = new Date().toISOString() + ' (' + scriptid + '): ' + (typeof data == "string" ?  data  : JSON.stringify(data, null, 2) ) + "\n" + (process.log || "")
		process.log = process.log.split("\n").splice(0, 100).join("\n")
	}

	request(finalUrl, function(err, res, body){
		if( !err ){
			console.log("loaded "+url)
			handler.script = body 
			module.exports.inputs.push({title:'foo',type:'string',description:'flop flap'})
			console.dir(module.exports.inputs)
			handler.remote = (inputs, context) => {
				var sandbox = { 
					module:{}, 
					console: {
						log: log.bind(this, url), 
					  dir: log.bind(this, url)
					}, 
					require: require('nrequire')
				}
				try{
			    var script = new vm.Script( handler.script, { displayErrors:true, filename:url })
					script.runInNewContext(sandbox, { displayErrors:true, filename: url })
					return sandbox.module.exports ? sandbox.module.exports(inputs, context) : {err:"no module.exports found in script :/"}
				}catch (e){ 
					log(url+" ERROR", e.stack || e.message || e)
				  return {err: e.message, stack: e.stack ? e.stack.split("\n") : undefined }
				}
			}
		}else handler.remote = (inputs, context) => {err:err}
	})
}

loadUrl("https://gist.githubusercontent.com/coderofsalvation/5768a6f9d2fe542d62e33c146de8aaa9")

module.exports = new datafire.Action({
  inputs: [{
    title: 'name',
    type: 'string',
		description: "Just an example value"
  }], 
	handler: (inputs, context) => {
		return handler.remote(inputs, context)
	}
})
