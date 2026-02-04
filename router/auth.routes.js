const {Router} = require("express")
const { registr, login } = require("../controller/auth.controller")

const authrouter = Router()
authrouter.post("/register" , registr)

authrouter.post("/login" , login)

module.exports = authrouter