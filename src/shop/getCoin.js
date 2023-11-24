const User = require("../../models/user");

async function getCoin(userId) {
    const user = await User.findOne({
            where: {
                id: userId
            }
    });
    
    return user.coin;
};

async function setCoin(userId) {
    await User.update({
                coin : 10000
            },
            {
                where : {
                    id : userId
                }
            });
};


module.exports = { getCoin, setCoin };