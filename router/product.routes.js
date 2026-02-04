const {Router} = require("express")
const { get_all_products, get_one_product, add_product, update_product, delete_product } = require("../controller/product.controller")
const authorizatsion = require("../middleware/authorizatsion")


const productrouter = Router()
productrouter.get("/get_all_products" ,get_all_products )
productrouter.get("/get_one_product/:id" , get_one_product)
productrouter.post("/add_product",authorizatsion,add_product)
productrouter.put("/update_praduct/:id",authorizatsion,update_product)
productrouter.delete("/delete_product",authorizatsion,delete_product)
module.exports = productrouter