var datafire = require('datafire')

module.exports = new datafire.Action({
	handler: (inputs,context) => {
		return {"foo":"bar"}
	}
})