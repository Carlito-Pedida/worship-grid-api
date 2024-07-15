"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const userData_1 = require("./userData");
const userAssets_1 = require("./userAssets");
const userResponse_1 = require("./userResponse");
require("dotenv").config();
const dbName = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql"
});
(0, userData_1.UserDataFactory)(sequelize);
(0, userAssets_1.UserAssetsFactory)(sequelize);
(0, userResponse_1.UserResponseFactory)(sequelize);
(0, userAssets_1.AssociateUserAssets)();
(0, userResponse_1.AssociateUserResponse)();
exports.db = sequelize;
//# sourceMappingURL=index.js.map