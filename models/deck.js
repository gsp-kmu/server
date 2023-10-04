const Sequelize = require('sequelize');

module.exports = class Deck extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },
            {
                sequelize,
                modelName: 'Deck',
                tableName: 'decks',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.Deck.belongsTo(db.Account, { foreignKey: 'UserId', targetKey: 'id'});
        db.Deck.belongsToMany(db.Card, { through: 'DeckCard' });
    }
}