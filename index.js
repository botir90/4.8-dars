const express = require("express")
const cors = require("cors")
const authrouter = require("./router/auth.routes")
const productrouter = require("./router/product.routes")

require("dotenv").config()
 const app = express()
const PORT = process.env.PORT||3000
 app.use(express.json())

 app.use(cors())
 //router 
 app.use(authrouter)
 app.use(productrouter)

 app.listen(PORT, () => {
    console.log("server  " + PORT + "  da ishlayapti");
    
 })