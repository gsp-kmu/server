const User = require("../../models/user");

async function getCoin(userId) {
    const user = await User.findOne({
            where: {
                id: userId
            }
    });
    
    return user.coin;
};

module.exports = { getCoin };