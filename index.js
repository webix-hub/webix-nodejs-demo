var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var bars = exphbs({ 
	defaultLayout: 'main'
});

app.engine('handlebars', bars);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(require("path").join(__dirname, 'public')));

//static pages
var menu = require("./menu");
app.get('/', 	 (req, res) => res.render('home', menu(req) ));
app.get('/tree', (req, res) => res.render('tree', menu(req) ));
app.get('/grid', (req, res) => res.render('grid', menu(req) ));
app.get('/grid-dynamic', (req, res) => res.render('grid-dynamic', 	menu(req) ));
app.get('/grid-paging',  (req, res) => res.render('grid-paging', 	menu(req) ));
app.get('/grid-server',  (req, res) => res.render('grid-server', 	menu(req) ));
app.get('/form', 		   (req, res) => res.render('form', 		menu(req) ));
app.get('/form-combo', 	   (req, res) => res.render('form-combo', 	menu(req) ));
app.get('/form-uploading', (req, res) => res.render('form-uploading', menu(req) ));

//CRUD handlers
var form = require("./controllers/form");
app.get('/form/data/:recordId', form.getData);
app.get('/form/options', form.getOptions);
app.post('/form/data', form.saveData);
app.post('/form/do-upload', form.doUpload);

var grid = require("./controllers/grid");
app.get('/grid/data', grid.getData);
app.post('/grid/data', grid.addData);
app.put('/grid/data/:userId', grid.updateData);
app.delete('/grid/data/:userId', grid.removeData);

var dyngrid = require("./controllers/grid-dynamic");
app.get("/grid/data-dynamic", dyngrid.getData);

var tree = require("./controllers/tree");
app.get('/tree/data', tree.getAll);
app.get('/tree/data-dynamic', tree.getLevel);

app.listen(3000);