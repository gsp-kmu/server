const Sequelize = require('sequelize');

module.exports = class Card extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name:{
                type:Sequelize.STRING(40),
                allowNull: false,
            }
        },
            {
                sequelize,
                modelName: 'Card',
                tableName: 'cards',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.Card.belongsToMany(db.Deck, {through: 'DeckCard'});
    }
}