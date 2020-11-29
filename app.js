require("dotenv").config();
const express = require("express");
const path = require("path");
const os = require("os");
const db = require("./db");
const bodyParser = require("body-parser");
const postRouter = require(path.join(__dirname,'/routes/posts'));
const port = process.env.PORT || 3000;

db.connect((err) => {
	if(err) {
		console.log('Unable to connect to database due to :'+err);
		process.exit(1);
	} else {
		console.log('Database Connection Established Successfully');
	}
});

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/test',(req,res) => {
	console.log(req)
})

app.use("/v1/posts",postRouter);

app.get('/posts',(req,res) => {
	console.log("authorization success")
});

app.listen(port, () => {
	console.log(`server listening on ${port}`);
})

function Authorize(req,res,next) {
	var token = req.headers["authorization"] || '';
	if(token === ''){
		res.status(403).json({'message': 'please add a valid token'});
	}
	let token_array = token.split(' ');
	let decoded = token_array[1]
	res.status(200).json({'message': 'success'});
	next();
}