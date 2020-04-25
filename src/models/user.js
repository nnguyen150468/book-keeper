const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "User's name is required"],
        minlength: 3
    },
    email: {
        type: String,
        trim: true,
        required: [true, "User's email is required"],
        minlength: 3,
        unique: true,
        validate: {
            validator(v){
                if(!validator.isEmail(v)) throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "User's password is required"]
    },
    tokens: Array
})

userSchema.pre("save", async function(next){
    // console.log('isModified',this.isModified('password'))
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, saltRounds);
    // console.log('isModified after hash',this.isModified('password'))
    next()
})

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject
}

// userSchema.methods.generateToken = async function(){
//     console.log('this.id', this.id)
//     const token = await jwt.sign(this.id, process.env.SECRET, {expiresIn: '7d'})
//     if(this.tokens.length>2){this.tokens.shift()}
//     this.tokens.push(token)
//     await this.tokens.save()
//     return this
// }

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user) throw new Error("No user found")
    //verify password
    const match = await bcrypt.compare(password.toString(), user.password)
    if(!match) throw new Error("No user found")
    return user
}

userSchema.methods.generateToken = async function(){
    
    const token = await jwt.sign({id: this._id}, process.env.SECRET, {expiresIn: '7d'})

    if(this.tokens.length>5){this.tokens.shift()}
    this.tokens.push(token);
    await this.save()
    return token
}

const User = mongoose.model("User", userSchema)

module.exports = User;