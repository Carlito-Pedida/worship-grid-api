import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";
import { UserData } from "./userData";
import { UserResponse } from "./userResponse";

export class UserAssets extends Model<
  InferAttributes<UserAssets>,
  InferCreationAttributes<UserAssets>
> {
  declare asset_id: number;
  declare user_id: number;
  declare message: string;
  declare imageLink: string;
  declare videoLink: string;
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
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
  UserAssets.belongsTo(UserData, { foreignKey: "user_id" });
  UserAssets.hasMany(UserResponse, { foreignKey: "asset_id" });
}
