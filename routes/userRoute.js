const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.delete('/delete/:name', userController.deleteUser);

module.exports = router;