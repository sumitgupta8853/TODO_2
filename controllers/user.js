const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// register

const register = async (req,res) => {

    const {name,email,password} = req.body
    let user = await User.findOne({email})
    if(user) return res.status(400).json({msg:"Email already exists"})
        const hashedpassword = await bcrypt.hash(password,10)

    user = await User.create({name,email,password:hashedpassword})
    const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn :'30d'})
    res
    .status(201)
    .cookie('token', token, {
        httpOnly: true,
        secure: true,    // Use secure only in production
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    })
    
    .json({
        msg:"User created successfully",
         token
    })



}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')  // fetch password also (because `select: false` in schema)

    if (!user) return res.status(400).json({ msg: "Invalid email or password" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" })

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '30d' })

    res
        .status(200)
        .cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .json({ msg: "Login successful", token })
}



const update = async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true })

    if (!user) return res.status(404).json({ msg: "User not found" })

    res.status(200).json({ msg: "User updated successfully", user })
}



const deleteUser = async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)

    if (!user) return res.status(404).json({ msg: "User not found" })

    res.status(200).json({ msg: "User deleted successfully" })
}


module.exports = {register,login,update,deleteUser}