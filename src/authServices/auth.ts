import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserData } from "../models/userData";
import { Request } from "express";
require("dotenv").config();

const secretCode = <any>process.env.SECRET_CODE;

export const hashPassword = async (plainTextPassword: string) => {
  const saltRound = 12;
  const hash = await bcrypt.hash(plainTextPassword, saltRound);
  return hash;
};

export const comparePasswords = async (
  plainTextPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const signUserToken = async (user: UserData) => {
  let token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      first_name: user.first_name,
      avatar: user.avatar
    },
    secretCode,
    { expiresIn: "1hr" }
  );

  return token;
};

export const verifyUser = async (req: Request) => {
  // Get authorization header from the request
  const authHeader = req.headers.authorization;

  // if header exists, parse token from `Bearer <token>`
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // verify token and get the user
    try {
      let decoded: any = await jwt.verify(token, secretCode);
      return UserData.findByPk(decoded.user_id);
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
