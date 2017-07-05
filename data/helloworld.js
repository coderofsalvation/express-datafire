const datafire = require('datafire')
require  = require('nrequire')         // redefine require to automatically install modules

module.exports = new datafire.Action({
  inputs: [{
    title: 'name',
    type: 'string',
		description: "Just an example value"
  }], 

	//uncomment the line below to define a jsonschema 
  //inputSchema: {},
	
	handler: (input, context) => {
		return new Promise( (resolve, reject) => {
		  console.log("fooooooooo")
			resolve({msg:'hello world: '+input.name})
		})
	}
})
