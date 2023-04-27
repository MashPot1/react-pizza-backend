import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  signupValidation,
  loginValidation,
  pizzaCreateValidation,
  pizzaUpdateValidation,
  orderCreateValidation,
} from "./validations.js";

import { checkAuth, checkIsAdmin, handleErrors } from "./utils/index.js";

import {
  UserController,
  PizzaController,
  OrderController,
} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.yfgnsvv.mongodb.net/pizzeria?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.post("/login", loginValidation, handleErrors, UserController.login);
app.post("/signup", signupValidation, handleErrors, UserController.signUp);
app.get("/profile", checkAuth, UserController.profile);

app.post("/upload", checkIsAdmin, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/pizzas", PizzaController.getAll);
app.get("/pizzas/:id", PizzaController.getOne);
app.post(
  "/pizzas",
  checkIsAdmin,
  pizzaCreateValidation,
  handleErrors,
  PizzaController.create
);
app.delete("/pizzas/:id", checkIsAdmin, PizzaController.remove);
app.patch(
  "/pizzas/:id",
  checkIsAdmin,
  pizzaUpdateValidation,
  handleErrors,
  PizzaController.update
);

app.post(
  "/createOrder",
  checkAuth,
  orderCreateValidation,
  handleErrors,
  OrderController.create
);
app.get("/orders", checkAuth, OrderController.getOrdersByUser);

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Server OK!");
});
