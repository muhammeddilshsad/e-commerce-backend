import User from "../../model/User.js";
import { generateToken } from "../../utils/genaratToken.js";

export const registerUser = async (req, res) => {
  console.log("gdgdtgdt");

  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role: role || "user",
  });

  await user.save();
  res.status(200).json(user)
};

export const loginUser = async (req, res) => {
  console.log("object", req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
      isBlocked: user.isBlocked,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.status(200).json(users);
  
};
