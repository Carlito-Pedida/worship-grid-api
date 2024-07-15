"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataFactory = exports.UserData = void 0;
const sequelize_1 = require("sequelize");
class UserData extends sequelize_1.Model {
}
exports.UserData = UserData;
function UserDataFactory(sequelize) {
    UserData.init({
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        position: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: sequelize_1.DataTypes.TEXT,
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
        tableName: "users",
        freezeTableName: true,
        sequelize
    });
}
exports.UserDataFactory = UserDataFactory;
//# sourceMappingURL=userData.js.map