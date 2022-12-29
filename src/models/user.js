//để sử dụng kiểu dữ liệu, thêm 1 caau nữa 
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("./index")

// const User = sequelize.define("User",
// {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement:true,
//     },
//     firstName: {
//         type: DataTypes.STRING(50),
//         field: "first_name",

//     },
//     lastName: {
//         type: DataTypes.STRING(50),
//         field: "last_name",

//     },
//     email: {
//         type: DataTypes.STRING(50),
//         field: "email",
//         allowNull: false,
//         unique:true,
//         //validate lại value
//         // validate: {
//         //     //các hàm hỗ trợ sẵn
//         //     isEmail:  {
//         //         msg: "email is invalid"
//         //     },
//         //     //demo custom validation
//         //     // isCustom: (value) => {
//         //     //     //viết logic validation 


//         //     //     //nếu không thoả mãn logic thì chạy câu lệnh "throw new Error("error message")"
//         //     // } 

//         // }
//     },
//     passWord: {
//         type: DataTypes.STRING(50),
//         field: "password",
//         allowNull: false,
//         // validate: {
//         //     isMatchedConfirmPassword: (value) => {
//         //         if (value !== this.comfirmPassword) {
//         //             throw new Error("confirm password is not matched")
//         //         }

//         //     }
//         // }
//         //Trước khi insert vào DB, hàm setter sẽ chạy các thao tác với dữ liệu nhận vào trước khi update/create dữ liệu 
//         set(value) {

//             //không dc lưu plain text password trực tiếp xuống db 
//             // ta cần hash password bằng thư viện bcrypt

//            const salt = bcrypt.genSaltSync();
//           const hashedPassword = bcrypt.hashSync(value,salt);
//           this.setDataValue("passWord", hashedPassword)

//         }

//     }
// },
// {
//     tableName: "users",
//     // disabled createAt, updatedAt
//     timestamps: false,
//     defaultScope: { //nghĩa là: bỏ qua column passWord khi tìm kiếm các records trong table
//         attributes: {
//             exclude: ["passWord"],
//         }
//     },
//     //các phương thức được tự động chạy sau 1 hành động (create,update,delete)
//     hooks: {
//         //xoá property password của record được trả ra sau khi tạo thành công
//         afterCreate: (record) => {
//             delete record.dataValues.passWord
//         }

//     }

// });

//lúc này file user này export ra function
module.exports = (sequelize) => {
    return sequelize.define("User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                type: DataTypes.STRING(50),
                field: "first_name", //map lại cho khớp tên cột trong database

            },
            lastName: {
                type: DataTypes.STRING(50),
                field: "last_name",

            },
            email: {
                type: DataTypes.STRING(50),
                field: "email",
                allowNull: false,
                unique: "email",
                //validate lại value
                // validate: {
                //     //các hàm hỗ trợ sẵn
                //     isEmail:  {
                //         msg: "email is invalid"
                //     },
                //     //demo custom validation
                //     // isCustom: (value) => {
                //     //     //viết logic validation 


                //     //     //nếu không thoả mãn logic thì chạy câu lệnh "throw new Error("error message")"
                //     // } 

                // }
            },
            passWord: {
                type: DataTypes.STRING(255),
                field: "password",
                allowNull: false,
                // validate: {
                //     isMatchedConfirmPassword: (value) => {
                //         if (value !== this.comfirmPassword) {
                //             throw new Error("confirm password is not matched")
                //         }

                //     }
                // }
                //Trước khi insert vào DB, hàm setter sẽ chạy các thao tác với dữ liệu nhận vào trước khi update/create dữ liệu 
                set(value) {

                    //không dc lưu plain text password trực tiếp xuống db 
                    // ta cần hash password bằng thư viện bcrypt

                    const salt = bcrypt.genSaltSync();
                    const hashedPassword = bcrypt.hashSync(value, salt);
                    this.setDataValue("passWord", hashedPassword)

                }

            },
            role: { //enum: dc chọn trong các opt cho sẵn 
                type: DataTypes.ENUM("user", "merchant", "admin"),
                defaultValue: "user",
            },
            avatar: {
                type: DataTypes.STRING,
                
            }
        },
        {
            tableName: "users",
            // disabled createAt, updatedAt
            timestamps: false,
            defaultScope: { //nghĩa là: bỏ qua column passWord khi tìm kiếm các records trong table
                attributes: {
                    exclude: ["passWord"],
                }
            },
            //các phương thức được tự động chạy sau 1 hành động (create,update,delete)
            hooks: {
                //xoá property password của record được trả ra sau khi tạo thành công
                afterCreate: (record) => {
                    delete record.dataValues.passWord
                }

            }

        });

}

// musers.email