import { Sequelize } from "sequelize";
import { AssociateUserAssets, UserAssetsFactory } from "./userAssets";
import { UserDataFactory } from "./userData";
import { AssociateUserResponse, UserResponseFactory } from "./userResponse";
require("dotenv").config();

const dbName = <any>process.env.DB_NAME;
const username = <any>process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, username, password, {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql"
});

UserDataFactory(sequelize);
UserAssetsFactory(sequelize);
UserResponseFactory(sequelize);
AssociateUserAssets();
AssociateUserResponse();

export const db = sequelize;
