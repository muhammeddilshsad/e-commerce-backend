import Cart from "../../model/Cart.js";
import Product from "../../model/Product.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  console.log(productId);
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  let cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }
  } else {
    cart = new Cart({
      userId,
      items: [
        {
          productId,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
        },
      ],
    });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) return res.status(200).json({ userId, items: [] });
  res.status(200).json(cart);
};

export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  const item = cart.items.find((item) => item.productId == productId);
  if (!item) return res.status(404).json({ error: "Item not found in cart" });

  item.quantity = quantity;
  await cart.save();
  res.status(200).json(cart);
};

export const deleteCartItem = async (req, res) => {
  console.log(req);
  const { userId } = req.body;
  const productId = req.params.id;

  console.log(productId);

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  cart.items = cart.items.filter((item) => item.productId != productId);
  await cart.save();

  res.status(200).json(cart);
};

export const clearCart = async (req, res) => {
  const { userId } = req.params;

  await Cart.findOneAndDelete({ userId });
  res.status(200).json({ message: "Cart cleared successfully" });
};

export const handleQuantityChange = async (req, res) => {
  const { productId, action } = req.body;
 

  if (!productId || !action) {
    return res
      .status(400)
      .json({ message: "productId and action are required" });
  }

  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  const item = cart.items.find((p) => p._id.toString() === productId);

  console.log(item);

  if (!item) {
    return res.status(404).json({ message: "Product not in wishlist" });
  }

  if (action === "increment") {
    item.quantity += 1;
  } else if (action === "decrement") {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Minimum quantity is 1" });
    }
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }

  await cart.save();

  res.status(200).json({
    status: "success",
    message: `Quantity ${action}ed`,
    cart,
  });
};
