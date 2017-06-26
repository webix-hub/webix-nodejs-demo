var db = require("../db");

module.exports = {
	getData : function(req, res){
		db.User.findAll().then(data => res.json(data));
	},


	removeData: function(req, res){
		db.User.findById(req.params.userId)
			.then((user) => 
				user.destroy())
			.then(() => 
				res.json({}));
	},

	addData: function(req, res){
		db.User.create(req.body).then((obj) => 
				res.json({ id: obj.id }));
	},
	updateData: function(req, res){
		var { username, email, name, birthday, age, group_id } = req.body;
		console.log(username, birthday)
		db.User.findById(req.params.userId)
			.then((user) => 
				user.update(req.body))
			.then(() => 
				res.json({}));
	}
};