var db = require("../db");

module.exports = {
	getData : function(req, res){
		db.User.findAll().then(data => res.json(data));
	},


	removeData: function(req, res){
		db.User.findByPk(req.params.userId)
			.then((user) => 
				user.destroy())
			.then(() => 
				res.json({}));
	},

	addData: function(req, res){
		const data = req.body;
		// force null values
		if (!data.birthday)
			data.birthday = null;
		if (!data.group_id)
			data.group_id = null;
		if (!data.age)
			data.age = 0;

		db.User.create(req.body).then((obj) => 
				res.json({ id: obj.id }));
	},
	updateData: function(req, res){
		const data = req.body;
		// force null values
		if (!data.birthday)
			data.birthday = null;
		if (!data.group_id)
			data.group_id = null;
		if (!data.age)
			data.age = 0;

		db.User.findByPk(req.params.userId)
			.then((user) => 
				user.update(data))
			.then(() => 
				res.json({}));
	}
};