const Sequelize = require('sequelize');

module.exports = class Account extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true,
            },
            password: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        },
            {
                sequelize,
                modelName: 'Account',
                tableName: 'accounts',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.Account.hasOne(db.User, {foreignKey: 'UserId', sourceKey: 'id'});
        db.Account.hasOne(db.UserState, {foreignKey: 'UserId', sourceKey: 'id'});
        db.Account.hasMany(db.Deck, { foreignKey: 'UserId', sourceKey: 'id'})
        db.Account.belongsTo(db.Room, { foreignKey: 'RoomId', targetKey: 'id'});
    }
}