const datafire = require('datafire')
require = require('nrequire')         // redefine require to automatically install modules

module.exports = new datafire.Action({
  handler: (inputs, context) => {
    console.log("hello task!")
  }
})
