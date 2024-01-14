import { Sequelize } from "sequelize";
import { AssociateUserAssets, UserAssetsFactory } from "./userAssets";
import { UserDataFactory } from "./userData";
import { AssociateUserResponse, UserResponseFactory } from "./userResponse";

const dbName = "worship-gridDB";
const username = "root";
const password = process.env.DATABASE_PASSWORD;

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
