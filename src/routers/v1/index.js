const express = require("express");
const { getRestaurant } = require("../../controllers/restaurant.controller");
const { getUsers, createUser } = require("../../controllers/users.controller");
const useController =  require("../../controllers/users.controller");
const restaurantController = require("../../controllers/restaurant.controller");
const authController = require("../../controllers/auth.controller");
const { authorization } = require("../../middleware/authorization");
const upload = require("../../middleware/upload");
const uploadController = require("../../controllers/upload.controller");

// const userRouters = require("./users.router");
// const userRouter = require("./users.router");

const v1 = express.Router();

// const userRouters = express.Router();
 
// path v1: /api/v1
//định nghĩa các routers cho users
v1.get("/users", getUsers()); //viết kiểu này có thể truyền tham số từ bên ngoài
//               (req,res) => {}
v1.post("/users", createUser())
v1.put('/users/:id', useController.updateUser())

//định nghĩa các routers cho restaurant

v1.get("/restaurant",restaurantController.getRestaurant());

v1.post("/restaurant", authorization, restaurantController.createRestaurant());

v1.post("/restaurant/:id", authorization, restaurantController.deleteRestaurant());

v1.post(
    "/restaurant/:restaurantId/like", authorization,
    restaurantController.likeRestaurant()
  );

v1.post("/login", authController.login());

v1.get("/getprofile", authorization, authController.getProfile());

//định nghĩa routers cho upload 

v1.post("/upload", upload.single("file"), uploadController.upload())




module.exports = v1;