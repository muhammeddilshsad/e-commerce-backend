import Cart from "../../model/Cart.js";
import Stripe from "stripe";
import Order from "../../model/order.js";
import dotenv from "dotenv";
dotenv.config();

const stripeClient = new Stripe(process.env.STRIPE_SECRET);

export const CreateOrder = async (req, res, next) => {
  const userCart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );

  if (!userCart) {
    res.status(404).json({ message: "User cart not found" });
  }

  const totalPrice = Math.round(
    userCart.items.reduce((total, item) => {
      const price = parseFloat(item.productId.price);
      const quantity = parseInt(item.quantity);
      if (isNaN(price) || isNaN(quantity)) {
        res.status(400).json({ message: "invalid product price or quantity" });
      }
      return total + price * quantity;
    }, 0)
  );

  const lineItems = userCart.items.map((item) => ({
    price_data: {
      currency: "INR",
      product_data: {
        name: item.productId.name,
        images: [item.productId.image_url],
      },
      unit_amount: Math.round(item.productId.price * 100),
    },
    quantity: item.quantity,
  }));
  console.log(lineItems);
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    ui_mode: "embedded",
    return_url: `${process.env.URL_FRONTEND}success/{CHECKOUT_SESSION_ID}`,
  });

  const newOrder = new Order({
    userID: req.user.id,
    products: userCart.items,
    sessionID: session.id,
    amount: totalPrice,
    paymentStatus: "pending",
  });

  const savedOrder = await newOrder.save();
  await Cart.findOneAndUpdate({ userId: req.user.id }, { $set: { items: [] } });

  res.status(200).json({
    message: "Order created successfully",
    data: {
      session,
      order: savedOrder,
      clientSecret: session.client_secret,
      lineItems,
    },
  });
};

export const verifyOrder = async (req, res, next) => {
  const { sessionID } = req.params;
  const order = await Order.findOne({ sessionID });

  if (!order) {
    res.status(404).json({ message: "order not found" });
  }

  if (order.paymentStatus === "completed") {
    return res.status(400).json("Order already verified.");
  }

  order.paymentStatus = "completed";
  order.shippingStatus = "Processing";
  const updatedOrder = await order.save();

  res.status(200).json({ message: "Order updated", updatedOrder });
};

export const getAllorders = async (req, res) => {
  console.log("object ", req.user);

  const allOrders = await Order.find({ userID: req.params.id }).populate(
    "products.productId"
  );

  if (!allOrders || allOrders.length === 0) {
    res.status(404).json({ message: "order not found" });
  }

  res.status(200).json(allOrders);
};

export const cancelOrder = async (req, res, next) => {
  const orderById = await Order.findById(req.params.id);

  if (!orderById) {
    res.status(404).json({ message: "order with this id not found" });
  }

  orderById.paymentStatus = "cancelled";
  orderById.shippingStatus = "cancelled";
  await orderById.save();

  res.status(200).json("Order successfully cancelled");
};
