var express = require('express');
var path = require('path');

//connect to the mongo
var db = require('mongoskin').db("mongodb://localhost/testdb", { w: 0});
	db.bind('record');

//create the app instance
var app = express();
//serve static files
app.use(express.static(path.join(__dirname, 'public')));
//parse POST data
app.use(express.bodyParser());


//response for saving operations
function after_update(err, res, record){
    if (err){
    	res.status(500);
    	res.send({ error:err.toString() });
    } else {
    	res.send(record || {});
    }
}


//data loading
app.get('/data', function(req, res){
	db.record.find().toArray(function(err, data){
		for (var i = 0; i < data.length; i++){
			//map _id to id
			data[i].id = data[i]._id;
			delete data[i]._id;
		}
		res.send(data);
	});
});

//adding
app.post('/data', function(req, res){
	db.record.insert(req.body, function(err, record){
		if (err) return res.send({ status:"error" });
		res.send({ newid:req.body._id });
	});
});

//updating
app.put('/data/:id', function(req, res){
	db.record.updateById(req.param("id"), req.body, function(err){ 
		if (err) return res.send({ status:"error" });
		res.send({});
	});
});

//deleting
app.delete('/data/:id', function(req, res){
	db.record.removeById(req.param("id"), req.body, function(err){ 
		if (err) return res.send({ status:"error" });
		res.send({});
	});
});


app.listen(3000);