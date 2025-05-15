import express from "express"
import { addProduct, deleteProduct, getProductById, updateProduct } from "../controller/admin/productController.js"
import { getAllProducts } from "../controller/user/productController.js"
import { admin } from "../middleware/authMiddleware.js"
import { BlockUser, deleteUser, getAllOrders, getAllUsers, getUserById } from "../controller/admin/adminuserController.js"
import { getAllorders } from "../controller/user/orderCountroller.js"
import { upload } from "../middleware/imgeupload.js"
import tryCatch from "../middleware/tryCatch.js"



const adminRouter=express.Router()

adminRouter
    .post("/addProduct",admin,upload.single('image_url'),tryCatch(addProduct))
    .get("/getAllProduct",admin,tryCatch(getAllProducts))
    .get("/getAllUsers",admin,tryCatch(getAllUsers))
    .delete("/deleteUser/:id",tryCatch(deleteUser))
    .get("/getUserById/:id",tryCatch(getUserById))
    .patch("/BlockUser/:id",tryCatch(BlockUser))
    .get("/getAllorders/:id",tryCatch(getAllorders))
    .delete("/deleteProduct/:id",tryCatch(deleteProduct))
    .put("/updateProduct/:id",tryCatch(updateProduct))
    .get("/getProductById/:id",tryCatch(getProductById))
    .get("/getAllOrders",tryCatch(getAllOrders))
    
  
    
    
    

export default adminRouter