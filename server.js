var express = require('express')
const app = express();
const port = 3000;

app.get('/',(req, res)=> {
	res.send("Mandi Api endpoint")
})

app.listen(port, () => {console.log("App is running on port 3000")})
