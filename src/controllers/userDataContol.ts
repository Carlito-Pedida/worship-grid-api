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

export const updateUserData: RequestHandler = async (req, res, next) => {
  const user: UserData | null = await verifyUser(req);

  if (user) {
    let user_id = req.params.user_id;
    let updatedUser: UserData = req.body;
    if (updatedUser.username && updatedUser.password) {
      let hashedPassword = await hashPassword(updatedUser.password);
      updatedUser.password = hashedPassword;

      updatedUser.user_id = user.user_id;

      let userFound = await UserData.findByPk(user_id);

      userFound &&
        userFound.user_id == updatedUser.user_id &&
        updatedUser.email &&
        updatedUser.first_name &&
        updatedUser.last_name &&
        updatedUser.city &&
        updatedUser.state &&
        updatedUser.zipcode &&
        updatedUser.avatar;
      {
        await UserData.update(updatedUser, {
          where: { user_id: parseInt(user_id) }
        });
      }
      res.status(200).json(updatedUser);
    }
  } else {
    res.status(400).json();
  }
};

export const deleteUserData: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let user_id = req.params.user_id;
    let userFound = await UserData.findByPk(user_id);

    if (userFound) {
      if (userFound.user_id == user.user_id) {
        await userFound.destroy();
        res.status(200).json("User Data Deleted");
      }
    } else {
      res.status(403).json("Not Authorized");
    }
  } else {
    res.status(401).json("Not Logged in");
  }
};
