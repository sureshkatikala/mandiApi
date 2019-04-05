var express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/',(req, res)=> {
	res.send("Mandi Api endpoint")
})

app.post('/getData', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    res.send(req.body);
});

app.listen(port, () => {console.log("App is running on port 3000")})
