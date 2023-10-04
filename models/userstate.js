const { STRING } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class UserState extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            socketid:{
                type:STRING(50),
                primaryKey: true,
                allowNUll: false,
            },
            state:{
                type: Sequelize.ENUM(
                    'JOIN',
                    'MATCH',
                    'GAME',
                ),
                allowNull: false,
            }
        },
            {
                sequelize,
                modelName: 'UserState',
                tableName: 'userState',
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.UserState.belongsTo(db.Account, {foreignKey: 'UserId', targetKey: 'id'});
    }
}