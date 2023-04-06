const express = require('express');
const userController = require('../controllers/userController');
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
router.delete('/delete/:name', userController.deleteUser);

module.exports = router;