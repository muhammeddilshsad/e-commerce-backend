import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  itemcount: {
    type: Number,
    default: 0,
  },
  image_url: {
    type: String,
    required: true,
  },

}, {
  timestamps: true 
});

const Product=mongoose.model("Product", productSchema);
export default  Product
