require("dotenv").config();

const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 10});
}

const generateRefreshToken = (userId) => {
    return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 20});
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};