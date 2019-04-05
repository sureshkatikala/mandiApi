var express = require('express')
let database = require('./database');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send("Mandi Api endpoint")
})

app.post('/getData', function (req, res) {
	console.log('receiving data ...');
	console.log('body is ', req.body);
	// res.send(req.body);
	database.getDatabaseData()
		.then(dataRecieved => {
			res.send(dataRecieved);
		})
});

app.listen(port, () => { console.log("App is running on port 3000") })
