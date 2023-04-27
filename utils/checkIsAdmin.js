import jwt from "jsonwebtoken";

import UserModel from "../models/User.js";

export default async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");

      req.userId = decoded.userId;

      const user = await UserModel.findOne({ userId: req.userId });

      if (user.accessRights > 0) {
        next();
      } else res.status(403).json({ message: "Недостаточно прав" });
    } catch (err) {
      res.status(403).json({
        message: "Недостаточно прав",
      });
    }
  } else {
    res.status(403).json({
      message: "Нет токена",
    });
  }
};
