const User = require('../models/user')

exports.createUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = new User({name, email, password});
        await user.save();
        
        return res.status(201).json({
            status: "success",
            data: user
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.readUsers = async (req, res) => {
    try{
        const users = await User.find()
        return res.status(200).json({
            status: "success",
            data: users
        })
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findById(req)
    } catch(err){
        return res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}