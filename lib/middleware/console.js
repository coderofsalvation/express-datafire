module.exports = (req, res, next) => {
	res.setHeader('Content-Type','text/html')
	var head = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Swagger UI</title>
			<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Code+Pro:300,600|Titillium+Web:400,600,700" rel="stylesheet">
			<link rel="stylesheet" type="text/css" href="/swagger-ui.css" >
		</head>
		<body>
			<div id="swagger-ui" class="swagger-ui">
			<h2>Datafire console</h2>
			<textarea class="curl" style="position:absolute;height:85%;width:95%">`
	var foot = `
			</textarea>
			<script>setInterval( function(){ document.location.reload()  }, 2000 ) </script>
			</div>
		</body>
		</html>`
	res.send( head + (process.log || "nothing logged yet..use console.log() or console.dir() in your script") + foot )
}
