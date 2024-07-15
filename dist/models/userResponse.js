"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
exports.UserResponseFactory = UserResponseFactory;
exports.AssociateUserResponse = AssociateUserResponse;
const sequelize_1 = require("sequelize");
const userAssets_1 = require("./userAssets");
const userData_1 = require("./userData");
class UserResponse extends sequelize_1.Model {
}
exports.UserResponse = UserResponse;
function UserResponseFactory(sequelize) {
    UserResponse.init({
        response_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        asset_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        reply: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        reactions: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "responses",
        sequelize
    });
}
function AssociateUserResponse() {
    UserResponse.belongsTo(userData_1.UserData, { foreignKey: "user_id" });
    UserResponse.belongsTo(userAssets_1.UserAssets, { foreignKey: "asset_id" });
    userData_1.UserData.hasMany(UserResponse, { foreignKey: "user_id" });
}
//# sourceMappingURL=userResponse.js.map