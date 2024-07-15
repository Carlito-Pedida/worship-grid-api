import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import { UserDataFactory } from "./userData";
import { AssociateUserAssets, UserAssetsFactory } from "./userAssets";
import { AssociateUserResponse, UserResponseFactory } from "./userResponse";

require("dotenv").config();

const dbName = <any>process.env.DB_NAME;
const username = <any>process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, username, password, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: "mysql",
  dialectModule: mysql2
});

UserDataFactory(sequelize);
UserAssetsFactory(sequelize);
UserResponseFactory(sequelize);
AssociateUserAssets();
AssociateUserResponse();

export const db = sequelize;
