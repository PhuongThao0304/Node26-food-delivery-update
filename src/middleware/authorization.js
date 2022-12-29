//middleware verify token 
const jwt = require('jsonwebtoken');
const { AppError } = require("../helpers/error");
const { User } = require('../models');


const extractTokenFromHeader = (headers) => {
    const bearerToken = headers.authorization // Bearer abcs

    const parts = bearerToken.split(" ") //["Bearer", "abcs"]
    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
        throw new AppError(401, "Invalid token");

    }
    return parts[1]
}

const authorization = async (req,res,next) => {
   try {
       const token = extractTokenFromHeader(req.headers);
       console.log(token)
       const payload = jwt.verify(token, "cybersoft-node26");
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw new AppError(401, "Invalid token")
      };
     //lưu thông tin user và request, để có thể truy cập ở các middleware hoặc controller tiếp theo
     res.locals.user = user;
       //goi next
       next()
       
   } catch (error) {
       if (error instanceof jwt.JsonWebTokenError) {
          next (new AppError(401, "Invalid token")) 
       }
       throw error
   }
}

module.exports = {
    authorization
}