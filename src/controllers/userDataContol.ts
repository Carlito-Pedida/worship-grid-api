import { RequestHandler } from "express";
import { UserData } from "../models/userData";
import {
  comparePasswords,
  hashPassword,
  signUserToken,
  verifyUser
} from "../authServices/auth";

export const getAllUserData: RequestHandler = async (req, res, next) => {
  let users = await UserData.findAll({
    attributes: { exclude: ["password"] },
    include: [{ all: true, nested: true }]
  });
  res.status(200).json(users);
};

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
  let user_id = req.params.user_id;
  let foundUser = await UserData.findByPk(user_id, {
    include: [{ all: true, nested: true }]
  });
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({});
  }
};

export const getUserAssets: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let assets = await UserData.findByPk(user.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ all: true, nested: true }]
    });
    res.status(200).json(assets);
  } else {
    res.status(404).json();
  }
};

export const updateUserData: RequestHandler = async (req, res, next) => {
  const user: UserData | null = await verifyUser(req);

  if (user) {
    let user_id = req.params.user_id;
    let updatedUser: UserData = req.body;
    if (updatedUser.username) {
      if (updatedUser.password) {
        let hashedPassword = await hashPassword(updatedUser.password);
        updatedUser.password = hashedPassword;
      }

      updatedUser.user_id = user.user_id;

      let userFound = await UserData.findByPk(user_id);

      if (
        userFound &&
        userFound.user_id == updatedUser.user_id &&
        updatedUser.username &&
        updatedUser.email &&
        updatedUser.first_name &&
        updatedUser.last_name &&
        updatedUser.city &&
        updatedUser.state &&
        updatedUser.zipcode &&
        updatedUser.position &&
        updatedUser.avatar
      ) {
        await UserData.update(updatedUser, {
          where: { user_id: parseInt(user_id) }
        });
        res.status(200).json(updatedUser);
      } else {
        res.status(400).json({ error: "Invalid update data" });
      }
    } else {
      res.status(400).json({ error: "Username is required" });
    }
  } else {
    res.status(400).json({ error: "User not found" });
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
