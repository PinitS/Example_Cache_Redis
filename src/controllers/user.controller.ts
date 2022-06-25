import { myDataSource } from "./../database/data-source";
import { Request, Response } from "express";
import { User } from "../database/entity/User";
import { In } from "typeorm";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
const { BCRYPT_SALT_ROUNDS } = process.env;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { arrayUserId } = req.body;
    const users = await myDataSource
      .getRepository(User)
      .find({ where: { id: In(arrayUserId) } });
    res.status(200).json({
      code: 200,
      data: users,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      data: null,
      message: error,
    });
  }
};

export const mockUsers = async (req: Request, res: Response) => {
  try {
    const { size } = req.query;
    const uniqueString = uuid();
    const fixedSize = Number(size) > 100 ? 100 : Number(size);
    const userArray = [...Array(Number(fixedSize))].map((item, index) => {
      const salt = bcrypt.genSaltSync(Number(BCRYPT_SALT_ROUNDS));
      const hash = bcrypt.hashSync(uniqueString, salt);
      return {
        username: uniqueString,
        password: hash,
        userType: String(Math.floor(Math.random() * 3) + 1),
      };
    });
    const user = myDataSource.getRepository(User);
    const users = await user.save(userArray);
    res.status(200).json({
      code: 200,
      data: users,
      message: "success",
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      code: 400,
      data: null,
      message: error,
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { password, username, userType } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.userType = userType;
    const result = await myDataSource.manager.save(user);
    res.status(200).json({
      code: 200,
      data: result,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      data: null,
      message: error?.sqlMessage,
    });
  }
};
