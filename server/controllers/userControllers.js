// Logic for user authentication requests

const User = require('../models/User');
const generateToken = require('../utils/generateToken')

exports.registerUser = async(req, res)=>{
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        return res.status(400).json({
            message: 'User Already exists'
        });
    }

    const user = await User.create({ username, email, password });

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400).json({
            message: 'Invalid user data'
        })
    }
};

exports.loginUser = async(req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(401).json({
            message: 'Invalid email or password'
        });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};