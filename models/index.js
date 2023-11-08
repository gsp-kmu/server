const Sequelize = require('sequelize');
const Account = require('./account');
const Card = require('./card');
const Deck = require('./deck');
const User = require('./user');
const UserState = require('./userstate');
const Room = require('./room');

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
db.UserState = UserState;
db.Room = Room;

Account.init(sequelize);
Card.init(sequelize);
Deck.init(sequelize);
User.init(sequelize);
UserState.init(sequelize);
Room.init(sequelize);

Account.associate(db);
Card.associate(db);
Deck.associate(db);
User.associate(db);
UserState.associate(db);
Room.associate(db);


function CreateCard(name){
    Card.findOrCreate({
        where:{'name':name},
        defaults:{
            'name':name
        }
    });
}



module.exports = db;