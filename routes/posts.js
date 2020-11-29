const express = require('express');
const db = require('../db');
const router = express();

router.post('/create',(req,res) => {
	if(!req.body || !req.body.title || !req.body.description) {
		return res.status(400).json({
			"msg":"title and description is required"
		});
	} else {
		let post = req.body;
		let today = new Date();
		post.created_at = JSON.stringify(today);
		db.getDB().collection("Posts").insertOne(post)
		.then((data) => {
			res.status(200).json({
				msg:data.ops
			})
		})
		.catch((err) => {
			res.status(500).json({
				err:'error occured due to: '+err
			})
		})
	}
})

router.get('/all', (req,res) => {
	db.getDB().collection("Posts").find({}).toArray((err,data) => {
		console.log(data);
		if (err) {
			console.log(err);
		}
		res.status(200).json({data : data})
	})
});

router.get('/:id', (req,res) => {
	if(!req.params || !req.params.id) {
		return res.status(400).json({
			err:'Invalid post id',
			code: 1
		})
	} else {
		let _id = db.getPrimaryKey(req.params.id);
		let query = {
			_id : _id
		};
		db.getDB().collection("Posts").findOne(query).then((data) => {
			return res.status(200).json({
				data: data,
				code: 0
			});
		}).catch((err) => {
			return res.status(500).json({
				err: err,
				code: 1
			})
		})
	}
})

router.patch('/comment/create/:id', (req,res) => {
	if(!req.params || !req.params.id) {
		return res.status(400).json({
			err:'Invalid post id',
			code: 1
		})
	} else if (!req.body || !req.body.comment) {
		return res.status(400).json({
			err:'comment is required',
			code: 1
		})
	} else {
		let _id = db.getPrimaryKey(req.params.id);
		let comment = req.body.comment;
		let comment_by = req.body.comment_by;
		let filter = {
			_id : _id
		}
		let query = {
			$addToSet: {
				comments:[
					{
						comment: comment,
						comment_by: comment_by
					}
				]
			}
		};
		db.getDB().collection("Posts").updateOne(filter,query).then((data) => {
			return res.status(200).json({
				data: data,
				code: 0
			});
		}).catch((err) => {
			return res.status(500).json({
				err: err,
				code: 1
			})
		})
	}
})

router.patch('/like/:id', (req,res) => {
	if(!req.params || !req.params.id) {
		return res.status(400).json({
			err:'Invalid post id',
			code: 1
		})
	} else if (!req.body || !req.body.like) {
		return res.status(400).json({
			err:'value is required',
			code: 1
		})
	} else {
		let _id = db.getPrimaryKey(req.params.id);
		let like = req.body.like;
		let liked_by = req.body.liked_by;
		let filter = {
			_id : _id
		}
		let query = {
			$addToSet: {
				likes:[
					{
						like: like,
						liked_by: liked_by
					}
				]
			}
		};
		db.getDB().collection("Posts").updateOne(filter,query).then((data) => {
			return res.status(200).json({
				data: data,
				code: 0
			});
		}).catch((err) => {
			return res.status(500).json({
				err: err,
				code: 1
			})
		})
	}
})

module.exports = router;