import Wishlist from "../../model/Wishlist.js";

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  console.log(productId);

  if (!productId) {
    return next(customError("productId is required", 400));
  }

  let wishlist = await Wishlist.findOne({ userId: req.user.id });
  if (!wishlist) {
    wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
  } else if (!wishlist.productId.includes(productId)) {
    wishlist.productId.push(productId);
  } else {
    return res
      .status(404)
      .json({ success: false, message: "product is already exixst" });
  }
  await wishlist.save();
  res.status(200).json({
    status: "success",
    message: "product added to wishlist",
    wishlist,
  });
};

export const getWishlist = async (req, res) => {
  const { id: userId } = req.params;

  const wishlist = await Wishlist.find({ userId }).populate("productId");
  res.status(200).json(wishlist);
};

export const removeWish = async (req, res, next) => {
  console.log(req);

  const productId = req.params.id;
  console.log(productId);

  if (!productId) {
    return next(customError("productId is required", 400));
  }

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { productId: productId } },
    { new: true }
  );

  if (!updatedWishlist) {
    return res.status(404).json("Wishlist not found");
  }

  res.status(200).json({
    status: "success",
    message: "Product removed from wishlist",
    wishlist: updatedWishlist,
  });
};
