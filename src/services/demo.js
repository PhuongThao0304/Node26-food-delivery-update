const express = require("express");
const {Sequelize, DataTypes} = require("sequelize");
const app = express();
app.use(express.json());


// CÁCH DÙNG SEQUELIZE ĐỂ VIẾT API
//tạo kết nối dt bằng sequelize

const sequelize = new Sequelize("node26-food","root","1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

// kiểm tra xem có kết nối thành công hay ko
sequelize.authenticate()
.then(() => {
    console.log("Sequelize Connected");
})
.catch((error) => {
console.log("Sequelize Failed");
throw error;
});

const User = sequelize.define("User", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        //định nghĩa tên column ở data
        field: "first_name"
    },
    lastName: {
        type: DataTypes.STRING(50),
        //định nghĩa tên column ở data
        field: "last_name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passWord: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, 
{
    tableName: "users",
    //bỏ qua 2 column createAt vaf updatedAt
    timestamps: false,

});


app.get("/api/v1/users", async (req, res) => {
try {
//SELECT * FROM users
   const users = await User.findAll()

   res.status(200).json({data: users})
    
} catch (error) {
    res.status(500).json({error: error})
    
}
})

app.listen(4000);