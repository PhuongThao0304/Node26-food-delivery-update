// const {DataTypes} = require("sequelize");
// const sequelize = require("./index");

// module.exports = (sequelize) => {
//     return sequelize.define(
//         //tên model
//         "Restaurant",
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement:true,
//         },
//         name: {
//             type: DataTypes.STRING(50),
//             allowNull: false
            
    
//         },
//         description: {
//             type: DataTypes.STRING(50),
//             allowNull: false
            
    
//         },
//         userId: {
//             type: DataTypes.STRING(50),
//             allowNull: false, 
//             field: "user_id"

//         }
//     },
//     {
//         tableName: "restaurant",
//         // disabled createAt, updatedAt
//         timestamps: false,
    
//     });
// }


const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
    },
    {
      tableName: "restaurants",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};

