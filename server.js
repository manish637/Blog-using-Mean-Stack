var express = require('express');
var app = express();

var bodyParser = require('body-parser');


var mongoose = require('mongoose');  //change var to const to avoid deprication warning\
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/code2016',{useMongoClient:true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

var postSchema = mongoose.Schema({
	title: {
		type : String,
		require : true
	},
	blog: {
		type: String,
		require: true
	},
	time: {
		type: Date,
		default: Date.now
	}
}
,{	collection : 'posttable'}
);										//to force own name to collection and removing s

var PostTable = mongoose.model("PostTable", postSchema)

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json

app.post("/api/view2", add);
app.get("/api/view2", getAllPosts);
app.delete('/api/view2/:id', del);

function getAllPosts(req, res){
	PostTable
			.find()
			.then(
				function(posts){
					res.json(posts);
				},
				function(error){
					res.sendStatus(400);

			})

}

function del(req, res){
	var postid = req.params.id;
	PostTable.remove({_id: postid})
			.then(function(status){
				res.sendStatus(200);
			},
			function(error){
				res.sendStatus(400);
			});

}

function add(req, res){
	var post = req.body;
	console.log(post);
	PostTable.create(post)
	.then(
		function(postObj){
			res.sendStatus(200);

		},
		function(error){
			res.sendStatus(400);

		});
	
}

app.listen(8000);