const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) throw new Error("Email and password are required")
        const user = await User.findByCredentials(email, password)
        //verify user password
        const token = await user.generateToken()
        return res.status(200).json({
            status: "success",
            data: user,
            token: token
        })
    } catch(err){
        return res.status(401).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace("Bearer ","")
        
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
            throw new Error("Unauthorized access")
        }
        const decoded = await jwt.verify(token, process.env.SECRET)
        if(!decoded) throw new Error("No user found")
        const user = await User.findById(decoded.id)
        req.user = user;
        next()
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.logout = async (req, res) => {
    try{
        const token = req.headers.authorization.replace("Bearer ","");
        req.user.tokens = req.user.tokens.filter(item => item.toString()!== token.toString())
        await req.user.save()
        
        return res.status(200).json({
            status: "success",
            data: req.user
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.logoutAll = async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        return res.status(200).json({
            status: "success",
            data: req.user
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}