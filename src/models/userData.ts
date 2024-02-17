import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize
} from "sequelize";

export class UserData extends Model<
  InferAttributes<UserData>,
  InferCreationAttributes<UserData>
> {
  declare user_id: number;
  declare first_name: string;
  declare last_name: string;
  declare username: string;
  declare password: string;
  declare email: string;
  declare city: string;
  declare state: string;
  declare zipcode: number;
  declare position: string;
  declare avatar: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}
export function UserDataFactory(sequelize: Sequelize) {
  UserData.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      last_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      position: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      avatar: {
        type: DataTypes.TEXT,
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
      tableName: "users",
      freezeTableName: true,
      sequelize
    }
  );
}
