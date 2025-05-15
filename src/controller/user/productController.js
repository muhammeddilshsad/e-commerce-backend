import Product from "../../model/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;

  const products = await Product.find({ category });
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(product);
  
};
