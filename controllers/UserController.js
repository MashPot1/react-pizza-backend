import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let idUser;
    if (await UserModel.exists()) {
      idUser = (await UserModel.find().count()) + 1;
    } else {
      idUser = 1;
    }

    if (await UserModel.findOne({ email: req.body.email })) {
      return res.status(500).json({
        message: "Не удалось зарегистрироваться",
      });
    }

    const userId = idUser;

    const doc = new UserModel({
      userId: userId,
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
      accessRights: req.body.accessRights,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        userId: user.userId,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль.",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json({
      message: "Не удалось авторизоваться.",
    });
  }
};

export const profile = async (req, res) => {
  try {
    if (req.userId === 0) {
      return res.status(404).json({
        message: "Вы не авторизованы",
      });
    }
    const user = await UserModel.findOne({ userId: req.userId });
    if (!user) {
      return res.status(404).json({
        message: "Вы не авторизованы",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
