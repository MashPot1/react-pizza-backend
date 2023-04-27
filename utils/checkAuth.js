import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret");

      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(403).json({
        message: "Нет токена",
      });
    }
  } else {
    req.userId = 0;
    next();
  }
};
