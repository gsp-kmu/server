const Sequelize = require('sequelize');

module.exports = class DeckCard extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            count: {
                type: Sequelize.INTEGER,
                defaultValue:0,
                allowNull: false,
            },
        },
            {
                sequelize,
                timestamps: false,
                modelName: 'DeckCard',
                tableName: 'deckcard',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
}