import {
  DATE,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";
import { UserAssets } from "./userAssets";
import { UserData } from "./userData";

export class UserResponse extends Model<
  InferAttributes<UserResponse>,
  InferCreationAttributes<UserResponse>
> {
  declare response_id: number;
  declare asset_id: number;
  declare user_id: number;
  declare reactions: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}
export function UserResponseFactory(sequelize: Sequelize) {
  UserResponse.init(
    {
      response_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reactions: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: "userResponse",
      sequelize
    }
  );
}

export function AssociateUserResponse() {
  UserResponse.belongsTo(UserData, { foreignKey: "user_id" });
  UserResponse.belongsTo(UserAssets, { foreignKey: "asset_id" });
  UserData.hasMany(UserResponse, { foreignKey: "user_id" });
}
