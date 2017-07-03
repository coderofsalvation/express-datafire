var datafire = require('datafire')

module.exports = new datafire.Action({
  inputs: [{
    title: 'name',
    type: 'string',
		description: "Just an example value"
  }], 
	handler: (input, context) => {
		return new Promise( (resolve, reject) => {
			resolve({msg:'hello world: '+input.name})
		})
	}
})
