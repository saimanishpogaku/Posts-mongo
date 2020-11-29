require('dotenv').config();
const path = require('path');
const fs = require('fs');
const {MongoClient} = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const environment = process.env.ENVIRONMENT // || 'development';
const mongoOptions = {
	useNewUrlParser : true,
	useUnifiedTopology : true
};
const credentials = require(path.join(__dirname,`/config/${environment}/config.json`));

let state = {
	db : null 
}

let connect = (cb) => {
	if(state.db) {
		cb();
	} else {
		MongoClient.connect(credentials.POSTS_URI,mongoOptions,(err,client)=>{
			if(err){
				cb(err);
			} else {
				state.db = client.db(credentials.dbname);
				cb();
			}
		})
	}
}

const getPrimaryKey = (_id) => {
	return ObjectID(_id);
}
//console.log(credentials);

const getDB = () => {
	return state.db;
}

module.exports = {
	getDB,
	connect,
	getPrimaryKey
};