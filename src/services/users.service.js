const { AppError } = require("../helpers/error");
const {User} = require("../models");

//SERVICE: nhận vào data từ controller
// NHIỆM VỤ: xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống DB, nhận data từ DB và return về cho controller


const getUsers = async () => {
    try {
        const users = await User.findAll({include: "restaurants"});
        return users;
    } catch (error) {
        console.log(error)
        // throw error;
        throw new AppError(500, "Something went wrong with DB")
    }
}
    ;

const createUser = async (data) => {
    try {
        const user = await User.findOne({
            where: {
                email: data.email

            }
        })
        //email đã tồn tại trong DB
        if (user) {
            throw new AppError(400, "Email đã tồn tại")
        }

        //ví dụ trong TH admin thêm user, chỉ cần dùng email, ta cần phải tạo 1 cái mật khẩu ngẫu nhiên
        if (!data.passWord) {
            data.passWord = Math.random().toString(34).substring(2)
            //gửi password về cho user theo email này
        }

        //user chưa tồn tại, create user mới
        const createdUser = await User.create(data)
        return createdUser
    } catch (error) {
        // throw error
        throw new AppError(500, "Something went wrong with DB")
    }
}

const updateUser = async (data, id) => {
    try {
        const userUpdate = await User.findOne({
            where: {
                id: id
            }
        })
        if (!userUpdate) {
            throw new AppError(400,"User không tồn tại")
        }
        const updatedUser = await User.update(data, { where: { id: id } });
        return updatedUser;


    } catch (error) {
        throw error
    }
}
module.exports = {
    getUsers,
    createUser,
    updateUser,

};

