const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const getRestaurant = async () => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [
        {
          association: "owner",
          attributes: {
            exclude: ["email", "passWord"],
          },
        },
        {
          association: "userLikes",
          attributes: {
            exclude: ["email", "passWord"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return restaurants;

  } catch (error) {
    console.error(error);
    throw error;

  }
}


const likeRestaurant = async (userId, restaurantId) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      throw new AppError(400, "restaurant not found");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(400, "user not found");
    }

    console.log(restaurant.__proto__);
    //khi thiết lập relationship cho các model, mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khác
    // restaurant.addUserLike(user.id);
    const hasLiked = await restaurant.hasUserLike(user.id);

    if (hasLiked) {
      await restaurant.removeUserLike(user.id);
    } else {
      await restaurant.addUserLike(user.id);
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRestaurant = async (restaurant) => {
  try {
    const newrestaurant = await Restaurant.create(restaurant);
    return newrestaurant;

  } catch (error) {
    throw error;
  }
};

const deleteRestaurant = async (restaurantId,requester) => {
  try {
    const restaurant = await Restaurant.findByPk(restaurantId)
    if (!restaurant) {
      throw new AppError(400, "restaurant not found")
    }
  //kieemr tra người xoá nhfa hàng, có phải là chủ nhà hàng hay không 
  if (restaurant.userId !== requester.id) {
    throw new AppError(403, "user don't have permission")
  }

  await Restaurant.destroy({where: {id: restaurantId}})
  } catch (error) {
    throw error
  }

}
module.exports = {
  getRestaurant,
  likeRestaurant,
  createRestaurant,
  deleteRestaurant,
}