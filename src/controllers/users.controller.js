//nhiệm vụ của controller: nhận vào request, response => chỉ parse request(params, body) sau đó chuyển xuống Services xử lý, nhận kết quả trả về từ Sevice và trả response về cho client 
//closure function

const { response } = require("../helpers/response");
const userService = require("../services/users.service");

const getUsers = () => {
    return async (req,res,next) => {
        try {
            const users = await userService.getUsers();
            res.status(200).json(response(users))
            
        } catch (error) {
            // res.status(500).json({error: error.message})
            //chuyển tiếp error tới middleware handleErrors
            next(error)
        }
      
    }
};

const createUser = () => {
    return async (req,res,next) => {
        try {
            const user = req.body;
            console.log("user===", user);
            const createdUser = await userService.createUser(user);
            res.status(200).json(response(createdUser))
        
            
            
        } catch (error) {
            // res.status(500).json({error: error.message})
            next(error)
            
        }
    }
}

const updateUser = () => {
    return async (req,res,next) => {
        try {
            const user = req.body;
            const {id} = req.params;
           
            const updatedUser = await userService.updateUser(user,id);
            res.status(200).json(response(updatedUser))
            
            
        } catch (error) {
            // res.status(500).json({error: error.message})
            next(error)
            
        }
    }
}
module.exports = {
    getUsers,
    createUser,
    updateUser
 
}