const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (_, res) => {
    res.send('<h1>Hello gaes</h1>');
});
router.get('/getall', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.delete('/delete/:name', userController.deleteUser);

module.exports = router;