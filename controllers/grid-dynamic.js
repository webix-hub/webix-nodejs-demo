var db = require("../db");

module.exports = {
	getData : function(req, res){
		var limit = (req.query.count || 20)*1;
		var offset = (req.query.start || 0)*1;

		var where = req.query.filter ? { name:{ $like:"%"+req.query.filter.name+"%" }}: {};
		var order = req.query.sort ? [["name", req.query.sort.name ]] : [];

		var count = db.Document.findAndCountAll({ where });
		var page = db.Document.findAll({
			where, limit, offset, order
		});

		Promise.all([count, page]).then(data => res.json({
			pos:offset, total_count:data[0], data:data[1] 
		}));
	}
};