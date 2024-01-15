import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";
import { UserData } from "./userData";
import { UserResponse } from "./userResponse";
import { truncate } from "fs";

export class UserAssets extends Model<
  InferAttributes<UserAssets>,
  InferCreationAttributes<UserAssets>
> {
  declare asset_id: number;
  declare message: string;
  declare imageLink: string;
  declare videoLink: string;
  declare user_id: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export function UserAssetsFactory(sequelize: Sequelize) {
  UserAssets.init(
    {
      asset_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: "compositeIndex"
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true
      },
      imageLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      videoLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      freezeTableName: true,
      tableName: "assets",
      sequelize
    }
  );
}

export function AssociateUserAssets() {
  UserData.hasMany(UserAssets, { foreignKey: "user_id" });
  UserAssets.belongsTo(UserData, { foreignKey: "user_d" });
  UserAssets.hasMany(UserResponse, { foreignKey: "response_id" });
}
