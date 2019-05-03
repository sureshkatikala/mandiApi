var express = require('express')
let database = require('./database');
let packing = require('./packing');
let test = require('./test');
let assembly = require('./assembly');
const app = express();
const port = 3000;
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
	extended: true
  }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send("Mandi Api endpoint")
})

app.post('/getData', function (req, res) {
	console.log('receiving data ...');
	console.log('body is ', req.body);

	database.getDatabaseData()
		.then(dataRecieved => {
			res.send(dataRecieved);
		})
});

app.post('/packing-update',(req,res) => {
	console.log('body is :', req.body);
	console.log(req.body);

	packing.updateData(req.body)
		.then(data => {
			console.log(data);
			if(data == 1)
			res.send({status: "Success"});
		})
});

app.post('/assembly-update',(req, res) => {
	console.log('body is :', req.body);
	console.log(req.body);

	assembly.updateData(req.body)
		.then(data => {
			console.log(data);
			if(data == 1)
			res.send({status: "Success"});
		})
})

app.listen(port, () => { console.log("App is running on port 3000") })
