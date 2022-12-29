//SET UP SEQUELIZE
const { Sequelize } = require("sequelize");
// const Restaurant = require("./Restaurant");

const configs = require("../config")


const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, 
    {
    dialect: configs.DB_DIALECT, //loại database
    host: configs.DB_HOST,
    port: configs.DB_PORT
});
//yarn add mysql2


(async () => {
    try {
        await sequelize.authenticate(); 
        //dùng để test connection
        console.log("Sequelize Connected")

    } catch (error) {
        console.log("Sequelize Error", error)

    }

})();




//khởi tạo model bằng cách gọi function mình đã tạo và export từ các models (user, restaurant)
const User = require("./user")(sequelize)
// Restaurant = require("./Restaurant")(sequelize)
// Restaurant = require("./Restaurant")(sequelize)

const Restaurant = require("./Restaurant")(sequelize)
const RestaurantLikes = require("./RestaurantLikes")(sequelize)

//định nghĩa relationship giữa các model
// User 1-n với Restaurant
Restaurant.belongsTo(User, {
    as: "owner",
    foreignKey: "userId",
});
User.hasMany(Restaurant, {
    as: "restaurants",
    foreignKey: "userId",
});

//User - like - restaurant
//User 1 -n restaurantlikes
// restaurant  1 - n restaurantlikes

User.belongsToMany(Restaurant, {
    as: "restaurantLikes",
    through: RestaurantLikes,
    foreignKey: "userId"
});
Restaurant.belongsToMany(User, {
    as: "userLikes",
    through: RestaurantLikes,
    foreignKey: "restaurantId"
})


// sequelize.sync({
//     alter: true
// });

module.exports = {
    User,
    Restaurant,
    sequelize
}
