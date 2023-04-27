import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    pizzaId: {
      type: Number,
      default: 0,
      unique: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sizes: { type: Array, required: true },
    prices: { type: Array, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pizza", PizzaSchema);
