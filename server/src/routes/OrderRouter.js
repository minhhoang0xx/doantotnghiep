const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createOrder/:userId', OrderController.createOrder)
router.get('/getAllOrderDetail/:userId', OrderController.getAllOrderDetail)
router.get('/detailOrder/:userId', OrderController.getDetailOrder)
router.delete('/deleteOrder/:userId', OrderController.deleteOrder)
router.get('/getAllOrder', OrderController.getAllOrder)


module.exports = router