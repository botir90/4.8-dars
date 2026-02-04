const {Router} = require("express")
const { registr, login, registr_admin } = require("../controller/auth.controller")
const { check_superadmin } = require("../middleware/authorizatsion")

const authrouter = Router()
authrouter.post("/add_admin", check_superadmin, registr_admin)
authrouter.post("/register" , registr)

authrouter.post("/login" , login)

module.exports = authrouter