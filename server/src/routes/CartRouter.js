const express = require("express");
const router = express.Router()
const CartController = require('../controllers/CartController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createCart/:userId', CartController.createCart)
router.get('/getCart/:userId', CartController.getCart)

module.exports = router