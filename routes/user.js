const express = require('express');
const userController = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');
const cookieParser = require('cookie-parser');

const router = express.Router();

router.use(cookieParser());

router.get('/', (_, res) => {
    res.send('<h1>Hello gaes</h1>');
});
// router.get('/getall', verifyToken, userController.getAllUsers);
router.post('/login', userController.login);
router.get('/home', verifyToken, userController.home);
router.post('/register', userController.register);
router.post('/refresh-token', userController.refreshToken);
router.delete('/delete/:name', userController.deleteUser);

module.exports = router;