import express from 'express'
import { getAllProducts, getProductById } from '../controller/user/productController.js'
import { addToCart, deleteCartItem, getCartItems, handleQuantityChange } from '../controller/user/cartCountroller.js'
import { addToWishlist, getWishlist, removeWish } from '../controller/user/wishlistCountroller.js'
import { protect } from '../middleware/authMiddleware.js'
import { CreateOrder,getAllorders } from '../controller/user/orderCountroller.js'
import tryCatch from '../middleware/tryCatch.js'

const userRouter = express.Router()
    
    .get("/getproducts",tryCatch(getAllProducts))
    .post("/addtocart",protect,tryCatch(addToCart))
    .get('/:id', tryCatch (getProductById))
    .get("/getcartitem/:userId",protect,tryCatch(getCartItems))
    .post("/addwishlist",protect,tryCatch(addToWishlist))
    .get("/getWishlist/:id",protect,tryCatch(getWishlist))
    .delete("/removewishlist/:id",protect,tryCatch(removeWish))
    .delete("/deleteCartItem/:id",tryCatch(deleteCartItem))
    .put("/handleQuantityChange",protect,tryCatch(handleQuantityChange))
    .post("/createorder",protect,tryCatch(CreateOrder))
    .get("/getallorders/:id",protect,tryCatch(getAllorders))
    
    
export default userRouter