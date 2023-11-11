const Sequelize = require('sequelize');

module.exports = class UserCard extends Sequelize.Model {
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
                modelName: 'UserCard',
                tableName: 'usercard',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
}