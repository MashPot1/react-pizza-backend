import { body } from "express-validator";

export const signupValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
];

export const pizzaCreateValidation = [
  body("title", "Введите название пиццы").isLength({ min: 3 }).isString(),
  body("description", "Введите описание пиццы").isLength({ min: 3 }).isString(),
  body("sizes", "Введите размеры пиццы").isArray({ min: 1 }),
  body("sizes", "Максимально 3 размера для одной пиццы").isArray({ max: 3 }),
  body("prices", "Вы ввели недостаточно цен").isArray({ min: 1 }),
  body("prices", "Вы ввели цен больше чем есть размеров").isArray({ max: 3 }),
  body("imageUrl", "Неверная ссылка на изображение").isString(),
];

export const pizzaUpdateValidation = [
  body("title", "Введите название пиццы").isLength({ min: 3 }).isString(),
  body("description", "Введите описание пиццы").isLength({ min: 3 }).isString(),
  body("sizes", "Введите размеры пиццы").isArray({ min: 1 }),
  body("sizes", "Максимально 3 размера для одной пиццы").isArray({ max: 3 }),
  body("prices", "Вы ввели недостаточно цен").isArray({ min: 1 }),
  body("prices", "Вы ввели цен больше чем есть размеров").isArray({ max: 3 }),
  body("imageUrl", "Неверная ссылка на изображение").isString(),
];

export const orderCreateValidation = [
  body("pizzas").isLength({ min: 1 }).isArray(),
  body("totalPrice").isLength({ min: 1 }).isNumeric(),
];
