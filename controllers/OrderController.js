import OrderModel from "../models/Order.js";

export const create = async (req, res) => {
  try {
    let idOrder;
    if (await OrderModel.exists()) {
      idOrder = (await OrderModel.find().count()) + 1;
    } else {
      idOrder = 1;
    }

    const orderId = idOrder;

    const doc = new OrderModel({
      orderId: orderId,
      pizzas: req.body.pizzas,
      customer: req.userId,
      totalPrice: req.body.totalPrice,
    });

    const order = await doc.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: "Не удалось создать заказ",
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const order = await OrderModel.find({ customer: req.userId });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить заказ",
    });
  }
};
