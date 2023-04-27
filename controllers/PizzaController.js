import PizzaModel from "../models/Pizza.js";

export const create = async (req, res) => {
  try {
    let idPizza;
    if (await PizzaModel.exists()) {
      idPizza = (await PizzaModel.find().count()) + 1;
    } else {
      idPizza = 1;
    }

    const pizzaId = idPizza;

    const doc = new PizzaModel({
      pizzaId: pizzaId,
      title: req.body.title,
      description: req.body.description,
      sizes: req.body.sizes,
      prices: req.body.prices,
      imageUrl: req.body.imageUrl,
    });

    const pizza = await doc.save();

    res.json(pizza);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать пиццу",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const pizza = await PizzaModel.findOne({ pizzaId: req.params.id });

    if (!pizza) {
      return res.status(400).json({
        message: "Неверный номер пиццы.",
      });
    }

    const resPizza = pizza._doc;
    res.json(resPizza);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить пиццу",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const pizzas = await PizzaModel.find();

    res.json(pizzas);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить пиццы",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const doc = await PizzaModel.findOneAndDelete({ pizzaId: req.params.id });
    if (!doc) {
      return res.status(404).json({ message: "Пицца не найдена." });
    }
    res.json({ message: "Пицца успешно удалена." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить пиццу",
    });
  }
};

export const update = async (req, res) => {
  try {
    await PizzaModel.updateOne(
      { pizzaId: req.params.id },
      {
        pizzaId: req.params.id,
        title: req.body.title,
        description: req.body.description,
        sizes: req.body.sizes,
        prices: req.body.prices,
        imageUrl: req.body.imageUrl,
      }
    );

    res.json({ message: "Пицца отредактирована." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось отредактировать пиццу",
    });
  }
};
