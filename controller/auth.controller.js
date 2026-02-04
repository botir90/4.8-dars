const {v4} = require("uuid")
const bcrypt = require("bcryptjs")
const { read_file, write_file } = require("../api/fs")
const e = require("express")
const jwt = require("jsonwebtoken")



const registr = async (req,res) =>{
    try {
const {username,email ,password} = req.body
if (!username ||!email || !password) {
    res.status(400).json({
        message : "username , email , password are require "
    })
}


const filedata = read_file("auth.json")

 const fonddeduser = filedata.find((itme) => itme.email === email)

 if (fonddeduser) {
    return res.status(400).json({
        message : "user alrady exits"
    })
    
 }
const hash = await bcrypt.hash(password,12)

filedata.push({
    id: v4(),
    username,
    email,
    password:hash,
    role : "user"
})
write_file("auth.json" ,filedata)
res.status(201).json({
    message : "Registred"
})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }



    
}

//////////////////////////////////////////////////////////

const registr_admin = async (req,res) =>{
    try {
const {username,email ,password} = req.body
if (!username ||!email || !password) {
    res.status(400).json({
        message : "username , email , password are require "
    })
}


const filedata = read_file("auth.json")

 const fonddeduser = filedata.find((itme) => itme.email === email)

 if (fonddeduser) {
    return res.status(400).json({
        message : "user alrady exits"
    })
    
 }
const hash = await bcrypt.hash(password,12)

filedata.push({
    id: v4(),
    username,
    email,
    password:hash,
    role : "admin"
})
write_file("auth.json" ,filedata)
res.status(201).json({
    message : "Registred"
})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }



    
}

//////////////////////////////////////////////////////////
const login = async (req,res) =>{
    try {
const {email ,password} = req.body
if (!email || !password) {
    res.status(400).json({
        message : " email , password are require "
    })
}


const filedata = read_file("auth.json")

 const fonddeduser = filedata.find((itme) => itme.email === email)

 if ( !fonddeduser) {
    return res.status(400).json({
        message : "user not found "
    })
    
 }
 const check = await bcrypt.compare(password , fonddeduser.password)
if (check) {
    const payload = { id: fonddeduser.id ,email: fonddeduser.email,role : fonddeduser.role} 
const token = jwt.sign(payload,process.env.SEKRET_KEY,{expiresIn:"1h"})
res.status(200).json({
  message :"Success"  ,
  token
})


}else {
    return res.status(401).json({
        message : "wronf password"
    })
}
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }



    
}
module.exports = {
registr_admin,
registr,
login

}