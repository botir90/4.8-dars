async function check_admin( req,res,next) {
   try {
    const authorization = req.headers.authorization
if (!authorization) {
    return res.status(400).json({
        message : "token not found"
    })
}




const changetoken  = authorization.spilt(" ")
const bearer = changetoken[0]
const token = changetoken[1]
if (bearer  !== "Bearer" || !token) {
  return res.status(400).json({
    message : "bearer token is require"
  })  
}
const decode = jwt.verify(token,process.env.SEKRET_KEY)
req.user = decode

if (!["admin", "superadmin"].includes(req.user.role)) {
    return res.status(403).json({
        message : "you are not admin"
    })
}
next()

   } catch(error){
    res.status(500).json({
        message : error.message
    })
   }
}

async function check_superadmin( req,res,next) {
   try {
    const authorization = req.headers.authorization
if (!authorization) {
    return res.status(400).json({
        message : "token not found"
    })
}




const changetoken  = authorization.spilt(" ")
const bearer = changetoken[0]
const token = changetoken[1]
if (bearer  !== "Bearer" || !token) {
  return res.status(400).json({
    message : "bearer token is require"
  })  
}
const decode = jwt.verify(token,process.env.SEKRET_KEY)
req.user = decode

if (req.user.role !== "superadmin") {
    return res.status(403).json({
        message : "you are not admin"
    })
}
next()

   } catch(error){
    res.status(500).json({
        message : error.message
    })
   }
}

module.exports = {
    check_admin,
    check_superadmin
}