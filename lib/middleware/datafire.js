module.exports = function(){

	this.middleware = function(req, res, next){
		next()
	}

	this.inited = false

	this.init = () => {
		try{
			// clear cache
			Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
			let datafire = require('datafire/src/lib');
			let project = datafire.Project.fromDirectory( process.cwd() ); // Dir containing DataFire.yml
			let projectServer = new datafire.ProjectServer(project);
			projectServer.getRouter().then(router => {
				this.inited = true
				console.log("(re)inited datafire functions")
				this.middleware = (req, res, next) => {
					router(req, res, next)
				}
			});
		}catch (e){ 
			this.inited = false
			console.error(e) 
		}
	}
	
	return this

}.apply({})
