import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      default: 1,
      required: true,
    },
    customer: {
      type: Number,
      ref: "User",
      required: true,
    },
    pizzas: {
      type: Array,
    },
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
