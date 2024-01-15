import { RequestHandler } from "express";
import { UserData } from "../models/userData";
import {
  comparePasswords,
  hashPassword,
  signUserToken,
  verifyUser
} from "../authServices/auth";

export const signupUser: RequestHandler = async (req, res, next) => {
  let newUser: UserData = req.body;
  if (newUser.username && newUser.password) {
    let hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;
    let created = await UserData.create(newUser);
    res.status(201).json({
      username: created.username,
      user_id: created.user_id
    });
  } else {
    res.status(400).send("Username and Password required");
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
  let existingUser: UserData | null = await UserData.findOne({
    where: { username: req.body.username }
  });

  if (existingUser) {
    let passwordsMatch = await comparePasswords(
      req.body.password,
      existingUser.password
    );

    if (passwordsMatch) {
      let token = await signUserToken(existingUser);
      res.status(200).json({ token });
    } else {
      res.status(401).json("Invalid password");
    }
  } else {
    res.status(401).json("Invalid username");
  }
};

export const getOneUser: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let {
      user_id,
      username,
      first_name,
      last_name,
      email,
      city,
      state,
      zipcode,
      position,
      avatar
    } = user;
    res.status(200).json({
      user_id,
      username,
      first_name,
      last_name,
      email,
      city,
      state,
      zipcode,
      position,
      avatar
    });
  } else {
    res.status(401).send();
  }
};
