const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
        },
            {
                sequelize,
                modelName: 'Room',
                tableName: 'rooms',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.Room.hasMany(db.Account, { foreignKey: 'RoomId', sourceKey: 'id'})
    }
}