const CronJob = require('cron').CronJob;
const schedule = require('datafire/src/util/schedule');
const Context = require('datafire/src/lib/context');

const _ = require('lodash')

var jobs = []

module.exports = function(){

	this.middleware = function(req, res, next){
		next()
	}

	this.inited = false

	this.stopAllJobs = () => {
		for( var i in jobs ){
			jobs[i].stop()
			delete jobs[i]
		} 
	}

	this.init = () => {
		try{
			// clear cache
			Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
			let datafire = require('datafire/src/lib');
			let project = datafire.Project.fromDirectory( process.cwd() ); // Dir containing DataFire.yml
			this.stopAllJobs()
			project.startTasks = this.startTasks.bind(project) // override with our own,  so we can stop tasks
			project.startTasks()
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

	this.startTasks = function() {
		_.each( this.tasks, (task, name) => console.log("starting task: "+(task.schedule||'')+" "+name ) )
		for (let taskID in this.tasks) {
			let task = this.tasks[taskID];
			if (!task.schedule) continue;
			let cron = schedule.parse(task.schedule);
			cron = schedule.cronToNodeCron(cron);
			let job = new CronJob(cron, () => {
				let event = this.monitor.startEvent('task', {id: taskID});
				return task.action.run(task.input, new Context({
					type: 'task',
					accounts: Object.assign({}, this.accounts, task.accounts),
				}))
					.then(data => {
						event.success = true;
						event.output = data;
						this.monitor.endEvent(event);
					}, error => {
						event.success = false;
						event.error = error;
						this.monitor.endEvent(event);
					});
			}, null, true, this.timezone);
			jobs.push(job)
		}
	}
	
	return this

}.apply({})
