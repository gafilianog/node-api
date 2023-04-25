const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const home = (req, res) => {
    res.send(req.user);
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const [user] = await userModel.getUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            error: 'Invalid email'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
        
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

const refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Refresh token invalid.'
        });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(refreshToken);
        user = decoded;
        const accessToken = generateAccessToken({user: user});
        res.cookie('accessToken', accessToken, { httpOnly: true });
        
        return res.status(200).json({
            message: 'new access token created successfully'
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    const { name } = req.params;

    try {
        await userModel.deleteUserByEmail(name);

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
    refreshToken,
    deleteUser
};