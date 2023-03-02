const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await userModel.getAllUsers();

        res.json({
            message: 'Get all users success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error.message,
        });
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;

    const [user] = await userModel.getUserByName(name);

    if (!user) {
        return res.status(401).json({
            error: 'Invalid name'
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
        
    if (!isPasswordValid) {
        return res.status(401).json({
            error: 'Wrong password'
        });
    }

    return res.status(200).json({
        message: 'Success login'
    });
}

module.exports = {
    getAllUsers,
    login
};