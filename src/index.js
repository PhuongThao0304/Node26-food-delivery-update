const express = require('express');
const { handleErrors, AppError } = require('./helpers/error');
const { authorization } = require('./middleware/authorization');
const {sequelize} = require("./models")
const app = express();


app.use(express.json());
app.use(express.static("."));

//sync cái model của sequelize với db
sequelize.sync({
    alter: true,
  
});

const v1 = require("./routers/v1");
app.use("/api/v1", v1)

//demo authorization 
//cách 
app.get("/auth", authorization, (req,res,next) => {
  
    try {
        const {user} = res.locals;
        res.status(200).json(user);
      } catch (error) {
    console.log(error);
        next(error)
      }
})

//demo handle error
app.get("/error", (req, res) => {
throw new AppError(500, "Internal Server")
}) 
//dùng kĩ thuật middleware: dùng để bắt và xử lý trả lỗi ra cho client, do đó phải dc đặt bên dưới router của mình
app.use(handleErrors ) //global middleware: middleware toàn cục



app.listen(4000);


