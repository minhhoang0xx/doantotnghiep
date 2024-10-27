const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/createOrder/:userId', OrderController.createOrder)
router.get('/UserOrder/:userId', OrderController.getUserOrder)
router.get('/detailOrder/:orderId', OrderController.getDetailOrder)
router.delete('/deleteOrder/:orderId', OrderController.deleteOrder)
router.get('/getAllOrder', OrderController.getAllOrder)


module.exports = router