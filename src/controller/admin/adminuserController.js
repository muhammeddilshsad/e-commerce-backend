import order from "../../model/order.js";
import User from "../../model/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
 
};

export const deleteUser = async (req, res) => {
  console.log(req.params);

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted successfully" });
 
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
  
};

export const updateUser = async (req, res) => {
 
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  
};

export const getUserCount = async (req, res) => {
 
    const count = await User.countDocuments();
    res.status(200).json({ totalUsers: count });
  
};

export const BlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.isBlocked = !user.isBlocked;
  await user.save();

  res.status(200).json({
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    user: user,
  });

};

export const getAllOrders = async (req, res) => {
  console.log("ftrdt");

  const orders = await order
    .find()
    .populate("userID", "name email")
    .populate("products.productId", "name price image_url");
  console.log("order:", orders);

  res.status(200).json(orders);
};
