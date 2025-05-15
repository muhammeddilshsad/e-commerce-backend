import Product from "../../model/Product.js";

export const addProduct = async (req, res) => {
  const { name, category, price, stock } = req.body;
  const image = req.file.path;

  const newProduct = new Product({
    name: name,
    category: category,
    price: price,
    stock: stock,
    image_url: image,
  });
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  console.log(req.params.id);
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json({ message: "Product deleted successfully" });
};
