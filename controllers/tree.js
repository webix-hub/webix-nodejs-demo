var db = require("../db");

module.exports = {
	getAll : function(req, res){
		db.User.findAll()
		.then(data => 
			Promise.all(data.map(user => {
				return user.getDocuments({
					attributes:["id", ["name", "value"]]
				}).then(docs => {
					return { id: "u_"+user.id, open:true, value: user.name, data: docs }
				});
			}))
		).
		then(data => res.json(data));
	},
	getLevel: function(req, res){
		if (!req.query.parent)
			return db.User.findAll()
				.then(data => {
					res.json(data.map(user => {
						return {id: "u_"+user.id, webix_kids:true, name: user.name }
					}));
				});
		else
			return db.Document.findAll({ 
				where:{ userId: req.query.parent.replace("u_","") }, attributes:["name"]
			}).then(data => res.json({ parent: req.query.parent, data }));
	}
};