"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserAssets = exports.UserAssetsFactory = exports.UserAssets = void 0;
const sequelize_1 = require("sequelize");
const userData_1 = require("./userData");
const userResponse_1 = require("./userResponse");
class UserAssets extends sequelize_1.Model {
}
exports.UserAssets = UserAssets;
function UserAssetsFactory(sequelize) {
    UserAssets.init({
        asset_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: "compositeIndex"
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        },
        imageLink: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        videoLink: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW
        }
    }, {
        freezeTableName: true,
        tableName: "assets",
        sequelize
    });
}
exports.UserAssetsFactory = UserAssetsFactory;
function AssociateUserAssets() {
    userData_1.UserData.hasMany(UserAssets, { foreignKey: "user_id" });
    UserAssets.belongsTo(userData_1.UserData, { foreignKey: "user_id" });
    UserAssets.hasMany(userResponse_1.UserResponse, { foreignKey: "asset_id" });
}
exports.AssociateUserAssets = AssociateUserAssets;
//# sourceMappingURL=userAssets.js.map