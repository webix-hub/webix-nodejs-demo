var Sequelize = require('sequelize');
var sequelize = new Sequelize('sampledb', 'root', '1',{
  host:"localhost",
  dialect:"mysql"
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.INTEGER,
  group_id: Sequelize.INTEGER
});

var Group = sequelize.define('group', {
  name: Sequelize.STRING
});

var File = sequelize.define('file',{
  name: Sequelize.STRING,
  path: Sequelize.STRING
});

var Document = sequelize.define('document',{
  name: Sequelize.STRING
});
User.hasMany(Document);

sequelize.sync({ force: true }).then(() => {

  //add demo data
  Group.create({ name:"Admin" });
  Group.create({ name:"User" });
  Group.create({ name:"Guest" });

  User.create({
    username: 'janedoe', birthday: new Date(1980, 6, 20), name:"Jane Doe", email:"janedoe@gmail.com", age:37, group_id:2
  });
  User.create({
    username: 'alexb', birthday: new Date(1968, 1, 11), name:"Alex Brown", email:"alexb@hotmail.com", age:49, group_id:1
  });
  User.create({
    username: 'bonny', birthday: new Date(2001, 2, 18), name:"Bonny Ampa", email:"bonny@gmail.com", age:16, group_id:2
  });

  Document.create({ userId:1, name:"resume.doc" });
  Document.create({ userId:1, name:"July_2015.doc" });

  Document.create({ userId:3, name:"pic001548.jpg" });
  Document.create({ userId:3, name:"pic001549.jpg" });
  Document.create({ userId:3, name:"pic001550.jpg" });
  Document.create({ userId:3, name:"pic001551.jpg" });

  for (var i=1000; i<2000; i++)
    Document.create({ userId:2, name:"photo"+i+".jpg" });

});

module.exports = {
  User, Group, File, Document
};