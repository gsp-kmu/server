const Sequelize = require('sequelize');
const Account = require('./account');
const Card = require('./card');
const Deck = require('./deck');
const User = require('./user');

const env = process.env.DATA_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Account = Account;
db.Card = Card;
db.Deck = Deck;
db.User = User;

Account.init(sequelize);
Card.init(sequelize);
Deck.init(sequelize);
User.init(sequelize);

Account.associate(db);
Card.associate(db);
Deck.associate(db);
User.associate(db);




module.exports = db;