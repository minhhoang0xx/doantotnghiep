const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authAdminMiddleware } = require('../middleware/authMiddleware');
const { authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', userController.createUser)
router.post('/logout', userController.logOut);
router.post('/sign-in', userController.loginUser)
router.put('/updateUser/:id', userController.updateUser)
router.put('/updatePassword/:id', userController.updatePassword)
router.delete('/deleteUser/:id', userController.deleteUser)// :id la dinh truyen dong
router.get('/getAllUser', userController.getAllUser)
router.get('/detailUser/:id', authUserMiddleware, userController.detailUser)
router.post('/refreshToken', userController.refreshToken)
// router.post('/sign-up', userController.updateUser)
module.exports = router