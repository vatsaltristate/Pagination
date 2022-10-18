const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodedb","root","", {
  host:'localhost',
  dialect: 'mysql',
  operatorsAliases: false,


  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tute.model.js")(sequelize, Sequelize);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = db;