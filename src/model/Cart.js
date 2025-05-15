
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: { type:Number,default:1},
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [cartItemSchema],
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
