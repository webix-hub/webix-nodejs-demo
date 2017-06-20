var db = require("../db");

module.exports = {
	data : function(req, res){
		db.User.findAll().then(data => res.json(data));
	}
};