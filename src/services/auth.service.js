const { AppError } = require("../helpers/error");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");


const login = async (credentials) => {
    // console.log(credentials);
    try {
        const { email, passWord } = credentials;
        const user = await User.findOne({
            where:
                { email },
            attributes: {
                include: ["passWord"]
            }
        })
        if (!user) {
            throw new AppError(400, "email or password invalid")
        }

        const isMatched = bcrypt.compareSync(passWord, user.passWord)
        if (!isMatched) {
            throw new AppError(400, "email or password invalid")
        };
        //    delete user.dataValues.passWord;
        //    return user;
        const {token, expiresIn} = generateToken(user)
        // console.log(token);

        return generateToken(user)

    } catch (error) {
        throw error
    }

}

module.exports = {
    login,
}