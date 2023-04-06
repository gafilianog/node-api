const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const [user] = await userModel.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            error: 'Invalid email'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    // const userId = user[0].id;
        
    if (!isPasswordValid) {
        return res.status(401).json({
            error: 'Wrong password'
        });
    }

    const accessToken = generateAccessToken({user: user});
    const refreshToken = generateRefreshToken({user: user});

    res.cookie('accessToken', accessToken, { httpOnly: true });
    // 30 days cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
        message: 'Access granted'
    });
}

const home = (req, res) => {
    res.send(req.user);
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await userModel.getUserByEmail(email);

    if (user.length > 0) {
        return res.status(409).json({
            error: 'User already exists'
        });
    }

    await userModel.createNewUser(name, email, hashedPassword);

    return res.status(201).json({
        message: 'User created'
    });
}

const deleteUser = async (req, res) => {
    const { name } = req.params;

    try {
        await userModel.deleteUserByName(name);

        res.json({
            message: 'Delete user success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Delete error',
            serverMessage: error.message
        });
    }
}

module.exports = {
    // getAllUsers,
    login,
    home,
    register,
    deleteUser
};