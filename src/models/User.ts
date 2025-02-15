import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from "../database";
import bcrypt from "bcrypt";
import { Role } from "./enums/role.enum";

const roles = Object.keys(Role);

export type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface UserAttributes {
  id: number;
  nome: string;
  email: string;
  password: string;
  role: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export const User = sequelize.define<UserInstance, UserAttributes>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: roles,
      validate: {
        isIn: [roles],
      },
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

//@ts-ignore
User.prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  //@ts-ignore
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};
