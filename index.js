var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(require("path").join(__dirname, 'public')));

//static pages
app.get('/', function (req, res) {    res.render('home'); });
app.get('/tree', function (req, res) {    res.render('tree'); });
app.get('/grid', function (req, res) {    res.render('grid'); });
app.get('/form', function (req, res) {    res.render('form'); });
app.get('/form-combo', function (req, res) {    res.render('form-combo'); });
app.get('/form-uploading', function (req, res) {    res.render('form-uploading'); });

//CRUD handlers
var form = require("./controllers/form");
app.get('/form/data/:recordId', form.getData);
app.get('/form/options', form.getOptions);
app.post('/form/data', form.saveData);
app.post('/form/do-upload', form.doUpload);

var grid = require("./controllers/grid");
app.get('/grid/data', grid.data);

var tree = require("./controllers/tree");
app.get('/tree/data', tree.getAll);
app.get('/tree/data-dynamic', tree.getLevel);

app.listen(3000);

// //response for saving operations
// function after_update(err, res, record){
//     if (err){
//     	res.status(500);
//     	res.send({ error:err.toString() });
//     } else {
//     	res.send(record || {});
//     }
// }


// //data loading
// app.get('/data', function(req, res){
// 	db.record.find().toArray(function(err, data){
// 		for (var i = 0; i < data.length; i++){
// 			//map _id to id
// 			data[i].id = data[i]._id;
// 			delete data[i]._id;
// 		}
// 		res.send(data);
// 	});
// });

// //adding
// app.post('/data', function(req, res){
// 	db.record.insert(req.body, function(err, record){
// 		if (err) return res.send({ status:"error" });
// 		res.send({ newid:req.body._id });
// 	});
// });

// //updating
// app.put('/data/:id', function(req, res){
// 	db.record.updateById(req.param("id"), req.body, function(err){ 
// 		if (err) return res.send({ status:"error" });
// 		res.send({});
// 	});
// });

// //deleting
// app.delete('/data/:id', function(req, res){
// 	db.record.removeById(req.param("id"), req.body, function(err){ 
// 		if (err) return res.send({ status:"error" });
// 		res.send({});
// 	});
// });


// app.listen(3000);