const db = require("../db");
const Op = require('sequelize').Op

module.exports = {
	getData : function(req, res){
		var limit = (req.query.count || 20)*1;
		var offset = (req.query.start || 0)*1;

		var where = (req.query.filter && req.query.filter.name)  ? { name:{ [Op.like]:"%"+req.query.filter.name+"%" }}: {};
		var order = req.query.sort ? [["name", req.query.sort.name ]] : [];

		var page = db.Document.findAndCountAll({ where, limit, offset, order });
		
		page.then(data => res.json({
			pos:offset, total_count:data.count, data:data.rows
		}));
	}
};