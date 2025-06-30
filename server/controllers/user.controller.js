const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// generate token
const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password || password.length < 6) {
            return res.json({ success: false, message: 'Fill all the fields' })
        }
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: 'User already exists' })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, email, password: hashPassword });
        const token = generateToken(user._id.toString());
        res.json({ success: true, token })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }
        const token = generateToken(user._id.toString());
        res.json({ success: true, token })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports={registerUser,loginUser}